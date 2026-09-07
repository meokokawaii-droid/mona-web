export type Question = { id: string; text: string; type: "likert" };
export const SURVEY_VERSION = "V2.1";
export const SURVEY_TITLE = "中国青年社会观念调查";
export const SURVEY_EDITION = "V2.1";
export const surveyQuestions: readonly Question[] = [
  {
    id: "A1",
    text: "成年人的生活选择只要没有直接伤害他人，即使明显违背社会主流观念，也应该由本人决定。",
    type: "likert",
  },
  {
    id: "A2",
    text: "如果一种成年人的生活方式明显违背社会多数人的价值观，但没有直接伤害他人，社会仍然没有理由要求他改变。",
    type: "likert",
  },
  {
    id: "A3",
    text: "如果某些言论持续制造严重社会对立，即使没有直接煽动暴力，对其传播进行一定限制也是合理的。",
    type: "likert",
  },
  {
    id: "A4",
    text: "如果一个社会能够长期保持低犯罪率、经济发展和生活稳定，那么某些个人自由受到限制是可以接受的。",
    type: "likert",
  },
  {
    id: "A5",
    text: "即使一项措施得到绝大多数人的支持，也应该为受到不利影响的少数人保留明确的权利边界。",
    type: "likert",
  },
  {
    id: "B1",
    text: "对大多数普通人来说，只要长期努力、肯吃苦并不断提升自己，最终总能把生活过好。",
    type: "likert",
  },
  {
    id: "B2",
    text: "一个人长期处于较低收入水平，通常与他过去的个人选择和努力程度有很大关系。",
    type: "likert",
  },
  {
    id: "B3",
    text: "即使两个人同样努力，家庭背景、成长地区和时代机会的不同，也可能让他们最终处于完全不同的社会阶层。",
    type: "likert",
  },
  {
    id: "B4",
    text: "社会上取得成功的人，通常很容易低估运气和外部机会对自己成功的影响。",
    type: "likert",
  },
  {
    id: "B5",
    text: "很多被归因于“社会环境”的个人困境，其实通过更努力的行动是可以改变的。",
    type: "likert",
  },
  {
    id: "C1",
    text: "对于有劳动能力但收入长期较低的人，政府没有必要通过较大规模的再分配来提高他们的生活水平。",
    type: "likert",
  },
  {
    id: "C2",
    text: "如果扩大社会福利意味着普通中等收入者也需要承担更多税费，我仍然支持扩大基本社会保障。",
    type: "likert",
  },
  {
    id: "C3",
    text: "一个社会出现很大的收入差距并不一定有问题，只要每个人都有通过竞争提高收入的机会。",
    type: "likert",
  },
  {
    id: "C4",
    text: "即使私营机构能够提供更高效率，医疗、教育等基本公共服务仍应该主要由公共体系承担保障责任。",
    type: "likert",
  },
  {
    id: "C5",
    text: "即使能够明显缩小贫富差距，政府也应该谨慎限制个人和企业依法获得和支配财富的权利。",
    type: "likert",
  },
  {
    id: "D1",
    text: "即使一项政策能够给大多数人带来明显好处，如果制定或执行过程违反重要规则，也应该重新审查。",
    type: "likert",
  },
  {
    id: "D2",
    text: "当严格遵循既有程序会使严重问题长期得不到解决时，我可以接受先解决问题，再补充和完善程序。",
    type: "likert",
  },
  {
    id: "D3",
    text: "如果专业人士提出的方案有充分证据支持，即使多数公众暂时反对，也可以优先按照专业方案执行。",
    type: "likert",
  },
  {
    id: "D4",
    text: "即使普通公众缺乏专业知识，他们仍然应该对明显影响自身利益的重要公共事务拥有实际表达和参与的渠道。",
    type: "likert",
  },
  {
    id: "D5",
    text: "如果必须选择，我更愿意接受一个公众参与较少但长期治理效果良好的管理体系，而不是一个参与充分但长期治理效果较差的体系。",
    type: "likert",
  },
  {
    id: "E1",
    text: "即使一种观点让我非常反感，只要没有直接煽动暴力或伤害他人，也应该允许它公开表达。",
    type: "likert",
  },
  {
    id: "E2",
    text: "当一条信息非常符合我原来的判断时，我通常不会像面对相反信息时那样仔细核查它。",
    type: "likert",
  },
  {
    id: "E3",
    text: "当不同来源对同一件事情的描述存在明显冲突时，我不会仅仅因为信息来自境内或境外，就直接判断哪一方更可信。",
    type: "likert",
  },
  {
    id: "E4",
    text: "即使一条信息基本属实，如果它的广泛传播可能造成严重社会混乱，对其传播进行一定限制也是可以接受的。",
    type: "likert",
  },
  {
    id: "E5",
    text: "即使出现一些与我原有观点相反的证据，我通常也会认为这些证据可能存在其他问题。",
    type: "likert",
  },
  {
    id: "F1",
    text: "当外国媒体批评中国社会存在的问题时，即使其中一些批评基本属实，我仍可能本能地感到反感。",
    type: "likert",
  },
  {
    id: "F2",
    text: "在中国与其他国家发生明显利益冲突时，中国人原则上应该首先维护本国利益。",
    type: "likert",
  },
  {
    id: "F3",
    text: "公开讨论中国社会存在的问题，即使这些讨论会被外国人看到，也不等于损害国家利益。",
    type: "likert",
  },
  {
    id: "F4",
    text: "如果其他国家在某些制度、公共政策或社会治理方面确实做得更好，中国应该坦然承认并学习。",
    type: "likert",
  },
  {
    id: "F5",
    text: "一个人长期移居其他国家并取得当地身份，在一定程度上意味着他与出生地原有群体的关系已经发生了实质变化。",
    type: "likert",
  },
  {
    id: "G1",
    text: "社会竞争本来就会产生赢家和输家，结果存在较大差距并不一定意味着社会不公平。",
    type: "likert",
  },
  {
    id: "G2",
    text: "外卖员、流水线工人等职业收入较低，很大程度上是因为这类劳动在市场上更容易被替代。",
    type: "likert",
  },
  {
    id: "G3",
    text: "如果一个有劳动能力的成年人长期无法维持基本生活，他本人应该比社会环境承担更主要的责任。",
    type: "likert",
  },
  {
    id: "G4",
    text: "即使一个人的劳动在市场上的价值较低，他仍然应该拥有体面的劳动条件和基本生活保障。",
    type: "likert",
  },
  {
    id: "G5",
    text: "无论一个人过去作出了怎样的选择，当他陷入严重生活困境时，社会都应该为其保留基本的生存保障。",
    type: "likert",
  },
  {
    id: "H1",
    text: "我钦佩身边事业成功的人，并倾向于认为他们通常具有比普通人更强的能力。",
    type: "likert",
  },
  {
    id: "H2",
    text: "一个人能够获得很高的收入和社会地位，本身就在一定程度上说明他具有一些过人之处。",
    type: "likert",
  },
  {
    id: "H3",
    text: "白手起家的成功人士对于“普通人如何改变命运”的判断，通常比没有类似成功经历的人更值得参考。",
    type: "likert",
  },
  {
    id: "H4",
    text: "一个人在商业或职业上的成功，并不能说明他对教育、贫困或其他社会问题拥有更准确的判断。",
    type: "likert",
  },
  {
    id: "H5",
    text: "即使一个人的财富、学历或社会地位明显高于我，我也不会仅仅因此更倾向于接受他的观点。",
    type: "likert",
  },
  {
    id: "I1",
    text: "对普通人而言，认真了解、讨论和参与公共事务，通常很难真正改变现实。",
    type: "likert",
  },
  {
    id: "I2",
    text: "即使个人能够产生的影响非常有限，普通人参与和讨论公共事务仍然具有实际意义。",
    type: "likert",
  },
  {
    id: "I3",
    text: "很多公共讨论表面上是在争论原则和价值，实际上最终还是不同群体之间的利益竞争。",
    type: "likert",
  },
  {
    id: "I4",
    text: "我很难相信公共事务中的主要参与者真的会把原则放在自身或所属群体的利益之前。",
    type: "likert",
  },
  {
    id: "I5",
    text: "即使一项重大行动能够实现预期目标，也必须认真考虑普通家庭需要承担的生命和经济成本。",
    type: "likert",
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
export function getScaleLabel(_q: Question, value: number) {
  return scaleLabels[value - 1];
}
export const demographicsOptions = {
  age_group: ["18–22岁", "23–27岁", "28–31岁", "32–35岁"],
  gender: ["男", "女", "其他", "不愿回答"],
  education: ["初中及以下", "高中 / 中专 / 职高", "大专", "本科", "硕士及以上"],
  upbringing: ["农村", "县城 / 县级市", "地级市", "省会及以上城市"],
  current_residence: ["农村", "县城 / 县级市", "地级市", "省会及以上城市"],
  family_economic_status: [
    "明显低于周围平均水平",
    "略低于平均水平",
    "大致平均",
    "略高于平均水平",
    "明显高于平均水平",
  ],
  overseas_experience_category: [
    "无",
    "仅短期旅行",
    "曾学习或工作",
    "曾长期生活",
  ],
  information_channels: [
    "抖音 / 快手等短视频平台",
    "微博",
    "微信公众号 / 视频号",
    "B站",
    "小红书",
    "知乎",
    "今日头条 / 新闻客户端",
    "国内门户网站",
    "电视 / 报纸等传统媒体",
    "搜索引擎",
    "海外媒体",
    "X / YouTube / Reddit等境外平台",
    "AI工具",
    "家人、朋友、同学或同事",
    "基本不主动关注",
    "其他",
  ],
} as const;
export const demographicLabels = {
  age_group: "年龄",
  gender: "性别",
  education: "最高学历",
  upbringing: "主要成长环境",
  current_residence: "目前主要居住环境",
  family_economic_status: "你认为自己的家庭经济状况大致属于：",
  overseas_experience_category:
    "是否有其他国家或地区的旅行、学习、工作或长期生活经历：",
  information_channels: "你平时获取社会、公共事务或国际信息的主要渠道是？",
} as const;
export type Demographics = Record<
  Exclude<keyof typeof demographicsOptions, "information_channels">,
  string
> & { information_channels: string[] };
export const emptyDemographics: Demographics = {
  age_group: "",
  gender: "",
  education: "",
  upbringing: "",
  current_residence: "",
  family_economic_status: "",
  overseas_experience_category: "",
  information_channels: [],
};
