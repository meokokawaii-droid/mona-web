import "server-only";
import { createHmac, timingSafeEqual, scrypt } from "node:crypto";
import { promisify } from "node:util";
import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
export class SurveyError extends Error {
  constructor(
    message: string,
    public status = 503,
  ) {
    super(message);
  }
}
function env(key: string) {
  const value = process.env[key];
  if (!value) throw new SurveyError("调查服务尚未配置完成，请稍后再试。");
  return value;
}
export function configured() {
  return !!(
    process.env.DATABASE_URL &&
    process.env.SURVEY_SECRET &&
    process.env.SURVEY_SITE_URL
  );
}
export async function query<T>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  try {
    return (await neon(env("DATABASE_URL")).query(text, params, {
      fetchOptions: { signal: AbortSignal.timeout(15000) },
    })) as T[];
  } catch {
    throw new SurveyError("暂时无法保存或读取数据，请稍后重试。");
  }
}
const procedures: Record<string, { args: string[]; casts: string[] }> = {
  survey_rate_limit: { args: ["p_key", "p_limit"], casts: ["text", "integer"] },
  survey_count_version: { args: ["p_version"], casts: ["text"] },
  survey_summary_v1_final: { args: ["p_version"], casts: ["text"] },
  survey_submit_v21: {
    args: [
      "p_session",
      "p_version",
      "p_demographics",
      "p_answers",
      "p_min_duration",
    ],
    casts: ["uuid", "text", "jsonb", "jsonb", "integer"],
  },
};
export async function rpc<T>(
  name: string,
  data: Record<string, unknown>,
): Promise<T> {
  const procedure = Object.hasOwn(procedures, name)
    ? procedures[name]
    : undefined;
  if (!procedure) throw new SurveyError("无效的数据操作。", 400);
  const params = procedure.args.map((key, i) =>
    procedure.casts[i] === "jsonb" ? JSON.stringify(data[key]) : data[key],
  );
  const rows = await query<{ value: T }>(
    `select public.${name}(${procedure.casts.map((cast, i) => `$${i + 1}::${cast}`).join(",")}) as value`,
    params,
  );
  return rows[0].value;
}
function signature(value: string) {
  const secret = env("SURVEY_SECRET");
  if (secret.length < 32) throw new SurveyError("调查服务配置不完整。");
  return createHmac("sha256", secret).update(value).digest("base64url");
}
export function sign(data: object) {
  const value = Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${value}.${signature(value)}`;
}
export function verify(
  token: string,
  kind: string,
): { id: string; kind: string; expires: number } {
  try {
    const [value, sig, extra] = token.split(".");
    const expected = signature(value);
    if (
      extra ||
      !sig ||
      sig.length !== expected.length ||
      !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    )
      throw Error();
    const data = JSON.parse(Buffer.from(value, "base64url").toString());
    if (
      data.kind !== kind ||
      typeof data.id !== "string" ||
      !Number.isFinite(data.expires) ||
      data.expires < Date.now()
    )
      throw Error();
    return data;
  } catch {
    throw new SurveyError(
      "填写凭证已失效，请保存好当前页面并重新开始填写。",
      400,
    );
  }
}
export function sameOrigin(request: Request) {
  const allowed = [
    env("SURVEY_SITE_URL"),
    ...(process.env.SURVEY_ALLOWED_ORIGINS || "").split(",").filter(Boolean),
  ].map((value) => new URL(value.trim()).origin);
  if (!allowed.includes(request.headers.get("origin") || ""))
    throw new SurveyError("请求来源无效。", 403);
}
export async function readBody(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new SurveyError("请求格式无效。", 415);
  const reader = request.body?.getReader();
  if (!reader) throw new SurveyError("请求为空。", 400);
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 16384) {
      await reader.cancel();
      throw new SurveyError("请求过大。", 413);
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString());
  } catch {
    throw new SurveyError("请求格式无效。", 400);
  }
}
export async function rateLimit(
  request: Request,
  scope: string,
  limit: number,
) {
  // Vercel overwrites this trusted header. Other production hosts must supply an equivalent trusted proxy integration.
  const address = process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown"
    : "local";
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL)
    throw new SurveyError("当前部署的限流代理尚未配置。");
  const window = Math.floor(Date.now() / 600000);
  const allowed = await rpc<boolean>("survey_rate_limit", {
    p_key: signature(`${scope}:${window}:${address}`),
    p_limit: limit,
  });
  if (!allowed) throw new SurveyError("操作过于频繁，请在10分钟后重试。", 429);
}
const scryptAsync = promisify(scrypt);
function adminIdentity() {
  return signature(
    `admin:${env("SURVEY_ADMIN_EMAIL").toLowerCase()}:${env("SURVEY_ADMIN_PASSWORD_HASH")}`,
  );
}
export async function adminLogin(email: string, password: string) {
  const parts = env("SURVEY_ADMIN_PASSWORD_HASH").split(":");
  if (
    parts.length !== 3 ||
    parts[0] !== "scrypt" ||
    !/^[a-f0-9]{32}$/.test(parts[1]) ||
    !/^[a-f0-9]{128}$/.test(parts[2])
  )
    throw new SurveyError("管理员尚未配置完成。");
  const actual = (await scryptAsync(password, parts[1], 64)) as Buffer;
  const valid = timingSafeEqual(actual, Buffer.from(parts[2], "hex"));
  if (!valid || email.toLowerCase() !== env("SURVEY_ADMIN_EMAIL").toLowerCase())
    throw new SurveyError("登录失败，请检查账户信息。", 401);
  return sign({
    id: adminIdentity(),
    kind: "admin",
    expires: Date.now() + 3600000,
  });
}
export async function requireAdmin() {
  const token = (await cookies()).get("survey_admin")?.value;
  if (!token) throw new SurveyError("请先登录管理员账户。", 401);
  try {
    const data = verify(token, "admin");
    if (data.id !== adminIdentity()) throw Error();
  } catch {
    throw new SurveyError("登录已过期，请重新登录。", 401);
  }
}
export function errorResponse(error: unknown) {
  return Response.json(
    {
      error:
        error instanceof SurveyError
          ? error.message
          : "服务暂时不可用，请稍后重试。",
    },
    {
      status: error instanceof SurveyError ? error.status : 503,
      headers: {
        "Cache-Control": "no-store",
        ...(error instanceof SurveyError && error.status === 429
          ? { "Retry-After": "600" }
          : {}),
      },
    },
  );
}
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};
