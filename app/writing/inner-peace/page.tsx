"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function NewWorldPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] selection:bg-pink-100 font-serif">
      {/* 顶部进度条：象征 22 岁的成长进度 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-100 z-50">
        <div className="h-full bg-black w-[22%] animate-[progress_2s_ease-in-out]"></div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-24 relative">
        
        {/* 极简返回 */}
        <Link href="/" className="inline-flex items-center text-[10px] tracking-[0.5em] text-neutral-300 hover:text-black transition-colors mb-32">
          <ChevronLeft className="w-3 h-3 mr-1" />
          LEAVE_PAST
        </Link>

        <article className="space-y-24">
          
          {/* 第一部分：回望与碎片 */}
          <section className="space-y-12 opacity-40 hover:opacity-100 transition-opacity duration-1000">
            <div className="space-y-6 text-sm leading-relaxed text-neutral-500">
              <p>一次爸在家里收拾旧物，想起自己十五六岁的年纪非常爱写日记。</p>
              <p>虽然文字很稚嫩，我大概也看到了那个十二点的书桌前戴着厚厚眼镜的那个小孩。</p>
              <p>从小就觉得自己并不一样，仿佛生来就带着罪恶厌弃逃离的诅咒。这一切并自愿加以我身，或者这对我来说本就空无一物。</p>
            </div>
          </section>

          {/* 第二部分：救赎的瞬间 */}
          <section className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-pink-100"></div>
            <div className="pl-8 space-y-8">
              <p className="text-lg italic">
                “这不是逃离，是一种选择，一种对十几岁的小孩的拯救。我很幸运。”
              </p>
              <p className="text-neutral-600 leading-[2]">
                可能我也辜负了十几岁的 <span className="font-mono border-b border-neutral-200">myself</span>，进入平庸的高校。但这也没什么，反倒感恩当下，赋予我选择。
                二十二岁，终于和我厌弃的一切达成了一种微妙的认同，一种平衡。
              </p>
            </div>
          </section>

          {/* 第三部分：告别与新世界（核心动效） */}
          <section className="py-20 space-y-12">
            <div className="overflow-hidden">
              <h2 className="text-5xl font-black tracking-tighter animate-[slideUp_1s_ease-out]">
                美丽新世界
              </h2>
            </div>
            
            <div className="space-y-8 text-xl leading-relaxed font-medium">
              <p className="hover:translate-x-2 transition-transform duration-500">
                我好像看到我过去二十年所爱的新的希望了。
              </p>
              <p className="text-pink-600">
                未来这个词代表着无限 <span className="inline-block animate-spin-slow">♾️</span>
              </p>
              <p>看未来总比看过去要看得清楚。</p>
            </div>
          </section>

          {/* 终章：平庸之辈的觉醒 */}
          <section className="pt-20 border-t border-neutral-100">
            <div className="space-y-12">
              <p className="text-xs tracking-[0.2em] text-neutral-400 leading-loose">
                不可否认，日光之下，并无新事。俗人庸人倒是过于冷血，我也只是个平庸之辈！
                活着也许本来就空空如也，死也在生者之中。再一次感恩自己年轻。
              </p>

              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.6em] text-neutral-300">Final Target / 最终目标</p>
                <ul className="space-y-2 text-2xl font-bold italic">
                  <li className="hover:text-pink-500 transition-colors cursor-default">· 知晓自己是什么样的人</li>
                  <li className="hover:text-pink-500 transition-colors cursor-default">· 自己要过什么样的日子</li>
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
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
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