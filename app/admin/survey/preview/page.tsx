import { notFound } from "next/navigation";
import { AdminDashboard } from "@/components/survey/admin-dashboard";

import {
  surveyQuestions,
  demographicsOptions,
  SURVEY_VERSION,
} from "@/lib/survey/surveyQuestions";
import type { Respondent } from "@/lib/survey/admin";
import "@/app/survey/survey.css";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "调查后台 · 模拟预览",
  robots: { index: false, follow: false },
};
export default function Preview() {
  if (
    process.env.SURVEY_PREVIEW_MODE !== "1" ||
    process.env.VERCEL ||
    process.env.DATABASE_URL
  )
    notFound();
  const rows: Respondent[] = Array.from(
    { length: 127 },
    (_, i) =>
      ({
        id: `demo-${i}`,
        public_id: `示例-${String(i + 1).padStart(3, "0")}`,
        created_at: new Date(Date.UTC(2026, 8, 1, 0, i)).toISOString(),
        completed_at: new Date(Date.UTC(2026, 8, 1, 0, i + 5)).toISOString(),
        ...Object.fromEntries(
          Object.entries(demographicsOptions).map(([key, values], j) => [
            key,
            key === "information_channels"
              ? [values[i % values.length]]
              : key === "information_source"
                ? values[i % values.length]
                : values[(i + Math.floor(i / (j + 2))) % values.length],
          ]),
        ),
        crt_score: null,
        duration_seconds: 60 + ((i * 37) % 900),
        survey_version: SURVEY_VERSION,
        possible_low_quality: i % 9 === 0,
        minimum_reasonable_duration: 60,
        survey_answers: surveyQuestions.map((q, j) => ({
          question_id: q.id,
          answer_numeric: 1 + ((i * 3 + j) % 7),
          is_correct: null,
        })),
      }) as Respondent,
  );
  return (
    <main className="survey-shell">
      <div className="survey-wrap survey-admin">
        <h1>调查后台预览</h1>
        <p role="note">
          <strong>以下 127 份均为模拟答卷，不是真实调查结果。</strong>
          此页面不读取或写入数据库，仅在明确开启预览且未配置数据库的本地环境提供。
        </p>
        <AdminDashboard rows={rows} />
      </div>
    </main>
  );
}
