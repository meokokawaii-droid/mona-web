export type AnswerMap = Record<string, number>;
export type Metric = {
  key: string;
  name: string;
  publicName: string;
  items: { id: string; reverse?: boolean }[];
  description: string;
};
export const metrics: Metric[] = [
  {
    key: "personal_autonomy",
    name: "个人自主",
    publicName: "个人自主",
    items: [{ id: "A1" }, { id: "A2" }, { id: "A5" }],
    description: "更强调成年人的自主选择以及少数人的权利边界。",
  },
  {
    key: "expression_freedom",
    name: "表达自由倾向",
    publicName: "表达自由倾向",
    items: [
      { id: "E1" },
      { id: "A3", reverse: true },
      { id: "E4", reverse: true },
    ],
    description: "更不愿意因为社会冲突或秩序风险限制表达。",
  },
  {
    key: "order_performance_priority",
    name: "秩序与绩效优先",
    publicName: "秩序与绩效",
    items: [{ id: "A4" }, { id: "D2" }, { id: "D5" }],
    description: "更愿意在秩序、治理效果与程序或自由之间优先考虑前者。",
  },
  {
    key: "proceduralism",
    name: "程序约束倾向",
    publicName: "程序约束倾向",
    items: [{ id: "D1" }, { id: "D2", reverse: true }],
    description: "更强调程序和规则不能因短期效率而轻易绕过。",
  },
  {
    key: "public_participation",
    name: "公共参与倾向",
    publicName: "公共参与倾向",
    items: [{ id: "D4" }, { id: "I2" }, { id: "I1", reverse: true }],
    description: "更认可普通人参与公共事务的价值和现实意义。",
  },
  {
    key: "meritocracy",
    name: "努力与个人责任归因",
    publicName: "努力归因",
    items: [{ id: "B1" }, { id: "B2" }, { id: "B5" }],
    description: "更相信努力、个人选择和行动能够解释社会经济结果。",
  },
  {
    key: "structural_attribution",
    name: "结构因素归因",
    publicName: "结构归因",
    items: [{ id: "B3" }, { id: "B4" }],
    description: "更强调家庭、机会、时代和外部环境对人生结果的影响。",
  },
  {
    key: "welfare_orientation",
    name: "福利保障倾向",
    publicName: "福利保障",
    items: [{ id: "C1", reverse: true }, { id: "C2" }, { id: "C4" }],
    description: "更支持再分配、社会保障和公共体系承担基本保障责任。",
  },
  {
    key: "market_outcome_acceptance",
    name: "市场结果接受度",
    publicName: "市场结果接受",
    items: [{ id: "C3" }, { id: "C5" }],
    description: "更能接受市场竞争产生的收入差距，并强调合法财产权边界。",
  },
  {
    key: "defensive_national_identification",
    name: "防御性国家认同",
    publicName: "国家认同",
    items: [{ id: "F1" }, { id: "F2" }],
    description: "面对外部批评或国家间利益冲突时，更容易优先形成国家身份立场。",
  },
  {
    key: "external_openness",
    name: "对外开放倾向",
    publicName: "对外开放",
    items: [{ id: "F3" }, { id: "F4" }],
    description: "更能区分批评与否定，也更愿意承认和学习其他社会的有效经验。",
  },
  {
    key: "social_darwinism",
    name: "竞争—弱者责任倾向",
    publicName: "竞争与责任观",
    items: [
      { id: "G1" },
      { id: "G3" },
      { id: "G4", reverse: true },
      { id: "G5", reverse: true },
    ],
    description: "更强调竞争结果和困境中的个人责任。",
  },
  {
    key: "success_attribution",
    name: "成功能力归因",
    publicName: "成功能力归因",
    items: [{ id: "H1" }, { id: "H2" }],
    description: "更倾向于把成功和较高地位解释为能力或个人特质的证据。",
  },
  {
    key: "epistemic_deference",
    name: "地位认知服从",
    publicName: "地位认知服从",
    items: [
      { id: "H3" },
      { id: "H4", reverse: true },
      { id: "H5", reverse: true },
    ],
    description: "更倾向于把成功、财富或地位转化为对判断力的信任。",
  },
  {
    key: "political_cynicism",
    name: "政治犬儒倾向",
    publicName: "公共信任",
    items: [{ id: "I3" }, { id: "I4" }],
    description:
      "更倾向于把公共事务理解为利益竞争，对参与者的原则动机较不信任。",
  },
  {
    key: "confirmation_bias",
    name: "既有观点维护倾向",
    publicName: "既有观点维护倾向",
    items: [{ id: "E2" }, { id: "E5" }],
    description: "更倾向于降低对符合原有判断的信息的核查力度，并警惕反向证据。",
  },
];
export const singleMetrics: Metric[] = [
  {
    key: "technocratic_preference",
    name: "专业治理偏好",
    publicName: "专业治理偏好",
    items: [{ id: "D3" }],
    description: "在专业证据与多数意见冲突时，更愿意优先专业方案。",
  },
  {
    key: "source_neutrality",
    name: "来源中立倾向",
    publicName: "来源中立倾向",
    items: [{ id: "E3" }],
    description: "较少仅根据境内或境外来源身份判断可信度。",
  },
  {
    key: "market_attribution",
    name: "市场价值归因",
    publicName: "市场价值归因",
    items: [{ id: "G2" }],
    description: "更倾向于用劳动力可替代性解释职业收入差异。",
  },
  {
    key: "identity_boundary",
    name: "身份边界认知",
    publicName: "身份边界认知",
    items: [{ id: "F5" }],
    description: "更倾向于认为长期移居和身份改变会改变个人与出生地群体的关系。",
  },
  {
    key: "conflict_cost_sensitivity",
    name: "重大冲突成本敏感度",
    publicName: "重大冲突成本敏感度",
    items: [{ id: "I5" }],
    description: "更强调重大集体行动必须考虑普通家庭承担的生命和经济成本。",
  },
];
export const allMetrics = [...metrics, ...singleMetrics];
export const primaryMetricKeys = [
  "personal_autonomy",
  "order_performance_priority",
  "meritocracy",
  "structural_attribution",
  "welfare_orientation",
  "market_outcome_acceptance",
  "defensive_national_identification",
  "external_openness",
];
export function scoreMetric(metric: Metric, answers: AnswerMap) {
  const values = metric.items
    .map((i) => answers[i.id])
    .filter(Number.isFinite)
    .map((v, j) => (metric.items[j].reverse ? 8 - v : v));
  return values.length === metric.items.length
    ? values.reduce((a, b) => a + b, 0) / values.length
    : null;
}
export function scoreAll(answers: AnswerMap) {
  return Object.fromEntries(
    allMetrics.map((m) => [m.key, scoreMetric(m, answers)]),
  ) as Record<string, number | null>;
}
export function band(v: number) {
  return v < 2.5
    ? "明显偏低"
    : v < 3.5
      ? "偏低"
      : v < 4.5
        ? "中间"
        : v < 5.5
          ? "偏高"
          : "明显偏高";
}
export const combinations = [
  [
    "meritocracy",
    "structural_attribution",
    "你同时认可个人努力的重要性，也高度意识到家庭背景、机会和社会结构对人生结果的影响。你并不倾向于把个人能动性和结构约束理解为二选一。",
  ],
  [
    "success_attribution",
    "epistemic_deference",
    "你倾向于承认现实中的成功通常与某些个人能力有关，但不会进一步把财富或职业成功视为一个人在其他领域拥有更高判断力的证明。",
    "high-low",
  ],
  [
    "market_attribution",
    "social_darwinism",
    "你能够接受市场供需和劳动可替代性对收入差异的解释，但仍然认为市场价值较低的人应该拥有基本保障和体面的生活条件。",
    "high-low",
  ],
  [
    "defensive_national_identification",
    "external_openness",
    "你具有较明显的国家身份认同，同时并不排斥对内部问题的公开讨论，也愿意承认和学习其他社会的有效经验。",
  ],
  [
    "order_performance_priority",
    "proceduralism",
    "你既重视治理效率和社会稳定，也认为权力运行需要受到稳定规则约束。你的回答不支持简单的“效率与程序二选一”。",
  ],
  [
    "public_participation",
    "technocratic_preference",
    "你认可专业知识在复杂公共事务中的重要性，同时认为普通人仍然应该拥有真实的表达和参与渠道。",
  ],
] as const;
export const MINIMUM_REASONABLE_DURATION = 75;
