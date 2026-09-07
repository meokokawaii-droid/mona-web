import Link from "next/link";
import {
  configured,
  requireAdmin,
  rpc,
  query,
  SurveyError,
} from "@/lib/survey/server";
import { type Summary, allRespondents } from "@/lib/survey/admin";
import { AdminDashboard } from "@/components/survey/admin-dashboard";
import { HistoricalResponses } from "@/components/survey/historical-responses";
import { SURVEY_VERSION, SURVEY_EDITION } from "@/lib/survey/surveyQuestions";
import { AdminLogin, Logout } from "@/components/survey/admin-login";
import "@/app/survey/survey.css";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "调查管理",
  robots: { index: false, follow: false },
};
async function load(version: string) {
  try {
    await requireAdmin();
    const versions = (
      await query<{ survey_version: string }>(
        `select distinct survey_version from public.survey_respondents union select distinct survey_version from public.survey_sessions order by survey_version desc`,
      )
    ).map((x) => x.survey_version);
    const [summary, rows] = await Promise.all([
      rpc<Summary>("survey_summary_v1_final", { p_version: version }),
      allRespondents(version),
    ]);
    return { status: "ok" as const, versions, summary, rows };
  } catch (e) {
    return {
      status:
        e instanceof SurveyError && [401, 403].includes(e.status)
          ? ("login" as const)
          : ("error" as const),
    };
  }
}
export default async function AdminSurvey({
  searchParams,
}: {
  searchParams: Promise<{ version?: string }>;
}) {
  const requested = (await searchParams).version || SURVEY_VERSION;
  let content: React.ReactNode;
  if (!configured())
    content = (
      <section className="survey-card">
        <h1>调查后台尚未配置</h1>
      </section>
    );
  else {
    const data = await load(requested);
    if (data.status === "login") content = <AdminLogin />;
    else if (data.status === "error")
      content = (
        <section className="survey-card">
          <h1>暂时无法读取后台数据</h1>
        </section>
      );
    else {
      const versions = data.versions!;
      const summary = data.summary!;
      const currentRows = data.rows!;
      const selected = versions.includes(requested)
        ? requested
        : SURVEY_VERSION;
      const rows =
        selected === requested ? currentRows : await allRespondents(selected);
      content = (
        <>
          <h1>匿名调查管理</h1>
          <p>
            当前问卷 {SURVEY_EDITION} · 数据版本 {SURVEY_VERSION}
          </p>
          <Logout />
          <nav className="survey-version-nav" aria-label="问卷版本">
            <strong>查看版本：</strong>
            <Link href="/admin/survey?version=V2.1">
              V2.1 only / All compatible responses
            </Link>
            {versions
              .filter((v) => v !== SURVEY_VERSION)
              .map((v) => (
                <Link
                  key={v}
                  href={`/admin/survey?version=${encodeURIComponent(v)}`}
                >
                  {v}
                </Link>
              ))}
          </nav>
          {selected === SURVEY_VERSION ? (
            <>
              <p>
                开始次数：{summary.started}；完整答卷：{summary.total}
                ；异常短时长标记：{summary.lowQuality}。
              </p>
              <AdminDashboard rows={rows} />
            </>
          ) : (
            <HistoricalResponses rows={rows} version={selected} />
          )}
        </>
      );
    }
  }
  return (
    <div className="survey-shell">
      <main className="survey-wrap survey-admin">
        <header className="survey-top">
          <Link href="/">返回首页</Link>
          <span>仅管理员可见</span>
        </header>
        {content}
      </main>
    </div>
  );
}

