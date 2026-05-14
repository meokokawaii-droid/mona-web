"use client"; // 启用特效必须添加这一行

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function WritingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          
          <header className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-tighter hover:skew-x-2 transition-transform cursor-default">
                吃人：一种安居乐业的诅咒
              </h1>
              <div className="h-0.5 w-20 bg-red-800 animate-pulse"></div>
            </div>
            <p className="text-xs text-neutral-500 font-serif italic tracking-[0.3em]">
              —— 萌 (MONA WANG)
            </p>
          </header>

          <div className="space-y-12 text-[16px] font-light">
            
            <p className="hover:text-white transition-colors duration-500 cursor-help">
              在这个世界上不仅仅美国爱泼斯坦岛吃人。在大洋彼岸另一端，
              <span className="underline decoration-red-900 decoration-wavy underline-offset-4">不愿透露姓名的萌女郎表示</span>
              ：吃人是很平常的事情，发生在我身边自己曾见过的人吃人历久弥新。
            </p>
            
            {/* 互动式引言：鼠标悬停变色 */}
            <blockquote className="relative p-8 border border-neutral-800 group hover:border-red-900 transition-colors duration-700">
              <div className="absolute -top-3 -left-3 bg-[#1a1a1a] px-2 text-red-700 font-serif text-xl">“</div>
              <p className="italic text-neutral-400 group-hover:text-red-200 transition-colors">
                “在吃人的时代里吃人的地方：幸存者或亦是这吃人规矩的制定者。远远望去，只需稍稍撂下一句话：
                <span className="text-red-700 font-bold group-hover:animate-pulse">努力吧，这样能够吃更多的人。</span>
                便引来大家分拨蚕食。”
              </p>
            </blockquote>

            <div className="space-y-6 text-neutral-400">
              <p>雄性天然带着上一代半辈子留下的血和肉，由着这劣根献上。于是雌性被裹挟着服下这剂慢性毒药，结合着感化下一代人。</p>
              
              {/* 小巧思：划线特效 */}
              <p className="relative inline-block group">
                当然一切一切只发生在萌女管中窥豹之间，她甚至只能看到豹的屁眼。
                <span className="absolute left-0 top-1/2 w-0 h-[1px] bg-red-600 transition-all duration-1000 group-hover:w-full"></span>
              </p>
            </div>

            {/* 视觉压迫中心 */}
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="text-3xl font-black text-neutral-800 tracking-[0.5em] hover:text-red-950 transition-colors cursor-none">
                順其自然 / 安居樂業
              </div>
              <div className="text-xs text-red-900/50 tracking-widest font-mono">SYSTEM_ERROR: CANNIBALISM_DETECTED</div>
            </div>

            <p className="first-letter:text-red-600 first-letter:text-3xl">
              吃人者不知其张口结舌间，心神热血已下肚；被吃者不知其早已被他人预定价格，静待分崩离析之际。吆喝着吃人的人，后代并不会被吃；心愿情甘被吃的人，后代继续踩着肩膀上桌。
            </p>

            <p className="italic opacity-50 hover:opacity-100 transition-opacity text-sm">
              所谓萌女子是不是也被吃了或者也要被吃？也许是的。如今存在的也许是她深夜每个鬼魂的呼唤。
            </p>

            {/* 结尾对话：人间失格风格 */}
            <div className="mt-24 pt-12 border-t border-neutral-900">
              <div className="bg-black/40 p-8 rounded-sm space-y-8 border-l-2 border-red-900">
                <div className="flex items-start gap-4">
                  <span className="text-red-900 font-serif font-bold text-xs mt-1">问 /</span>
                  <p className="text-neutral-200 font-medium">“你好我不幸在这吃人的地方！马上二十而礼成，怎么样才能不被吃！”</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-neutral-600 font-serif font-bold text-xs mt-1">答 /</span>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    “你可以选择屁滚尿流地逃离这个地方！但愿你的肉质鲜美。但是…某种情形下，被吃也是伟大的事、幸运的事。
                    <span className="text-red-900 font-bold ml-1">赶快净身下锅吧。</span>
                    没准对于你来说空气也是一种慢性毒药！”
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