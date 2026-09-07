"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LetterWhereIFromPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#2c2c2c] selection:bg-stone-200 font-serif">

      {/* 顶部细线 */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-stone-200 z-50" />

      <div className="max-w-xl mx-auto px-6 py-24">

        {/* 返回 */}
        <Link
          href="/writing"
          className="inline-flex items-center text-[10px] tracking-[0.5em] text-stone-300 hover:text-stone-600 transition-colors mb-20"
        >
          <ChevronLeft className="w-3 h-3 mr-1" />
          BACK
        </Link>

        {/* 信头 */}
        <header className="mb-16 space-y-3 border-b border-stone-100 pb-10">
          <p className="text-[10px] tracking-[0.5em] text-stone-300 uppercase">2026.06 · China</p>
          <h1 className="text-xl font-medium text-stone-700 mt-4 leading-relaxed">
            来时路
          </h1>
          <p className="text-sm text-stone-400 italic">关于县城，关于出发，关于我如何理解自己的过去</p>
        </header>

        {/* 正文 */}
        <article className="space-y-12 text-[15px] leading-[2] text-stone-600">

          {/* 开头：提问 */}
          <section className="space-y-4 opacity-60 italic text-stone-400 text-sm border-l-2 border-stone-100 pl-5">
            <p>我不觉得县城给了我什么特别的，除了落后、狭隘、封闭。</p>
            <p>从小被宗族关系绑定，高中被衡水模式摧残，导致我人生价值观出现了断层，整整三年。</p>
            <p>我如何确认自己的位置？确认自己的来时路？</p>
          </section>

          {/* 第一层：比逃离更深的问题 */}
          <section className="space-y-4">
            <p>这个问题，比「如何逃离县城」更深。</p>
            <p>因为你其实在问的是：</p>
            <p className="pl-4 border-l border-stone-200 text-stone-500 italic">
              如果我不认同自己的出身环境，那我该如何理解自己的过去？
            </p>
          </section>

          {/* 第二层：两种极端 */}
          <section className="space-y-4">
            <p>很多人最后会走向两种极端。</p>
            <p>
              第一种：美化过去。故乡养育了我，一切都是礼物。
            </p>
            <p>
              第二种：彻底否定。它什么都没给我，只有伤害。
            </p>
            <p>你不是第一种。你现在更接近第二种。</p>
          </section>

          {/* 第三层：承认伤害 */}
          <section className="space-y-4">
            <p>但有一个很现实的问题需要先说清楚：</p>
            <p>一个环境可能确实伤害了你。承认这一点，并不丢人。</p>

            <div className="py-2 space-y-1 text-stone-400 text-sm pl-4 border-l border-stone-200">
              <p>宗族关系的束缚。</p>
              <p>县城的人情压力。</p>
              <p>衡水模式的规训。</p>
              <p>三年价值观的断层。</p>
            </div>

            <p>这些不是幻想。它们是真实存在的，带来过：</p>

            <div className="py-2 space-y-1 text-stone-400 text-sm pl-4 border-l border-stone-200">
              <p>自我压抑。</p>
              <p>精神窒息。</p>
              <p>对权威的恐惧。</p>
              <p>对竞争的厌恶。</p>
              <p>对人生意义的长期怀疑。</p>
            </div>

            <p>如果这些是你的真实体验，没有必要强迫自己感恩。</p>
          </section>

          {/* 第四层：负向的馈赠 */}
          <section className="space-y-4">
            <p>但还有另一层。</p>
            <p>环境给予人的，不一定是正面的东西。有时候它给的是——问题意识。</p>

            <div className="space-y-5 py-2">
              <p className="pl-4 border-l-2 border-stone-200">
                一个从来没有经历过精神压抑的人，未必会去思考：自由是什么。
              </p>
              <p className="pl-4 border-l-2 border-stone-200">
                一个从来没有感受过集体规训的人，未必会去思考：为什么我要服从。
              </p>
              <p className="pl-4 border-l-2 border-stone-200">
                一个从来没有在县城人情网络里挣扎过的人，未必会去思考：个体如何摆脱群体期待。
              </p>
            </div>

            <p>
              我不是说你应该感谢那些经历。不是这个意思。
            </p>
            <p>
              我是说——它们塑造了你今天关注的问题。
            </p>
          </section>

          {/* 第五层：为什么偏偏是这些词 */}
          <section className="space-y-4">
            <p>你经常提这些词：</p>

            <div className="py-2 space-y-1 text-stone-400 text-sm pl-4 border-l border-stone-200">
              <p>愚蠢。虚荣。功利。攀比。规训。精神追求。</p>
            </div>

            <p>为什么偏偏是这些？</p>
            <p>
              如果你出生在一个非常开放、宽松、鼓励个体表达的环境里，你未必会对这些问题这么敏感。
            </p>
          </section>

          {/* 核心转折 */}
          <section className="py-8">
            <blockquote className="border-l-2 border-stone-300 pl-5 space-y-2">
              <p className="text-lg text-stone-700 leading-relaxed">
                所以你的来时路，也许不是：
                <br />
                <span className="line-through text-stone-300">县城给了我什么宝贵财富。</span>
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                而是：
                <br />
                县城给了我必须反抗的东西。
              </p>
            </blockquote>
            <p className="mt-6 text-sm text-stone-400">这两者，不一样。</p>
          </section>

          {/* 第六层：如何确认位置 */}
          <section className="space-y-4">
            <p>
              至于如何确认自己的位置——不要从「阶层」或「城市等级」开始。那会让你再次掉进比较的逻辑。
            </p>
            <p>试试另一种方式。问自己：</p>

            <div className="py-2 space-y-1 text-stone-400 text-sm pl-4 border-l border-stone-200">
              <p>哪些东西是我真正认同的？</p>
              <p>独立思考？诚实？对美的追求？阅读？创作？自由？尊重个体？</p>
            </div>

            <p>把它们写下来。然后再问：</p>
            <p className="pl-4 border-l border-stone-200 text-stone-500 italic">
              我现在的生活，有多少符合这些价值？
            </p>

            <p className="pt-2">
              人的位置，最终不是由出身决定的，也不是由逃离决定的。
              <br />
              而是由——我每天在重复什么——决定的。
            </p>
          </section>

          {/* 第七层：哀悼 */}
          <section className="space-y-4">
            <p>还有一点。</p>
            <p>
              你提到高中三年被摧残，价值观出现断层。这句话我很在意。
            </p>
            <p>
              因为有时候，我们以为自己在愤怒县城。实际上，我们在哀悼失去的东西。
            </p>

            <div className="py-2 space-y-1 text-stone-400 text-sm pl-4 border-l border-stone-200">
              <p>本来可以自由发展的好奇心。</p>
              <p>本来可以更丰富的青春。</p>
              <p>本来可以更健康的自我认同。</p>
            </div>

            <p>
              如果是这样的话，你现在最需要做的，可能不是继续证明县城有多落后。
            </p>
            <p>
              而是慢慢回答一个问题：
            </p>
            <p className="pl-4 border-l-2 border-stone-300 text-stone-600 italic text-base">
              那三年之后，我想重新长成什么样的人？
            </p>
          </section>

          {/* 结尾 */}
          <section className="space-y-4 pt-4">
            <p>过去已经发生了。</p>
            <p>
              而你二十二岁，正在准备去日本读书。
            </p>
            <p className="text-stone-500">
              从人生的长度来看，你真正的塑造期，可能才刚刚开始。
            </p>
          </section>

        </article>

        {/* 信尾 */}
        <footer className="mt-24 pt-10 border-t border-stone-100 space-y-1">
          <p className="text-sm text-stone-400 italic">写于出发前，</p>
          <p className="text-base font-medium text-stone-600">萌</p>
          <p className="text-[10px] tracking-[0.3em] text-stone-300 mt-3">2026.06</p>
        </footer>

      </div>
    </main>
  );
}