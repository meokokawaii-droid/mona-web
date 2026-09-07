"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

// 中英对照数据
const sections = [
  {
    id: "fragment",
    type: "prose",
    opacity: true,
    paragraphs: [
      {
        zh: "一次爸在家里收拾旧物，想起自己十五六岁的年纪非常爱写日记。",
        en: "Once, while my father was sorting through old things at home, I remembered how much I loved writing in a diary at fifteen or sixteen.",
      },
      {
        zh: "虽然文字很稚嫩，我大概也看到了那个十二点的书桌前戴着厚厚眼镜的那个小孩。",
        en: "The words were clumsy, but I could still make out that child — sitting at her desk at midnight, thick glasses on her nose.",
      },
      {
        zh: "从小就觉得自己并不一样，仿佛生来就带着罪恶厌弃逃离的诅咒。这一切并自愿加以我身，或者这对我来说本就空无一物。",
        en: "From early on I felt different — as though born under a curse of guilt, rejection, and escape. None of it was chosen. Or perhaps, for me, it was always empty to begin with.",
      },
    ],
  },
  {
    id: "redemption",
    type: "quote",
    quote: {
      zh: "这不是逃离，是一种选择，一种对十几岁的小孩的拯救。我很幸运。",
      en: "This is not escape. It is a choice — a rescue of the teenager I once was. I am lucky.",
    },
    body: {
      zh: "可能我也辜负了十几岁的 myself，进入平庸的高校。但这也没什么，反倒感恩当下，赋予我选择。二十二岁，终于和我厌弃的一切达成了一种微妙的认同，一种平衡。",
      en: "Perhaps I let my teenage self down by entering an ordinary university. But that's alright — I've come to be grateful for the present, for the choices it has given me. At twenty-two, I've finally reached a quiet understanding with everything I once resented. A kind of balance.",
    },
  },
  {
    id: "new-world",
    type: "hero",
    hero: { zh: "美丽新世界", en: "Brave New World" },
    lines: [
      {
        zh: "我好像看到我过去二十年所爱的新的希望了。",
        en: "I think I can finally see a new hope for everything I've loved across these twenty years.",
      },
      {
        zh: "未来这个词代表着无限。",
        en: "The word future holds infinity.",
        accent: true,
      },
      {
        zh: "看未来总比看过去要看得清楚。",
        en: "The future has always been easier to see than the past.",
      },
    ],
  },
  {
    id: "epilogue",
    type: "epilogue",
    prose: {
      zh: "不可否认，日光之下，并无新事。俗人庸人倒是过于冷血，我也只是个平庸之辈！活着也许本来就空空如也，死也在生者之中。再一次感恩自己年轻。",
      en: "There is nothing new under the sun — I won't deny it. To call someone ordinary is perhaps too cold. I am ordinary too. Maybe living has always been empty at its core, and death already lives among the living. Once again, I am grateful to be young.",
    },
    targets: [
      { zh: "知晓自己是什么样的人", en: "Know what kind of person I am" },
      { zh: "自己要过什么样的日子", en: "Know what kind of life I want to live" },
    ],
  },
];

