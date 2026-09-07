import "server-only";
import { query } from "./server";
export type Summary = {
  total: number;
  started: number;
  today: number;
  averageDuration: number | null;
  averageCRT: number | null;
  lowQuality: number;
  questions: { question_id: string; mean: number; n: number }[];
  options: { question_id: string; answer_numeric: number; n: number }[];
  demographics: { key: string; value: string; n: number }[];
};
export type Respondent = {
  id: string;
  public_id: string;
  created_at: string;
  completed_at: string;
  age_group: string;
  gender: string;
  education: string;
  upbringing: string;
  current_residence: string;
  family_economic_status: string;
  overseas_experience_category: string;
  information_source: string;
  information_channels: string[];
  crt_score: number | null;
  duration_seconds: number;
  survey_version: string;
  possible_low_quality: boolean;
  minimum_reasonable_duration: number;
  survey_answers: {
    question_id: string;
    answer_numeric: number;
    is_correct: boolean | null;
  }[];
};
// Stable keyset pagination avoids the Supabase 1,000-row response cap.
export async function respondentPage(
  version: string,
  until: string,
  after = "",
) {
  return query<Respondent>(
    `select r.*, coalesce((select jsonb_agg(jsonb_build_object('question_id',a.question_id,'answer_numeric',a.answer_numeric,'is_correct',a.is_correct) order by a.question_id) from public.survey_answers a where a.respondent_id=r.id),'[]'::jsonb) as survey_answers from public.survey_respondents r where r.survey_version=$1 and r.completed_at <= $2::timestamptz and ($3::uuid is null or r.id > $3::uuid) order by r.id asc limit 500`,
    [version, until, after || null],
  );
}
export function csvCell(value: unknown) {
  let text =
    value === null || value === undefined
      ? ""
      : Array.isArray(value)
        ? value.join(" | ")
        : String(value);
  if (/^[\s]*[=+@-]/.test(text)) text = "'" + text;
  return '"' + text.replace(/"/g, '""') + '"';
}

export async function allRespondents(version: string) {
  const until = new Date().toISOString();
  const rows: Respondent[] = [];
  let after = "";
  for (;;) {
    const page = await respondentPage(version, until, after);
    rows.push(...page);
    if (page.length < 500) return rows;
    after = page[page.length - 1].id;
  }
}
