import { cookies } from "next/headers";
import { submissionSchema } from "@/lib/survey/validation";
import { MINIMUM_REASONABLE_DURATION } from "@/lib/survey/research";
import { surveyQuestions } from "@/lib/survey/surveyQuestions";
import {
  sameOrigin,
  rateLimit,
  readBody,
  verify,
  rpc,
  sign,
  cookieOptions,
  errorResponse,
  SurveyError,
} from "@/lib/survey/server";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    await rateLimit(request, "submit", 10);
    const parsed = submissionSchema.safeParse(await readBody(request));
    if (!parsed.success)
      throw new SurveyError(
        "请检查全部题目及基础信息是否填写完整，请按选项选择年龄段。",
        400,
      );
    const { answers, demographics, token, version } = parsed.data;
    const session = verify(token, "session");
    const rows = surveyQuestions.map((q) => ({
      question_id: q.id,
      answer_numeric: answers[q.id],
      is_correct: null,
    }));
    const result = await rpc<{ public_id: string; total: number }>(
      "survey_submit_v21",
      {
        p_session: session.id,
        p_version: version,
        p_demographics: demographics,
        p_answers: rows,
        p_min_duration: MINIMUM_REASONABLE_DURATION,
      },
    );
    (await cookies()).set(
      "survey_receipt_v21",
      sign({
        kind: "receipt",
        id: result.public_id,
        expires: Date.now() + 30 * 86400000,
      }),
      { ...cookieOptions, maxAge: 30 * 86400 },
    );
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse(error);
  }
}