export default function NewWorldPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] selection:bg-pink-100 font-serif">
      {/* 顶部进度条 */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-neutral-100 z-50">
        <div className="h-full bg-black animate-progress" style={{ width: "22%" }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24">

        {/* 返回 */}
        <Link
          href="/"
          className="inline-flex items-center text-[10px] tracking-[0.5em] text-neutral-300 hover:text-black transition-colors mb-20"
        >
          <ChevronLeft className="w-3 h-3 mr-1" />
          LEAVE_PAST
        </Link>

        {/* 列头标签 */}
        <div className="grid grid-cols-2 gap-16 mb-6 pb-3 border-b border-neutral-100">
          <span className="text-[9px] tracking-[0.5em] text-neutral-300 uppercase">中文 / Chinese</span>
          <span className="text-[9px] tracking-[0.5em] text-neutral-300 uppercase">English</span>
        </div>

        <article className="space-y-28">

          {/* ── Section 1: 碎片回忆 ── */}
          <section className="opacity-40 hover:opacity-100 transition-opacity duration-1000">
            <div className="grid grid-cols-2 gap-16 space-y-0">
              {/* 中文列 */}
              <div className="space-y-5 text-sm leading-relaxed text-neutral-500">
                {(sections[0] as any).paragraphs.map((p: any, i: number) => (
                  <p key={i}>{p.zh}</p>
                ))}
              </div>
              {/* 英文列 */}
              <div className="space-y-5 text-sm leading-relaxed text-neutral-400 italic">
                {(sections[0] as any).paragraphs.map((p: any, i: number) => (
                  <p key={i}>{p.en}</p>
                ))}
              </div>
            </div>
          </section>

          {/* ── Section 2: 救赎 ── */}
          <section>
            <div className="relative">
              <div className="absolute -left-4 top-0 w-[2px] h-full bg-pink-100" />
              <div className="pl-8 grid grid-cols-2 gap-16">
                {/* 中文列 */}
                <div className="space-y-6">
                  <p className="text-lg italic leading-relaxed text-neutral-700">
                    「{(sections[1] as any).quote.zh}」
                  </p>
                  <p className="text-neutral-600 leading-[2] text-sm">
                    {(sections[1] as any).body.zh}
                  </p>
                </div>
                {/* 英文列 */}
                <div className="space-y-6">
                  <p className="text-lg italic leading-relaxed text-neutral-400">
                    "{(sections[1] as any).quote.en}"
                  </p>
                  <p className="text-neutral-400 leading-[2] text-sm">
                    {(sections[1] as any).body.en}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 3: 美丽新世界 Hero ── */}
          <section className="py-16 space-y-12">
            {/* 大标题双语 */}
            <div className="overflow-hidden">
              <div className="flex items-baseline gap-6 animate-slideUp">
                <h2 className="text-5xl font-black tracking-tighter">
                  {(sections[2] as any).hero.zh}
                </h2>
                <span className="text-xl font-light text-neutral-300 tracking-wide">
                  {(sections[2] as any).hero.en}
                </span>
              </div>
            </div>

            {/* 三行对照 */}
            <div className="grid grid-cols-2 gap-16">
              {/* 中文列 */}
              <div className="space-y-6 text-xl leading-relaxed font-medium">
                {(sections[2] as any).lines.map((l: any, i: number) => (
                  <p
                    key={i}
                    className={`hover:translate-x-2 transition-transform duration-500 ${l.accent ? "text-pink-500" : ""}`}
                  >
                    {l.zh}
                    {l.accent && (
                      <span className="inline-block ml-1 animate-spin-slow">♾️</span>
                    )}
                  </p>
                ))}
              </div>
              {/* 英文列 */}
              <div className="space-y-6 text-base leading-relaxed text-neutral-400 italic pt-1">
                {(sections[2] as any).lines.map((l: any, i: number) => (
                  <p key={i} className={l.accent ? "text-pink-300" : ""}>
                    {l.en}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* ── Section 4: 终章 ── */}
          <section className="pt-20 border-t border-neutral-100 space-y-14">

            {/* 散文对照 */}
            <div className="grid grid-cols-2 gap-16">
              <p className="text-xs tracking-[0.15em] text-neutral-400 leading-loose">
                {(sections[3] as any).prose.zh}
              </p>
              <p className="text-xs tracking-[0.1em] text-neutral-300 leading-loose italic">
                {(sections[3] as any).prose.en}
              </p>
            </div>

            {/* 目标列表对照 */}
            <div className="space-y-4">
              <p className="text-[9px] uppercase tracking-[0.6em] text-neutral-300">
                Final Target / 最终目标
              </p>
              <div className="grid grid-cols-2 gap-16">
                {/* 中文 */}
                <ul className="space-y-2">
                  {(sections[3] as any).targets.map((t: any, i: number) => (
                    <li
                      key={i}
                      className="text-2xl font-bold italic hover:text-pink-500 transition-colors cursor-default"
                    >
                      · {t.zh}
                    </li>
                  ))}
                </ul>
                {/* 英文 */}
                <ul className="space-y-2 pt-1">
                  {(sections[3] as any).targets.map((t: any, i: number) => (
                    <li
                      key={i}
                      className="text-base font-light text-neutral-400 italic hover:text-pink-300 transition-colors cursor-default pt-1"
                    >
                      · {t.en}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        </article>

        <footer className="mt-48 pb-12 text-center">
          <div className="inline-block px-4 py-1 border border-neutral-900 text-[10px] tracking-[0.8em] uppercase">
            Start Anew
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0; }
          to { width: 22%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out forwards;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 1s ease-out;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}