"use client";
import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { Respondent } from "@/lib/survey/admin";
import {
  demographicLabels,
  demographicsOptions,
  surveyQuestions,
} from "@/lib/survey/surveyQuestions";
import { allMetrics, scoreAll } from "@/lib/survey/research";
type Key = keyof typeof demographicLabels;
const keys = Object.keys(demographicLabels) as Key[];
const mean = (v: number[]) =>
  v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
const median = (v: number[]) => {
  if (!v.length) return null;
  const s = [...v].sort((a, b) => a - b),
    m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const sd = (v: number[]) => {
  const m = mean(v);
  return v.length > 1
    ? Math.sqrt(v.reduce((s, x) => s + (x - m!) ** 2, 0) / (v.length - 1))
    : null;
};
const fmt = (v: number | null) => (v == null ? "—" : v.toFixed(2));
const pearson = (a: number[], b: number[]) => {
  if (a.length < 3) return null;
  const ma = mean(a)!,
    mb = mean(b)!,
    n = a.reduce((s, x, i) => s + (x - ma) * (b[i] - mb), 0),
    d = Math.sqrt(
      a.reduce((s, x) => s + (x - ma) ** 2, 0) *
        b.reduce((s, x) => s + (x - mb) ** 2, 0),
    );
  return d ? n / d : null;
};
export function AdminDashboard({ rows }: { rows: Respondent[] }) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [question, setQuestion] = useState("A1");
  const [metricKey, setMetricKey] = useState("personal_autonomy");
  const [group, setGroup] = useState<Key>("age_group");
  const filtered = useMemo(
    () =>
      rows.filter((r) =>
        keys.every(
          (k) =>
            !filters[k] ||
            (Array.isArray(r[k])
              ? (r[k] as string[]).includes(filters[k])
              : r[k] === filters[k]),
        ),
      ),
    [rows, filters],
  );
  const records = useMemo(
    () =>
      filtered.map((r) => ({
        row: r,
        answers: Object.fromEntries(
          r.survey_answers.map((a) => [
            a.question_id,
            Number(a.answer_numeric),
          ]),
        ),
      })),
    [filtered],
  );
  const qstats = useMemo(
    () =>
      surveyQuestions.map((q) => {
        const v = records.map((r) => r.answers[q.id]).filter(Number.isFinite);
        return {
          id: q.id,
          n: v.length,
          mean: mean(v),
          median: median(v),
          sd: sd(v),
          distribution: Array.from({ length: 7 }, (_, i) => ({
            value: String(i + 1),
            count: v.filter((x) => x === i + 1).length,
            percent: v.length
              ? (100 * v.filter((x) => x === i + 1).length) / v.length
              : 0,
          })),
        };
      }),
    [records],
  );
  const selected = qstats.find((x) => x.id === question)!;
  const metricRows = useMemo(
    () =>
      allMetrics.map((m) => {
        const v = records
          .map((r) => scoreAll(r.answers)[m.key])
          .filter(Number.isFinite) as number[];
        return {
          ...m,
          n: v.length,
          mean: mean(v),
          median: median(v),
          sd: sd(v),
          min: v.length ? Math.min(...v) : null,
          max: v.length ? Math.max(...v) : null,
        };
      }),
    [records],
  );
  const scores = useMemo(
    () => records.map((r) => scoreAll(r.answers)),
    [records],
  );
  const corr = useMemo(
    () =>
      allMetrics.map((a) =>
        allMetrics.map((b) => {
          const pairs = scores.filter(
            (s) => Number.isFinite(s[a.key]) && Number.isFinite(s[b.key]),
          );
          return pearson(
            pairs.map((s) => s[a.key]!),
            pairs.map((s) => s[b.key]!),
          );
        }),
      ),
    [scores],
  );
  const metricDistribution = useMemo(() => {
    const values = scores
      .map((s) => s[metricKey])
      .filter(Number.isFinite) as number[];
    return Array.from({ length: 13 }, (_, i) => {
      const value = 1 + i * 0.5;
      return {
        value: value.toFixed(1),
        count: values.filter((v) => Math.round(v * 2) / 2 === value).length,
      };
    });
  }, [scores, metricKey]);
  const comparison = demographicsOptions[group].map((label) => {
    const members = records.filter(({ row: r }) =>
      Array.isArray(r[group])
        ? (r[group] as string[]).includes(label)
        : r[group] === label,
    );
    const v = members.map((r) => r.answers[question]).filter(Number.isFinite);
    return { label, n: v.length, mean: mean(v) };
  });
  const alpha = (items: { id: string; reverse?: boolean }[]) => {
    if (items.length < 2 || records.length < 3) return null;
    const matrix = records
      .map((r) =>
        items.map((i) => (i.reverse ? 8 - r.answers[i.id] : r.answers[i.id])),
      )
      .filter((v) => v.every(Number.isFinite));
    if (matrix.length < 3) return null;
    const itemVars = items
        .map((_, j) => sd(matrix.map((x) => x[j]))! ** 2)
        .reduce((a, b) => a + b, 0),
      totalVar = sd(matrix.map((x) => x.reduce((a, b) => a + b, 0)))! ** 2;
    return totalVar
      ? (items.length / (items.length - 1)) * (1 - itemVars / totalVar)
      : null;
  };
  return (
    <div className="survey-dashboard">
      <section className="survey-card">
        <h2>筛选答卷</h2>
        <div className="admin-filter-grid">
          {keys.map((k) => (
            <label key={k}>
              {demographicLabels[k]}
              <select
                value={filters[k] || ""}
                onChange={(e) =>
                  setFilters({ ...filters, [k]: e.target.value })
                }
              >
                <option value="">全部</option>
                {demographicsOptions[k].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <p>
          当前筛选：{filtered.length} 份 V2.1
          答卷。多选信息来源会分别进入每个所选来源组。
        </p>
      </section>
      <section className="survey-card">
        <h2>单题描述统计</h2>
        <label>
          题目{" "}
          <select
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          >
            {surveyQuestions.map((q) => (
              <option key={q.id} value={q.id}>
                {q.id} · {q.text}
              </option>
            ))}
          </select>
        </label>
        <dl className="survey-metrics">
          <div>
            <dt>N</dt>
            <dd>{selected.n}</dd>
          </div>
          <div>
            <dt>Mean</dt>
            <dd>{fmt(selected.mean)}</dd>
          </div>
          <div>
            <dt>Median</dt>
            <dd>{fmt(selected.median)}</dd>
          </div>
          <div>
            <dt>SD</dt>
            <dd>{fmt(selected.sd)}</dd>
          </div>
        </dl>
        <div className="survey-chart">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={selected.distribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(v, name, p) => [
                  `${v} 人（${p.payload.percent.toFixed(1)}%）`,
                  "人数",
                ]}
              />
              <Bar dataKey="count" fill="#425c59" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="survey-table-scroll">
          <table>
            <thead>
              <tr>
                <th>选项</th>
                <th>人数</th>
                <th>比例</th>
              </tr>
            </thead>
            <tbody>
              {selected.distribution.map((d) => (
                <tr key={d.value}>
                  <td>{d.value}</td>
                  <td>{d.count}</td>
                  <td>{d.percent.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>按人口学变量比较</h3>
        <select value={group} onChange={(e) => setGroup(e.target.value as Key)}>
          {keys.map((k) => (
            <option key={k} value={k}>
              {demographicLabels[k]}
            </option>
          ))}
        </select>
        <div className="survey-table-scroll">
          <table>
            <thead>
              <tr>
                <th>组别</th>
                <th>N</th>
                <th>Mean</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((x) => (
                <tr key={x.label}>
                  <td>{x.label}</td>
                  <td>{x.n}</td>
                  <td>{fmt(x.mean)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="survey-card">
        <h2>21个分析变量</h2>
        <p className="survey-muted">
          派生指标由原始答案实时计算，数据库中的1–7原始回答不被覆盖。
        </p>
        <div className="survey-table-scroll">
          <table>
            <thead>
              <tr>
                <th>指标</th>
                <th>N</th>
                <th>Mean</th>
                <th>Median</th>
                <th>SD</th>
                <th>Min</th>
                <th>Max</th>
                <th>α</th>
              </tr>
            </thead>
            <tbody>
              {metricRows.map((m) => (
                <tr key={m.key}>
                  <td>
                    {m.name}
                    <br />
                    <small>{m.key}</small>
                  </td>
                  <td>{m.n}</td>
                  <td>{fmt(m.mean)}</td>
                  <td>{fmt(m.median)}</td>
                  <td>{fmt(m.sd)}</td>
                  <td>{fmt(m.min)}</td>
                  <td>{fmt(m.max)}</td>
                  <td>{m.items.length > 1 ? fmt(alpha(m.items)) : "单题"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="survey-muted">
          两题指标的 α 仅作参考，不据此自动删除题目。样本不足时不强调信度。
        </p>
        <h3>派生指标分布</h3>
        <select
          value={metricKey}
          onChange={(e) => setMetricKey(e.target.value)}
        >
          {allMetrics.map((m) => (
            <option key={m.key} value={m.key}>
              {m.name}
            </option>
          ))}
        </select>
        <div className="survey-chart">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={metricDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#425c59" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="survey-card">
        <h2>指标相关矩阵</h2>
        <p className="survey-muted">
          显示当前筛选样本的 Pearson 相关；N不足3时留空，不预设相关方向。
        </p>
        <div className="survey-table-scroll">
          <table className="correlation-table">
            <thead>
              <tr>
                <th>指标</th>
                {allMetrics.map((m) => (
                  <th key={m.key} title={m.name}>
                    {m.publicName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allMetrics.map((m, i) => (
                <tr key={m.key}>
                  <th>{m.publicName}</th>
                  {allMetrics.map((n, j) => (
                    <td key={n.key}>{fmt(corr[i][j])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="survey-card">
        <h2>量表验证说明</h2>
        <p>
          目前21个变量属于理论预设。N＜200时不强调因子分析；N≥300后再执行探索性因子分析，N≥500时可考虑拆分样本进行EFA与CFA。
        </p>
        <p>
          当前不展示全国百分位。V2.1有效样本达到100后，才可显示明确标注为“当前样本”的百分位。
        </p>
      </section>
    </div>
  );
}
