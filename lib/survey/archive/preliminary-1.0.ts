import "server-only";
// Archived preliminary questionnaire. Never import into the participant UI.
export type Question = {
  id: string;
  text: string;
  type: "likert" | "number";
  scenario?: string;
  unit?: string;
  randomizeGroup?: string;
};
export const SURVEY_VERSION = "1.0";
export const surveyQuestions: readonly Question[] = [
  {
    id: "A1",
    text: "即使一个人的生活选择不符合社会主流，只要没有伤害别人，就应该允许他自由选择。",
    type: "likert",
    randomizeGroup: "A",
  },
  {
    id: "A2",
    text: "父母即使认为子女正在做错误决定，也不应该替已经成年的子女决定人生。",
    type: "likert",
    randomizeGroup: "A",
  },
  {
    id: "A3",
    text: "一个人公开表达令人不舒服甚至冒犯多数人的观点，只要没有直接造成他人伤害，就不应该因此受到惩罚。",
    type: "likert",
    randomizeGroup: "A",
  },
  {
    id: "A4",
    text: "如果绝大多数人认为某种生活方式“不正常”，对这种生活方式进行一定限制是合理的。",
    type: "likert",
    randomizeGroup: "A",
  },
  {
    id: "B1",
    text: "为了让绝大多数人获益，让少数人承担一定程度的损失通常是可以接受的。",
    type: "likert",
    randomizeGroup: "B",
  },
  {
    id: "B2",
    text: "当个人利益与整体利益发生冲突时，个人原则上应该优先考虑整体利益。",
    type: "likert",
    randomizeGroup: "B",
  },
  {
    id: "B3",
    text: "经常指出自己所处社会的问题，可能意味着一个人对它缺乏足够的认同。",
    type: "likert",
    randomizeGroup: "B",
  },
  {
    id: "B4",
    text: "当自己所属的群体取得重要成就时，即使与个人生活没有直接关系，我仍然会产生明显的自豪感。",
    type: "likert",
    randomizeGroup: "B",
  },
  {
    id: "B5",
    text: "一个人长期移居其他国家并最终取得当地身份，在一定程度上意味着对出生地的背离。",
    type: "likert",
    randomizeGroup: "B",
  },
  {
    id: "C1",
    text: "面对复杂的社会问题，有时减少讨论和协商环节反而能够更有效地解决问题。",
    type: "likert",
    randomizeGroup: "C",
  },
  {
    id: "C2",
    text: "即使一种处理方式效率很高，如果缺乏稳定的规则约束，也可能造成长期问题。",
    type: "likert",
    randomizeGroup: "C",
  },
  {
    id: "C3",
    text: "当社会出现较大分歧时，维持正常秩序比让各种意见都得到充分表达更加重要。",
    type: "likert",
    randomizeGroup: "C",
  },
  {
    id: "C4",
    text: "即使绝大多数人支持一种做法，也应该考虑它是否会给少数人造成明显的不公平。",
    type: "likert",
    randomizeGroup: "C",
  },
  {
    id: "C5",
    text: "一个良好的运行机制，不应该过度依赖某个具体个人是否足够优秀。",
    type: "likert",
    randomizeGroup: "C",
  },
  {
    id: "D1",
    text: "普通人缺乏专业知识，因此复杂的公共事务主要交给专业人士决定会更合适。",
    type: "likert",
    randomizeGroup: "D",
  },
  {
    id: "D2",
    text: "即使普通人有时会作出错误判断，他们仍然应该拥有影响与自己生活密切相关事务的渠道。",
    type: "likert",
    randomizeGroup: "D",
  },
  {
    id: "D3",
    text: "如果一种管理方式能够持续改善大多数人的生活，那么普通人实际参与多少并没有那么重要。",
    type: "likert",
    randomizeGroup: "D",
  },
  {
    id: "D4",
    text: "即使增加公众参与会降低一些决策效率，这种参与本身仍然具有价值。",
    type: "likert",
    randomizeGroup: "D",
  },
  {
    id: "E1",
    text: "如果一种观点被我身边绝大多数人接受，我仍然会主动了解不同的解释。",
    type: "likert",
    randomizeGroup: "E",
  },
  {
    id: "E2",
    text: "当境内外的信息对同一件事情存在明显差异时，境外来源通常需要更加谨慎地看待。",
    type: "likert",
    randomizeGroup: "E",
  },
  {
    id: "E3",
    text: "国内信息在介绍其他国家和地区的问题时，同样应该经过不同来源的验证。",
    type: "likert",
    randomizeGroup: "E",
  },
  {
    id: "E4",
    text: "当一个消息符合我原来的判断时，我仍然有必要检查它的来源和证据。",
    type: "likert",
    randomizeGroup: "E",
  },
  {
    id: "E5",
    text: "如果一条基本属实的信息可能引起较大的误解或混乱，对它的传播进行一定限制是可以理解的。",
    type: "likert",
    randomizeGroup: "E",
  },
  {
    id: "E6",
    text: "当可靠证据与我原来的观点发生冲突时，我愿意改变自己的判断。",
    type: "likert",
    randomizeGroup: "E",
  },
  {
    id: "F1",
    text: "不同国家的普通人在生活目标和日常需求上，其实比人们想象得更加相似。",
    type: "likert",
    randomizeGroup: "F",
  },
  {
    id: "F2",
    text: "年轻人对其他国家生活的向往，很多时候是因为只看到了那里比较好的一面。",
    type: "likert",
    randomizeGroup: "F",
  },
  {
    id: "F3",
    text: "即使两个国家之间关系紧张，也没有必要因此改变对当地普通人的看法。",
    type: "likert",
    randomizeGroup: "F",
  },
  {
    id: "F4",
    text: "与一个人来自哪里相比，他实际持有什么观念更能影响我是否愿意和他交往。",
    type: "likert",
    randomizeGroup: "F",
  },
  {
    id: "G1",
    text: "为了维护非常重要的整体利益，在某些情况下采取高成本的对抗方式是可以接受的。",
    type: "likert",
    randomizeGroup: "G",
  },
  {
    id: "G2",
    text: "即使某种行动能够实现预期目标，也必须认真考虑它给普通家庭带来的生命和经济成本。",
    type: "likert",
    randomizeGroup: "G",
  },
  {
    id: "G3",
    text: "如果一种重大行动能够明显增强整体实力，我愿意为此承受个人生活水平下降带来的影响。",
    type: "likert",
    randomizeGroup: "G",
  },
  {
    id: "G4",
    text: "面对重大冲突时，优先考虑自己和家人的安全并不意味着缺乏责任感。",
    type: "likert",
    randomizeGroup: "G",
  },
  {
    id: "H1",
    text: "你是否支持实施？",
    type: "likert",
    scenario:
      "假设某项措施能够使90%的人平均收入增加5%，但会使另外10%的人收入下降40%，且没有额外补偿。",
  },
  {
    id: "H2",
    text: "如果你自己恰好属于收入下降40%的10%，你是否仍然支持实施？",
    type: "likert",
    scenario:
      "假设某项措施能够使90%的人平均收入增加5%，但会使另外10%的人收入下降40%，且没有额外补偿。",
  },
  {
    id: "I1",
    text: "一支球拍和一个球共110元。球拍比球贵100元。球多少钱？",
    type: "number",
    unit: "元",
    randomizeGroup: "I",
  },
  {
    id: "I2",
    text: "5台机器5分钟生产5件产品。那么100台相同机器生产100件产品需要多少分钟？",
    type: "number",
    unit: "分钟",
    randomizeGroup: "I",
  },
  {
    id: "I3",
    text: "湖里有一片睡莲，每天面积翻倍。如果48天覆盖整个湖面，那么覆盖一半湖面需要多少天？",
    type: "number",
    unit: "天",
    randomizeGroup: "I",
  },
];
export const scaleLabels = [
  "非常不同意",
  "比较不同意",
  "有点不同意",
  "说不清 / 中立",
  "有点同意",
  "比较同意",
  "非常同意",
];
export const demographicsOptions = {
  gender: ["男", "女", "其他", "不愿回答"],
  education: ["初中及以下", "高中 / 中专", "大专", "本科", "硕士及以上"],
  upbringing: ["农村", "县城", "地级市", "省会及以上"],
  overseas_experience: ["有", "无"],
  opposing_info_frequency: ["几乎不会", "偶尔", "有时", "经常", "非常经常"],
} as const;
export const demographicLabels = {
  gender: "性别",
  education: "最高学历",
  upbringing: "主要成长环境",
  overseas_experience: "是否有境外旅行、学习、工作或长期生活经历",
  opposing_info_frequency: "平时是否会主动接触与自己原有观点不同的信息",
};
export type Demographics = { age: string } & Record<
  keyof typeof demographicsOptions,
  string
>;
export const emptyDemographics: Demographics = {
  age: "",
  gender: "",
  education: "",
  upbringing: "",
  overseas_experience: "",
  opposing_info_frequency: "",
};
