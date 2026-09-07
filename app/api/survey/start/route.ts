import { randomUUID } from "node:crypto";
import {
  query,
  sameOrigin,
  rateLimit,
  sign,
  errorResponse,
} from "@/lib/survey/server";
import { SURVEY_VERSION } from "@/lib/survey/surveyQuestions";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    await rateLimit(request, "start", 20);
    const id = randomUUID();
    await query(
      "insert into public.survey_sessions(id,survey_version) values($1::uuid,$2)",
      [id, SURVEY_VERSION],
    );
    return Response.json(
      {
        token: sign({
          id,
          kind: "session",
          expires: Date.now() + 30 * 86400000,
        }),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
