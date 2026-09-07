import {
  allMetrics,
  band,
  combinations,
  primaryMetricKeys,
  scoreAll,
} from "@/lib/survey/research";
export function ResultProfile({
  answers,
}: {
  answers: Record<string, number>;
}) {
  const scores = scoreAll(answers);
  const primary = primaryMetricKeys.map((k) =>
    allMetrics.find((m) => m.key === k)!,
  );
  const combos = combinations.filter(
    ([a, b, , mode]) =>
      scores[a] != null &&
      scores[b] != null &&
      (mode === "high-low"
        ? scores[a]! >= 4.5 && scores[b]! <= 3.49
        : scores[a]! >= 4.5 && scores[b]! >= 4.5),
  );
  return (
    <div className="survey-results">
      <h2>你的观点位置</h2>
      <p className="survey-muted">
        以下结果只描述本次回答在1–7刻度上的位置，不是能力或道德评价。
      </p>
      {primary.map((m) => {
        const v = scores[m.key]!;
        return (
          <article className="survey-result-row" key={m.key}>
            <div>
              <strong>{m.publicName}</strong>
              <span>
                {v.toFixed(2)} · {band(v)}
              </span>
            </div>
            <div
              className="survey-score-track"
              aria-label={`${m.publicName} ${v.toFixed(2)}分`}
            >
              <i style={{ width: `${((v - 1) / 6) * 100}%` }} />
            </div>
            <p>{m.description}</p>
          </article>
        );
      })}
      {combos.length > 0 && (
        <>
          <h2>观点组合</h2>
          <div className="survey-combinations">
            {combos.map(([a, b, text]) => (
              <article key={`${a}-${b}`}>
                <h3>
                  {allMetrics.find((m) => m.key === a)!.publicName} ×{" "}
                  {allMetrics.find((m) => m.key === b)!.publicName}
                </h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
