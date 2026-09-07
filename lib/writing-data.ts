export const allWritings = [
  { title: "蛋的世界猜想", description: "鸟要挣脱出壳，蛋就是世界；关于诞生、边界与摧毁旧世界。", link: "/writing/breaking-shell", category: "philosophy" },
  { title: "来处之前", description: "人没有选择自己的起点，却必须承担全部后果；关于出生、责任与被定义的人生。", link: "/writing/birth-consent", category: "dialogue" },
  { title: "进化的眼睛", description: "关于那些教我闭上眼睛的声音", link: "/writing/evolution", category: "self" },
  { title: "G老师的回答", description: "如果我不认同我的出身环境，那我该如何理解自己的过去？", link: "/writing/coming-from", category: "dialogue" },
  { title: "乡土", description: "这样的生活像是田园牧歌一般，农业的工业化把我的山村遗忘了", link: "/writing/homeland-and-desert", category: "homeland" },
  { title: "梦魇", description: "我们真的逃离不了这个头顶巨大的梦魇吗", link: "/writing/nightmare", category: "philosophy" },
  { title: "安居之下", description: "关于顺从、代价，以及被默认继承的生活规则。", link: "/writing/cannibalism", category: "philosophy" },
  { title: "活着", description: "当活着的时候，有人说：又一个幸福的人出生了...", link: "/writing/life-and-death", category: "philosophy" },
  { title: "此心安处是吾乡", description: "二十二岁，终于和我厌弃的一切达成了一种微妙的认同。", link: "/writing/inner-peace", category: "self" },
  { title: "刺穿", description: "杀死那个所谓评价的体系。为何任何目光都将要给予审判的权利？", link: "/writing/judgement", category: "philosophy" },
  { title: "不是我", description: "那些杀不死我的也并没有让我变得强大。But that's not mine.", link: "/writing/not-mine", category: "self" },
] as const

export type WritingCategory = (typeof allWritings)[number]["category"]
