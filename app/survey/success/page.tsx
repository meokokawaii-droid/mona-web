import { SURVEY_VERSION } from "@/lib/survey/surveyQuestions";
import Link from "next/link";
import { cookies } from "next/headers";
import { query, rpc, verify } from "@/lib/survey/server";
import { ResultProfile } from "@/components/survey/result-profile";
export const dynamic = "force-dynamic";
export default async function Success() {
  let id: string | null = null,
    total: number | null = null,
    answers: Record<string, number> | null = null;
  try {
    id = verify(
      (await cookies()).get("survey_receipt_v21")?.value || "",
      "receipt",
    ).id;
  } catch {}
  if (id) {
    try {
      total = await rpc<number>("survey_count_version", {
        p_version: SURVEY_VERSION,
      });
      const rows = await query<{ question_id: string; answer_numeric: number }>(
        `select a.question_id,a.answer_numeric from public.survey_answers a join public.survey_respondents r on r.id=a.respondent_id where r.public_id=$1 and r.survey_version=$2`,
        [id, SURVEY_VERSION],
      );
      if (rows.length === 45)
        answers = Object.fromEntries(
          rows.map((r) => [r.question_id, Number(r.answer_numeric)]),
        );
    } catch {}
  }
  return (
    <main className="survey-wrap">
      <p className="survey-eyebrow">中国青年社会观念调查</p>
      <section className="survey-card">
        <h1>{id ? "提交成功" : "暂无提交凭证"}</h1>
        {id ? (
          <>
            <p>感谢你的参与。你的回答已经匿名记录。</p>
            <p className="survey-response">{id}</p>
            {total !== null && <p>当前已收集 {total} 份 V2.1 完整回答。</p>}
          </>
        ) : (
          <p>请在完成调查的浏览器中查看提交结果。</p>
        )}
        <Link className="survey-link" href="/">
          返回首页
        </Link>
      </section>
      {answers && <ResultProfile answers={answers} />}
    </main>
  );
}
