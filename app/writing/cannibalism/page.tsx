"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

// 💡 逐字渲染的高级小组件：将文字拆成单个字符，并生成错开的延迟动画
function TypewriterText({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block animate-[textFadeIn_0.3s_ease_forwards] opacity-0"
          style={{
            animationDelay: `${startDelay + index * 0.04}s`, // 每个字间隔 0.04 秒显现
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export default function WritingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
   animateStyle();
  }, []);

  // 注入打字机所需要的全局关键帧动画
  const animateStyle = () => {
    if (typeof document !== "undefined") {
      const id = "typewriter-effect-styles";
      if (!document.getElementById(id)) {
        const style = document.createElement("style");
        style.id = id;
        style.innerHTML = `
          @keyframes textFadeIn {
            from { opacity: 0; transform: translateY(2px); filter: blur(1px); }
            to { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-[#d1d1d1] selection:bg-red-900 selection:text-white">
      <div className="max-w-2xl mx-auto px-6 py-20 relative">
        
        {/* 背景氛围：半透明的“吃”字残影 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] select-none flex flex-wrap gap-20 p-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="text-9xl font-serif text-red-600 rotate-12">食</span>
          ))}
        </div>

        {/* 返回按钮 */}
        <Link href="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-red-600 transition-all mb-16 group z-10 relative">
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO REALITY
        </Link>

        {/* 文章主体 */}
        <article className="relative z-10 space-y-16 leading-[2] tracking-[0.1em]">
          
          <header className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-tighter hover:skew-x-2 transition-transform cursor-default font-serif">
                <TypewriterText text="安居之下" startDelay={0} />
              </h1>
              <div className="h-0.5 w-20 bg-red-800 animate-pulse"></div>
            </div>
            <p className="text-xs text-neutral-500 font-serif italic tracking-[0.3em]">
              <TypewriterText text="—— 萌 (MONA WANG)" startDelay={0.6} />
            </p>
          </header>

          <div className="space-y-12 text-[16px] font-light">
            
            <p className="hover:text-white transition-colors duration-500 cursor-help">
              <TypewriterText text="到吃人 在这个世界上不仅仅美国爱泼斯坦岛吃人 据说专吃年轻女孩 大洋彼岸另一端 不愿透露姓名的萌女郎表示 吃人是很平常的事情 发生在我身边自己曾见过的人吃人历久弥新 出生在无数未开化过 云烟缭绕 山峦叠嶂的百姓们会不断吃下一个又一个人" startDelay={1.2} />
            </p>
            
            {/* 互动式引言 */}
            <blockquote className="relative p-8 border border-neutral-800 group hover:border-red-900 transition-colors duration-700">
              <div className="absolute -top-3 -left-3 bg-[#1a1a1a] px-2 text-red-700 font-serif text-xl">“</div>
              <p className="italic text-neutral-400 group-hover:text-red-200 transition-colors">
                <TypewriterText text="在吃人的时代里吃人的地方：幸存者或亦是这吃人规矩的制定者远远望去 只需稍稍撂下一句话：努力吧 这样能够吃更多的人 便引来大家分拨蚕食 吃了一代又一代的年轻人" startDelay={7.5} />
              </p>
            </blockquote>

            <div className="space-y-6 text-neutral-400">
              <p>
                <TypewriterText text="雄性天然带着上一代半辈子留下的血和肉 （以至于哀求亲友相赠）由着这劣根献上 于是雌性被裹挟着服下这剂慢性毒药 结合着感化下一代人" startDelay={12.5} />
              </p>
              
              <p className="relative inline-block group">
                <TypewriterText text="当然一切一切只发生在萌女管中窥豹之间 她甚至只能看到豹的屁眼 地球上最低下的蜜蜂也会歌颂自己为了采蜜而死吗 当然如此 不然地球最高等的我们为什么要心甘情愿吃人 所以他们死之后蜂王蜂后会不会感激他们？" startDelay={17.5} />
                <span className="absolute left-0 top-1/2 w-0 h-[1px] bg-red-600 transition-all duration-1000 group-hover:w-full"></span>
              </p>
            </div>

            {/* 视觉压迫中心 */}
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="text-3xl font-black text-neutral-800 tracking-[0.5em] hover:text-red-950 transition-colors cursor-none">
                順其自然 / 安居樂業
              </div>
              <div className="text-xs text-red-900/50 tracking-widest font-mono">SYSTEM_ERROR: CANNIBALISM_DETECTED</div>
            </div>

            <p>
              <TypewriterText text="吃人就是一种顺其自然的规则 一种安居乐业的诅咒 吃人者不知其张口结舌间 心神热血已下肚 被吃者不知其早已被他人预定价格 静待分崩离析之际 茶余饭后之谈 吆喝着吃人的人 后代并不会被吃甚至于继续高呼着吃人 ； 心愿情甘被吃的人 后代继续踩着肩膀上桌 等待被宰割； 吃过更多人的人 给每份肉打上标签 掂量值不值得吃这一顿饱腹" startDelay={25.5} />
            </p>

            <p>
              <TypewriterText text="有人会不被吃干抹净吗 ？ 买猪肉 皆知要花色红润 肥瘦相间 符合这统一的品相标准。其所谓不被吃的人 是吃人者口中大逆不道之流 这样的味道也不会过于鲜美 品相也如摧枯拉朽差得远 为什么他们不自己吃自己诞下的血肉？ 因为彼时他们已借着苍天大老爷身份离开吃人之地域 但茹毛饮血 本性难改 再加只尝过人肉的美味 更何况正值吃人浪潮 ！便跳脱着一遍遍喊着吃人！" startDelay={34.5} />
            </p>

            <p className="italic opacity-50 hover:opacity-100 transition-opacity text-sm">
              <TypewriterText text="所谓萌女子是不是也被吃了或者也要被吃？ 也许是的。如今存在的也许是她深夜每个鬼魂的呼唤" startDelay={44.0} />
            </p>

            {/* 结尾对话 */}
            <div className="mt-24 pt-12 border-t border-neutral-900">
              <div className="bg-black/40 p-8 rounded-sm space-y-8 border-l-2 border-red-900">
                <div className="flex items-start gap-4">
                  <span className="text-red-900 font-serif font-bold text-xs mt-1">问 /</span>
                  <p className="text-neutral-200 font-medium">
                    <TypewriterText text="“你好我不幸在这吃人的地方！马上二十而礼成，怎么样才能不被吃！”" startDelay={47.5} />
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-neutral-600 font-serif font-bold text-xs mt-1">答 /</span>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    <TypewriterText text="“你可以选择屁滚尿流地逃离这个地方！但愿你的肉质鲜美、值得他们献祭给上天自己选。但是…某种情形下，被吃也是伟大的事、幸运的事。你不知道，多少人为了被吃掉削尖脑袋！ 赶快净身下锅吧。没准对于你来说空气也是一种慢性毒药！”" startDelay={51.0} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 底部标注 */}
        <footer className="mt-32 text-center text-[10px] text-neutral-800 font-mono tracking-[1em] hover:text-red-900 transition-colors">
          LOSING_HUMANITY_REPORT_2026
        </footer>
      </div>
    </main>
  );
}
