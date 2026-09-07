import type { Respondent } from "@/lib/survey/admin";
export function HistoricalResponses({
  rows,
  version,
}: {
  rows: Respondent[];
  version: string;
}) {
  return (
    <section className="survey-card">
      <h2>历史版本：{version}</h2>
      <p>
        此版本与V2.1题目和编码不完全兼容，因此不与V2.1合并计算。共 {rows.length}{" "}
        份完整答卷。
      </p>
      <div className="survey-table-scroll">
        <table>
          <thead>
            <tr>
              <th>匿名编号</th>
              <th>提交时间</th>
              <th>原始回答数</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.public_id}</td>
                <td>
                  {new Date(r.completed_at).toLocaleString("zh-CN", {
                    timeZone: "Asia/Shanghai",
                  })}
                </td>
                <td>{r.survey_answers.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
