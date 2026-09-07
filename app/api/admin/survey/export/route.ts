import { requireAdmin, errorResponse } from "@/lib/survey/server";
import { respondentPage, csvCell, type Respondent } from "@/lib/survey/admin";
import { surveyQuestions, SURVEY_VERSION } from "@/lib/survey/surveyQuestions";
import { allMetrics, scoreAll } from "@/lib/survey/research";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET() {
  try {
    await requireAdmin();
    const until = new Date().toISOString();
    let page = await respondentPage(SURVEY_VERSION, until);
    const encoder = new TextEncoder();
    const keys: (keyof Respondent)[] = [
      "created_at",
      "completed_at",
      "age_group",
      "gender",
      "education",
      "upbringing",
      "current_residence",
      "family_economic_status",
      "overseas_experience_category",
      "information_channels",
      "information_source",
    ];
    const tail: (keyof Respondent)[] = [
      "duration_seconds",
      "survey_version",
      "possible_low_quality",
      "minimum_reasonable_duration",
    ];
    let first = true;
    let finished = false;
    const stream = new ReadableStream<Uint8Array>({
      async pull(controller) {
        try {
          if (first) {
            controller.enqueue(
              encoder.encode(
                "\uFEFF" +
                  [
                    "respondent_id",
                    "public_id",
                    ...keys,
                    ...surveyQuestions.map((q) => q.id),
                    ...allMetrics.map((m) => m.key),
                    ...tail,
                  ]
                    .map(csvCell)
                    .join(",") +
                  "\r\n",
              ),
            );
            first = false;
          }
          if (finished) {
            controller.close();
            return;
          }
          const text = page
            .map((row) => {
              const answers = Object.fromEntries(
                row.survey_answers.map((a) => [
                  a.question_id,
                  a.answer_numeric,
                ]),
              );
              return [
                row.id,
                row.public_id,
                ...keys.map((k) => row[k]),
                ...surveyQuestions.map((q) => answers[q.id]),
                ...allMetrics.map((m) => scoreAll(answers)[m.key]),
                ...tail.map((k) => row[k]),
              ]
                .map(csvCell)
                .join(",");
            })
            .join("\r\n");
          if (text) controller.enqueue(encoder.encode(text + "\r\n"));
          if (page.length < 500) {
            finished = true;
          } else {
            page = await respondentPage(
              SURVEY_VERSION,
              until,
              page[page.length - 1].id,
            );
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="survey-${SURVEY_VERSION}-${until.slice(0, 10)}.csv"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
