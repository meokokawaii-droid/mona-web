"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

const lines = [
  { text: "生活在这样一个巨大的吞噬", weight: "normal", pause: false },
  { text: "它会吐出一些", weight: "normal", pause: true },
  { text: "而且它们和我说 close your eyes", weight: "whisper", pause: false },
  { text: "因为我见其他动物都是这样做的", weight: "normal", pause: true },
  { text: "但是心脏看见了", weight: "normal", pause: false },
  { text: "它告诉我这样会流泪", weight: "normal", pause: true },
  { text: "小狗会哭泣", weight: "normal", pause: false },
  { text: "它们不会吗", weight: "question", pause: true },
  { text: "它们告诉我", weight: "whisper", pause: false },
  { text: "你要闭上眼睛感受这个世界", weight: "whisper", pause: true },
  { text: "世界…请告诉我它们的世界在哪里？", weight: "question", pause: true },
  { text: "心脏看不到世界", weight: "normal", pause: false },
  { text: "所以我怀疑它们从来没有看到世界", weight: "normal", pause: true },
  { text: "世界没有大手掌", weight: "normal", pause: false },
  { text: "世界包容万物", weight: "normal", pause: true },
  { text: "于是我不敢睁开眼睛", weight: "normal", pause: false },
  { text: "于是我的心脏在痛哭", weight: "heavy", pause: true },
  { text: "但它们突然睁开了眼睛", weight: "eye", pause: false, eye: true },
  { text: "但它们发现了我一直睁着眼睛", weight: "eye", pause: true, eye: true },
  { text: "我没有把眼睛关闭", weight: "heavy", pause: false },
  { text: "心脏裸露", weight: "exposed", pause: true },
  { text: "原来 它们进化出的眼睛可以一张一合！", weight: "realization", pause: true },
  { text: "它们问：为什么你没有进化！", weight: "accusation", pause: true },
  { text: "于是我逃走了", weight: "normal", pause: false },
  { text: "因为我的心脏隐隐作痛", weight: "heavy", pause: true },
  { text: "我也要进化吗", weight: "question", pause: false, final: true },
];

export default function PoemEvolutionPage() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed < lines.length) {
      const delay = lines[revealed]?.pause ? 650 : 380;
      const t = setTimeout(() => setRevealed((r) => r + 1), delay);
      return () => clearTimeout(t);
    }
  }, [revealed]);

  return (
    <main className="min-h-screen bg-[#0d0f0c] text-[#c9c7c0] font-serif relative overflow-hidden selection:bg-stone-700">

      {/* 背景：模糊巨大的吞噬轮廓 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-radial from-stone-900/40 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-red-950/20 via-transparent to-transparent blur-3xl" />
      </div>

      {/* 漂浮的眼睛符号，随机分布、极淡 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <span className="absolute top-[12%] left-[8%] text-6xl">👁</span>
        <span className="absolute top-[35%] right-[12%] text-4xl">👁</span>
        <span className="absolute bottom-[20%] left-[15%] text-5xl">👁</span>
        <span className="absolute bottom-[8%] right-[20%] text-7xl">👁</span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-24 relative z-10">

        {/* 返回 */}
        <Link
          href="/writing"
          className="inline-flex items-center text-[10px] tracking-[0.4em] text-stone-600 hover:text-stone-300 transition-colors mb-24 group"
        >
          <ChevronLeft className="w-3 h-3 mr-1" />
          BACK
        </Link>

        {/* 标题 */}
        <header className="mb-24 space-y-3">
          <p className="text-[10px] tracking-[0.5em] text-stone-600 uppercase">2026.06</p>
          <h1 className="text-3xl font-bold text-stone-200 tracking-wide">未进化</h1>
          <p className="text-sm text-stone-500 italic">关于那些教我闭上眼睛的声音</p>
        </header>

        {/* 诗句逐行浮现 */}
        <article className="space-y-7">
          {lines.map((line, i) => {
            const isVisible = i < revealed;
            const baseClass = "transition-all duration-700";

            let styleClass = "text-lg text-stone-300";
            if (line.weight === "whisper") styleClass = "text-base text-stone-500 italic tracking-wide";
            if (line.weight === "question") styleClass = "text-lg text-stone-400 italic";
            if (line.weight === "heavy") styleClass = "text-xl text-stone-200 font-medium";
            if (line.weight === "eye") styleClass = "text-lg text-red-200/70";
            if (line.weight === "exposed") styleClass = "text-2xl text-red-300 font-bold tracking-widest";
            if (line.weight === "realization") styleClass = "text-lg text-stone-400";
            if (line.weight === "accusation") styleClass = "text-xl text-stone-100 font-bold tracking-wide";

            return (
              <p
                key={i}
                className={`${baseClass} ${styleClass} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                } ${line.final ? "pt-12 text-2xl text-stone-200 font-bold" : ""}`}
              >
                {line.eye && <span className="mr-2 opacity-60">👁</span>}
                {line.text}
              </p>
            );
          })}
        </article>

        {/* 结尾留白与签名 */}
        {revealed >= lines.length && (
          <footer className="mt-32 pt-12 border-t border-stone-800/60 flex items-center justify-between text-[10px] tracking-[0.3em] text-stone-600 uppercase animate-fadeIn">
            <span>UNEVOLVED</span>
            <span>Moe · 2026</span>
          </footer>
        )}
      </div>

      <style jsx global>{`
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-stops));
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out;
        }
      `}</style>
    </main>
  );
}