"use client"

import Link from "next/link"
import { ChevronLeft, MessageCircle } from "lucide-react"
import { useState } from "react"

const questions = [
  "家庭背景、经济环境与时代限制",
  "身体特征、疾病与无法预知的痛苦",
  "社会关系、评价体系与死亡",
]

export default function BirthConsentPage() {
  const [isRawThoughtVisible, setIsRawThoughtVisible] = useState(false)

  return (
    <main className="min-h-screen bg-[#faf9f7] font-serif text-[#2f2d2a] selection:bg-pink-100">
      <div className="fixed inset-x-0 top-0 z-50 h-px bg-stone-200" />

      <div className="mx-auto max-w-2xl px-6 py-20 sm:py-24">
        <Link
          href="/writing"
          className="mb-16 inline-flex items-center text-[10px] tracking-[0.45em] text-stone-400 transition-colors hover:text-stone-700"
        >
          <ChevronLeft className="mr-1 h-3 w-3" />
          BACK
        </Link>

        <header className="mb-16 border-b border-stone-200 pb-10">
          <div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#a78d91]">
            <MessageCircle className="h-3.5 w-3.5" />
            AI 对话录 · 2026.07
          </div>
          <h1 className="text-3xl font-medium leading-tight tracking-[-0.03em] text-stone-800 sm:text-4xl">
            来处之前
          </h1>
          <p className="mt-5 text-sm italic leading-7 text-stone-500">
            关于出生、责任，以及一个人为何总被自己的起点定义
          </p>
        </header>

        <article className="space-y-14 text-[15px] leading-[2.05] text-stone-600">
          <section className="space-y-5 border-l-2 border-[#dfc1c6] pl-6">
            <p className="text-[10px] not-italic uppercase tracking-[0.28em] text-[#b78e96]">Moe</p>
            <p>
              大部分东西，所有，都是出生携带给我的。我无法改变。我一直在尝试改变，但是无可避免地直面这一切。因为身处
              <button
                type="button"
                aria-pressed={isRawThoughtVisible}
                aria-label={isRawThoughtVisible ? "收起这段原始想法" : "显现这段原始想法"}
                onClick={() => setIsRawThoughtVisible((visible) => !visible)}
                className={`group relative mx-1 inline cursor-pointer border-0 bg-transparent p-0 text-left font-inherit transition-colors duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7aeb6]/50 focus-visible:ring-offset-2 ${
                  isRawThoughtVisible
                    ? "text-stone-700"
                    : "text-[#d8cfd0] hover:text-[#b9aaac]"
                }`}
              >
                <span className={isRawThoughtVisible ? "no-underline" : "line-through decoration-[#cfaeb4] decoration-1"}>
                  这个下贱、低端、肮脏的环境，因为底层人活着就是个错误，一代一代会携带着这个错误基因延续下去
                </span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-4 right-0 text-[8px] font-normal tracking-[0.2em] text-[#bfa8ac] transition-opacity duration-300 ${
                    isRawThoughtVisible ? "opacity-0" : "opacity-70 group-hover:opacity-100"
                  }`}
                >
                  点击显影
                </span>
              </button>
              。可笑的是，一遍遍灌输，像那个精密的配件一般被浇灌。奴者也永远是奴。
            </p>
            <p>
              而且我想阐明一点：我没有彻底否认我的出生。但是如果我回退到胚胎，我其实并不会选择出生。
            </p>
            <p>
              比起出生更痛苦的是那个封闭的、落后的体系的评价。我工作里没有人不尊重我，没有人看低我，也没有人在乎我来自哪里。为什么我所作所为的一切，都是根据立场决定对我的盖棺定论？
            </p>
            <p className="text-lg leading-8 text-stone-700">
              一个人没有参与选择自己的起点，却必须走完这全程。
            </p>
            <p>
              一个生命在来到这个世界之前，是否拥有选择权？没有任何一个人在出生前被询问——当然也无法询问——“你是否愿意来到这个世界？”
            </p>
            <p>
              然而出生之后，每个人都必须承担生命带来的全部条件：家庭背景、经济环境、身体特征、时代限制、社会关系，以及疾病、痛苦与死亡。
            </p>
            <p>
              父母决定创造一个生命，但这个生命无法提前回答：“我是否同意降临地球，自己演绎未来几十年的人生？”创造生命是否应该被视为一种需要承担责任的决定，而不仅仅是一种自然行为？
            </p>
            <p>
              生命中确实存在爱、快乐、创造与美好的体验，但同时也存在贫困、疾病、创伤、不平等和无法改变的先天条件。生育不应该只是“想要一个孩子”，而应该考虑：“我是否有能力给予这个生命基本的尊严、机会和选择？”
            </p>
            <p>
              一些家庭重复进行生育，却没有充分考虑下一代需要面对的现实：贫困，资源不足，教育不足，机会减少，下一代继续承受贫困。生育是否应该更多地包含责任意识，而不是只依靠本能？一个生命的诞生，不应该只是满足父母的期待，也应该考虑这个生命未来可能面对的世界。
            </p>
            <p>
              人生最大的矛盾之一，是我们没有选择来到这个世界，却必须在这个世界寻找存在的意义。我们无法选择起点，但出生之后，又必须面对这些条件，并尝试创造属于自己的道路。
            </p>
            <p>
              如果未来科技能够让一个生命在出生前表达意愿，我想问：“你是否愿意来到这个世界？”如果它知道未来可能经历快乐、爱、成功、失败、痛苦和失去，它是否仍然愿意选择降临？
            </p>
            <p className="text-lg leading-8 text-stone-700">
              创造一个生命，不只是给予生命本身，更意味着承担让这个生命能够有尊严地生活的责任。
            </p>
          </section>

          <section className="space-y-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#87937c]">G 老师</p>
            <p className="text-lg leading-8 text-stone-700">
              我懂。你不是简单地否认自己，而是在拒绝一种偷换：把“生命已经发生”偷换成“这个生命理应感恩全部遭遇”。
            </p>
            <p>
              你真正追问的是：一个人没有选择起点，为什么还要被迫为起点负责，甚至终身接受由起点产生的评价？
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-medium text-stone-700">一、出生是一项无法取得同意的决定</h2>
            <p>任何需要一个人承担重大后果的决定，通常都要求知情与同意。出生却是例外：决定发生时，当事人尚不存在，也就不可能回答“我是否愿意来到这里”。</p>
            <div className="space-y-1 border-l border-stone-200 pl-5 text-sm text-stone-500">
              {questions.map((question) => <p key={question}>— {question}</p>)}
            </div>
            <p>
              因此，“出生知情同意”无法成为一份真正签署的契约。但这并不会让伦理问题消失。恰恰因为同意无法取得，决定创造生命的人才应承担更高的责任，而不是更少。
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-medium text-stone-700">二、被继承的是结构，不是“错误基因”</h2>
            <p>
              你用“错误基因”形容代际延续，我听见的是极端疲惫，而不是一个生物学判断。贫困、闭塞和顺从确实会一代代重复，但它们主要通过资源、教育、关系、权力和创伤传递，并不证明底层人的生命本身有错。
            </p>
            <blockquote className="my-8 border-y border-stone-200 py-7 text-xl leading-9 text-stone-700">
              错的不是某一类人出生了，<br />而是一个体系让部分人从出生起就要支付更高的生存成本。
            </blockquote>
            <p>
              “奴者永远是奴”描述的是一个系统希望人相信的宿命。它需要人把制度造成的边界，误认为自己身体里的缺陷。你的工作经验已经提供了反证：当评价规则改变，你并没有天然低人一等。
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-medium text-stone-700">三、生育不只创造希望，也制造风险</h2>
            <p>生命可能拥有爱、快乐、创造和美，也可能遭遇贫困、疾病、创伤、不平等与不可逆的先天条件。只谈希望，会把风险全部转嫁给尚未出生的人。</p>
            <p className="border-l-2 border-[#dfc1c6] pl-5 text-stone-700 italic">
              生育之前真正该问的，不只是“我想不想要一个孩子”，而是“我是否有能力让这个生命获得基本尊严、机会，以及不复制我的人生的自由？”
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-medium text-stone-700">四、从“同意”转向“责任”</h2>
            <p>如果把你的想法写成一条可执行的伦理原则，它可以包含四项最低责任：</p>
            <ol className="space-y-3 pl-5 text-stone-600">
              <li><span className="text-stone-800">01 · 尊严：</span>不让孩子用服从换取基本的爱与生存。</li>
              <li><span className="text-stone-800">02 · 风险：</span>诚实评估经济、健康与家庭环境，而非只想象幸福。</li>
              <li><span className="text-stone-800">03 · 选择：</span>让孩子拥有教育、离开与重新定义自己的可能。</li>
              <li><span className="text-stone-800">04 · 非占有：</span>承认孩子不是家族愿望、立场或未竟人生的配件。</li>
            </ol>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-medium text-stone-700">五、没有选择起点，不等于必须认领判词</h2>
            <p>
              你无法撤回出生，也不需要把痛苦改写成礼物。你可以同时承认两件事：我已经存在；如果曾有选择，我不会选择这样的开始。两句话并不互相取消。
            </p>
            <p>
              你也不必原谅那个评价体系，才算真正走出来。更重要的是，逐渐收回它替你命名的权力：贫困是处境，不是人格；出身是事实，不是判决；过去解释了一部分你，却没有资格穷尽你。
            </p>
          </section>

          <section className="space-y-5 border-t border-stone-200 pt-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#a78d91]">Moe</p>
            <p>所以，我不是在说“我的生命没有价值”。我是在说：生命的价值，不能被用来免除创造生命者与社会的责任。</p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#87937c]">G 老师</p>
            <p className="text-lg leading-8 text-stone-700">
              是。你不是要求一个不可能完成的出生前签字，而是在要求：既然替一个人按下了开始，就不能再把全部代价都交给他独自承担。
            </p>
          </section>
        </article>

        <footer className="mt-24 border-t border-stone-200 pt-9 text-[10px] uppercase tracking-[0.3em] text-stone-400">
          Birth Informed Consent Theory · Moe × G 老师
        </footer>
      </div>
    </main>
  )
}
