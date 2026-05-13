import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LifeAndDeathPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* 顶部导航 */}
      <nav className="p-8">
        <Link href="/" className="group inline-flex items-center text-xs tracking-widest uppercase">
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="ml-1">Works</span>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 pt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          
          {/* 左侧：生 */}
          <section className="space-y-6">
            <span className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase">Phase 01 / Birth</span>
            <div className="space-y-2">
              <p className="text-sm italic text-zinc-500">当活着的时候</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tighter">
                有人说 <br />
                又一个幸福的人 <br />
                <span className="text-pink-500 font-medium">出生了</span>
              </h2>
            </div>
          </section>

          {/* 右侧：死 */}
          <section className="space-y-6 md:mt-48">
            <span className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase">Phase 02 / Death</span>
            <div className="space-y-2">
              <p className="text-sm italic text-zinc-500">死了的时候</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tighter">
                他们说 <br />
                死得惨烈 <br />
                <span className="underline decoration-1 underline-offset-8">死不得其所</span>
              </h2>
            </div>
          </section>

        </div>

        {/* 底部落款 */}
        <footer className="mt-32 pt-12 border-t border-zinc-100 flex justify-between items-end">
          <div className="text-[10px] tracking-[0.5em] text-zinc-300 uppercase">Mona Wang / 2026</div>
          <div className="text-xs italic text-zinc-400">“生与死的定义”</div>
        </footer>
      </div>
    </main>
  );
}