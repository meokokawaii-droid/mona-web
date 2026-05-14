"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LifeAndDeathPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#a1a1a1] selection:bg-white selection:text-black font-serif">
      <div className="max-w-xl mx-auto px-6 py-24 relative">
        
        {/* 背景大字：鲁迅式的冷眼 */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center select-none">
          <span className="text-[40vw] font-black">看</span>
        </div>

        {/* 返回按钮 */}
        <Link href="/" className="inline-flex items-center text-[10px] tracking-[0.4em] text-neutral-600 hover:text-white transition-all mb-32 group">
          <ChevronLeft className="w-3 h-3 mr-1" />
          DISCONNECT
        </Link>

        <article className="space-y-32 relative z-10">
          
          {/* 第一幕：生之荒诞 */}
          <section className="relative space-y-12">
            <div className="flex items-baseline gap-4">
              <span className="text-xs font-mono text-neutral-800 tracking-tighter">01 / 生</span>
              <div className="h-[1px] flex-1 bg-neutral-900"></div>
            </div>
            
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
                又一个“幸福”的人 <br />
                <span className="text-6xl font-black text-neutral-800 line-through decoration-red-900">出生了</span>
              </p>
            </div>
          </section>

          {/* 视觉断层：中间的留白代表无声的冷笑 */}
          <div className="h-20 flex justify-center">
            <div className="w-[1px] h-full bg-gradient-to-b from-neutral-900 to-transparent"></div>
          </div>

          {/* 第二幕：死之惨烈 */}
          <section className="relative space-y-12 text-right">
            <div className="flex items-baseline gap-4 flex-row-reverse">
              <span className="text-xs font-mono text-neutral-800 tracking-tighter">02 / 灭</span>
              <div className="h-[1px] flex-1 bg-neutral-900"></div>
            </div>

            <div className="space-y-6 pr-8 border-r border-neutral-900">
              <p className="text-2xl text-neutral-400">死了的时候</p>
              <p className="text-4xl font-bold text-white tracking-[0.3em]">他们说</p>
              
              <div className="space-y-2 pt-8">
                <p className="text-5xl font-black text-red-950 hover:text-red-600 transition-colors duration-1000 cursor-none">
                  死得惨烈
                </p>
                <p className="text-xl tracking-[0.5em] text-neutral-200">
                  死不得其所
                </p>
              </div>
            </div>

            {/* 鲁迅式的结尾点睛 */}
            <div className="pt-20 opacity-30 hover:opacity-100 transition-opacity duration-700">
              <p className="text-xs leading-loose italic">
                “凡是愚弱的国民，即使体格如何健全，如何茁壮， <br />
                也只能做毫无意义的示众的材料和看客。”
              </p>
            </div>
          </section>

        </article>

        {/* 底部脚注 */}
        <footer className="mt-48 flex justify-between items-end border-t border-neutral-900 pt-8 font-mono text-[9px] text-neutral-800 tracking-[0.2em]">
          <div>STATUS: OBSERVED</div>
          <div className="text-right uppercase">
            Mona Wang / *work* <br />
            2026.05.14
          </div>
        </footer>
      </div>
    </main>
  );
}