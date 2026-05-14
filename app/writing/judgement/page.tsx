"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AntiJudgmentPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#fcfcfc] text-[#333] selection:bg-pink-100 font-serif leading-relaxed">
      <div className="max-w-screen-md mx-auto px-8 py-20">
        
        <Link href="/" className="text-xs tracking-widest text-neutral-400 hover:text-black transition-colors font-sans">
          EXIT
        </Link>

        <article className="mt-24">
          
          <header className="mb-32">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900">
              刺穿：评价体系的消亡
            </h1>
            <p className="mt-4 text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-sans">
              2026.05.14
            </p>
          </header>

          <div className="space-y-24 text-lg md:text-xl">
            
            <section className="space-y-2">
              <p>为什么人生需要各种各样的肯定呢？</p>
              <p className="text-sm text-neutral-400 italic">——这是人类最高级的需求。</p>
            </section>

            <section className="pl-8 md:pl-16 space-y-4">
              <p>肯定也就是有了指责有了嘲讽。</p>
              <p>暗暗的期待在其中，</p>
              <p>面对期待，我会心生怜悯。</p>
            </section>

            <section className="py-10">
              <p className="text-neutral-500 mb-8">可是如果什么都没有，我会慌乱，不知所措。</p>
              <p className="text-3xl font-light tracking-tighter">
                心脏已经 <span className="text-red-500">坠地</span>。
              </p>
            </section>

            <section className="space-y-6">
              <p className="text-2xl md:text-3xl leading-tight">
                我要杀死那个 <br />
                所谓评价的体系。
              </p>
              <p className="text-red-500 italic">
                “为何任何目光都将要给予审判的权利？”
              </p>
            </section>

            <section className="space-y-8 flex flex-col items-end text-right">
              <p className="max-w-md">
                决定一切的就是我将要 <span className="border-b border-red-400 text-black px-1">刺穿</span> 那些高高在上的冷嘲热讽。
              </p>
              <p className="text-sm text-neutral-400 leading-loose max-w-sm">
                虽然简单的办法是，我直接穿堂而过什么都没看到什么都不懂。但我天生就不能这样，不具备这个能力置若罔闻的权利。
              </p>
            </section>

            <section className="pt-10">
              <p className="text-2xl font-medium border-l-2 border-black pl-4">
                我没有这个义务。
              </p>
            </section>

            <section className="pt-40 pb-20 text-center space-y-6">
              <div className="text-2xl md:text-3xl space-y-2 tracking-widest">
                <p>祝愿任何无谓的审判</p>
                <p className="text-red-500">魂归九霄 死得其所</p>
              </div>
            </section>

          </div>
        </article>
      </div>
    </main>
  );
}