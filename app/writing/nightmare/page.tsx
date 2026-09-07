"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NightmarePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  
  if (!mounted) return null;

  return (
    // 💡 背景使用淡淡的米色，文字使用更有质感的深灰色，增加页边距
    <main className="min-h-screen bg-[#fcfbf9] text-[#2d2d2d] selection:bg-[#dcd6d0] font-serif">
      <div className="max-w-xl mx-auto px-10 py-32">
        
        {/* 返回按钮：精简且克制 */}
        <Link href="/writing" className="fixed top-12 left-12 text-[10px] tracking-[0.3em] uppercase text-[#a09c95] hover:text-black transition-colors">
          ← Back
        </Link>

        {/* 诗集排版：利用 flex 布局和间隔营造呼吸感 */}
        <article className="space-y-24">
          
          <header>
            <h1 className="text-4xl italic font-light text-[#1a1a1a]">梦魇</h1>
          </header>

          <section className="space-y-12 text-[19px] leading-[2.4]">
            <p className="italic">
              我们真的逃离不了<br/>
              这个头顶巨大的梦魇吗
            </p>

            <p className="text-[#4a4a4a]">
              我想离开，因为我睡醒了，<br/>
              所以我自然而然地走出了盒子。
            </p>
          </section>

          <section className="space-y-8 pt-12 border-t border-[#e5e1dc] text-[#555] italic">
            <p>
              亲爱的你呢，<br/>
              你没有发现这个梦魇吞噬了一切，<br/>
              吞噬了梦想和别的东西吗？
            </p>
            <p className="text-sm opacity-70">
              或者你，<br/>
              从梦魇里遗失了自己吗？
            </p>
          </section>

          <section className="space-y-4 font-light text-[#333]">
            <p>还是说，那只是年轻的不属于你自己的弧光。</p>
            <p>还是说，这只是年轻的吞噬我自己的噩梦。</p>
            <p>还是说，所有一切你只是自然而然的沉睡，并在其中苏醒。</p>
          </section>

          <footer className="pt-20 space-y-8 border-t border-[#e5e1dc] mt-12">
            <p className="text-xl leading-relaxed italic">
              你真的不认为<br/>
              曾经头顶这片巨大的乌云<br/>
              是一场噩梦吗？
            </p>
            <p className="text-sm pt-8 text-[#888]">
              或许这个，是你选择的美梦？
            </p>
          </footer>

        </article>
      </div>
    </main>
  );
}