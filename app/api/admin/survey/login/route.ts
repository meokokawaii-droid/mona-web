import { cookies } from "next/headers";
import { z } from "zod";
import {
  sameOrigin,
  rateLimit,
  readBody,
  adminLogin,
  cookieOptions,
  errorResponse,
  SurveyError,
} from "@/lib/survey/server";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    await rateLimit(request, "login", 5);
    const parsed = z
      .object({
        email: z.string().email().max(254),
        password: z.string().min(1).max(256),
      })
      .strict()
      .safeParse(await readBody(request));
    if (!parsed.success) throw new SurveyError("请填写有效的登录信息。", 400);
    const token = await adminLogin(parsed.data.email, parsed.data.password);
    (await cookies()).set("survey_admin", token, {
      ...cookieOptions,
      maxAge: 3600,
    });
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
export async function DELETE(request: Request) {
  try {
    sameOrigin(request);
    (await cookies()).delete("survey_admin");
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
