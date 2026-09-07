"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LifeAndDeathPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#a1a1a1] selection:bg-white selection:text-black font-serif">
      <div className="max-w-3xl mx-auto px-6 py-24 relative">

        {/* 背景大字 */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center select-none">
          <span className="text-[40vw] font-black">看</span>
        </div>

        {/* 返回 */}
        <Link
          href="/"
          className="inline-flex items-center text-[10px] tracking-[0.4em] text-neutral-600 hover:text-white transition-all mb-20 group"
        >
          <ChevronLeft className="w-3 h-3 mr-1" />
          DISCONNECT
        </Link>

        {/* 列标签 */}
        <div className="grid grid-cols-2 gap-20 mb-4 pb-3 border-b border-neutral-900">
          <span className="text-[9px] tracking-[0.5em] text-neutral-700 uppercase">中文 / Chinese</span>
          <span className="text-[9px] tracking-[0.5em] text-neutral-700 uppercase">日本語 / Japanese</span>
        </div>

        <article className="space-y-32 relative z-10">

          {/* ── 第一幕：生之荒诞 ── */}
          <section className="space-y-10">

            {/* 标题行：双语 */}
            <div className="grid grid-cols-2 gap-20">
              <div className="flex items-baseline gap-4">
                <span className="text-xs font-mono text-neutral-800 tracking-tighter">01 / 生</span>
                <div className="h-[1px] flex-1 bg-neutral-900" />
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-xs font-mono text-neutral-800 tracking-tighter">01 / 生</span>
                <div className="h-[1px] flex-1 bg-neutral-900" />
              </div>
            </div>

            {/* 正文双列 */}
            <div className="grid grid-cols-2 gap-20">

              {/* 中文列 */}
              <div className="space-y-4 pl-8 border-l border-neutral-900">
                <p className="text-2xl text-neutral-400">当活着的时候</p>
                <div className="group relative cursor-default">
                  <p className="text-4xl font-bold text-white tracking-widest transition-all group-hover:blur-[2px]">
                    有人说
                  </p>
                  <div className="absolute -right-4 top-0 text-[10px] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    ( 众口铄金 )
                  </div>
                </div>
                <p className="text-3xl font-light text-neutral-500 italic">
                  又一个"幸福"的人 <br />
                  <span className="text-6xl font-black text-neutral-800 line-through decoration-red-900">
                    出生了
                  </span>
                </p>
              </div>

              {/* 日文列 */}
              <div className="space-y-4 pl-8 border-l border-neutral-900">
                <p className="text-2xl text-neutral-400">生きているとき</p>
                <div className="group relative cursor-default">
                  <p className="text-4xl font-bold text-white tracking-widest transition-all group-hover:blur-[2px]">
                    誰かが言う
                  </p>
                  <div className="absolute -right-4 top-0 text-[10px] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    ( 衆口が金を鑠かす )
                  </div>
                </div>
                <p className="text-3xl font-light text-neutral-500 italic">
                  また「幸せな」人が <br />
                  <span className="text-6xl font-black text-neutral-800 line-through decoration-red-900">
                    生まれた
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* 视觉断层 */}
          <div className="h-20 flex justify-center">
            <div className="w-[1px] h-full bg-gradient-to-b from-neutral-900 to-transparent" />
          </div>

          {/* ── 第二幕：死之惨烈 ── */}
          <section className="space-y-10">

            {/* 标题行：双语，右对齐 */}
            <div className="grid grid-cols-2 gap-20">
              <div className="flex items-baseline gap-4 flex-row-reverse">
                <span className="text-xs font-mono text-neutral-800 tracking-tighter">02 / 灭</span>
                <div className="h-[1px] flex-1 bg-neutral-900" />
              </div>
              <div className="flex items-baseline gap-4 flex-row-reverse">
                <span className="text-xs font-mono text-neutral-800 tracking-tighter">02 / 滅</span>
                <div className="h-[1px] flex-1 bg-neutral-900" />
              </div>
            </div>

            {/* 正文双列，右对齐镜像 */}
            <div className="grid grid-cols-2 gap-20">

              {/* 中文列 */}
              <div className="space-y-6 pr-8 border-r border-neutral-900 text-right">
                <p className="text-2xl text-neutral-400">死了的时候</p>
                <p className="text-4xl font-bold text-white tracking-[0.3em]">他们说</p>
                <div className="space-y-2 pt-8">
                  <p className="text-5xl font-black text-red-950 hover:text-red-600 transition-colors duration-1000 cursor-none">
                    死得惨烈
                  </p>
                  <p className="text-xl tracking-[0.5em] text-neutral-200">死不得其所</p>
                </div>
              </div>

              {/* 日文列 */}
              <div className="space-y-6 pr-8 border-r border-neutral-900 text-right">
                <p className="text-2xl text-neutral-400">死んだとき</p>
                <p className="text-4xl font-bold text-white tracking-[0.3em]">人々は言う</p>
                <div className="space-y-2 pt-8">
                  <p className="text-5xl font-black text-red-950 hover:text-red-600 transition-colors duration-1000 cursor-none">
                    無惨な死だった
                  </p>
                  <p className="text-xl tracking-[0.5em] text-neutral-200">
                    死ぬべき場所も知らずに
                  </p>
                </div>
              </div>
            </div>

            {/* 鲁迅引言：双列 */}
            <div className="grid grid-cols-2 gap-20 pt-16">
              <div className="opacity-30 hover:opacity-100 transition-opacity duration-700 text-right pr-8">
                <p className="text-xs leading-loose italic">
                  "凡是愚弱的国民，即使体格如何健全，如何茁壮，<br />
                  也只能做毫无意义的示众的材料和看客。"
                </p>
                <p className="text-[9px] text-neutral-700 mt-2 tracking-widest">— 鲁迅</p>
              </div>
              <div className="opacity-30 hover:opacity-100 transition-opacity duration-700 text-right pr-8">
                <p className="text-xs leading-loose italic">
                  "愚かで弱い国民は、いかに体格が健全で頑健であっても、<br />
                  無意味な見世物の材料と傍観者にしかなれない。"
                </p>
                <p className="text-[9px] text-neutral-700 mt-2 tracking-widest">— 魯迅</p>
              </div>
            </div>
          </section>

        </article>

        {/* 底部脚注 */}
        <footer className="mt-48 grid grid-cols-2 gap-20 border-t border-neutral-900 pt-8 font-mono text-[9px] text-neutral-800 tracking-[0.2em]">
          <div className="flex justify-between items-end">
            <div>STATUS: OBSERVED</div>
            <div className="text-right uppercase">
              Mona Wang / *work* <br />
              2026.05.14
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>状態：観察中</div>
            <div className="text-right uppercase">
              王 萌 / *作品* <br />
              2026.05.14
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}