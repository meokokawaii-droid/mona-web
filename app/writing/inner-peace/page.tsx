"use client";

import React from 'react';
import Link from 'next/link';

export default function InnerPeacePage() {
  return (
    // 背景换成了更有质感的暖肤色/米色渐变
    <div className="min-h-screen bg-[#f8f5f2] p-6 md:p-20 flex flex-col items-center font-sans selection:bg-stone-200">
      
      {/* 顶部导航 */}
      <div className="w-full max-w-2xl mb-12 flex justify-between items-center px-4">
        <Link href="/" className="text-[10px] tracking-[0.3em] text-stone-400 hover:text-stone-800 transition-all uppercase">
          ← Index
        </Link>
        <span className="text-[10px] tracking-[0.3em] text-stone-300 uppercase">Archive / May 2026</span>
      </div>

      {/* 文章卡片：加入了更强的磨砂感和信纸阴影 */}
      <article className="w-full max-w-2xl bg-white/60 backdrop-blur-xl p-10 md:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/40 mb-20">
        
        {/* 标题部分 */}
        <header className="text-center mb-20">
          <h1 className="text-xl font-light tracking-[0.5em] text-stone-800 mb-4">
            此心安处是吾乡
          </h1>
          <div className="w-8 h-[1px] bg-stone-200 mx-auto"></div>
        </header>
        
        {/* 正文：行高加宽，文字颜色更柔和 */}
        <div className="leading-[2.6] space-y-16 text-[15px] text-stone-700 font-light text-justify">
          <section className="space-y-8">
            <p>一次爸在家里收拾旧物，想起自己十五六岁的年纪非常爱写日记。</p>
            <p>虽然文字很稚嫩，我大概也看到了那个十二点的书桌前戴着厚厚眼镜的那个小孩。</p>
            <p>从小就觉得自己并不一样，仿佛生来就带着罪恶厌弃逃离的诅咒。这一切并自愿加以我身，或者这对我来说本就空无一物。我也不需要附着在那片给我留下的净土。</p>
          </section>

          <section className="space-y-8">
            <p>可能我也辜负了十几岁的myself，进入平庸的高校。但是这也没什么，反倒感恩当下，赋予我选择。</p>
            <p>其实十几岁的小孩最需要认可需要理解。二十二岁，说年轻也是会被轻视，要从头开始也来不及。我很幸运，终于和我厌弃的一切达成了一种微妙的认同，一种平衡。感恩。</p>
          </section>

          {/* 重点感悟部分：加一个淡淡的底色块 */}
          <section className="bg-stone-50/50 p-8 rounded-2xl border-l border-stone-200 italic opacity-90 mx-[-1rem]">
            <p>过去并没有给我留下什么丰富的幸福的烙印，我反而一直痛恨着过去。我好像看到我过去二十年所爱的新的希望了，也许这是一个属于我的新世界。未来这个词代表着无限♾️代表着美丽新世界。看未来总比看过去要看得清楚。</p>
          </section>

          <section className="space-y-8">
            <p>这不是逃离，是一种选择，一种对十几岁的小孩的拯救。我很幸运。突然觉得活着也许本来就空空如也，死也在生者之中。好吧，再一次感恩自己年轻。</p>
            <p>不可否认，日光之下，并无新事。俗人庸人倒是过于冷血，我也只是个平庸之辈！</p>
          </section>

          <section className="pt-16 space-y-6 text-center border-t border-stone-100">
            <p className="text-stone-900 font-normal">我想我已经完成我前二十年的目标了：</p>
            <p className="text-stone-900">就是知晓自己是什么样的人，自己要过什么样的日子。</p>
            <p className="text-stone-400 text-[10px] tracking-[0.6em] pt-12 uppercase">
              Who I am / Where I am / What I do
            </p>
          </section>
        </div>
      </article>

      {/* 底部点缀 */}
      <footer className="mb-12 flex flex-col items-center gap-4">
        <div className="w-[1px] h-12 bg-gradient-to-b from-stone-200 to-transparent"></div>
        <span className="text-[9px] tracking-[0.8em] text-stone-300 uppercase">End of page</span>
      </footer>
    </div>
  );
}