import Image from "next/image"
import Link from "next/link"

export default function BreakingShellPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-12 text-[#4b433d] sm:px-10 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link href="/writing" className="font-sans text-xs uppercase tracking-[.16em] text-[#9b9389] hover:text-[#845f4a]">← Writing archive</Link>
        <header className="mt-16 border-b border-[#d9d2c5] pb-10">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#dfa0aa]">2026.08.28 · fragment</p>
          <h1 className="mt-5 font-serif text-5xl leading-none tracking-[-.04em] text-[#845f4a] sm:text-7xl">蛋的世界猜想</h1>
          <p className="mt-5 font-serif text-lg italic text-[#8fa58f]">The egg is the world.</p>
        </header>
        <div className="mt-12 grid gap-10 sm:grid-cols-[1.1fr_.9fr] sm:items-start">
          <div className="font-serif text-[1.05rem] leading-[2] text-[#625a53]">
            <p>鸟要挣脱出壳，蛋就是世界。</p>
            <p className="mt-5">人要诞生，就得 <em>摧毁</em> 一个世界。</p>
            <p className="mt-5 text-sm italic text-[#8f857d]">黑塞说。</p>
            <p className="mt-8">这里的摧毁不是英雄式的史诗。</p>
            <p className="mt-5">蛋壳最悖谬的地方，在生命尚未成熟时，它叫保护。在生命已经成熟以后，它仍然完整，是禁锢。</p>
            <p className="mt-8">我作为人类意外诞生，我本人并非有意选择出生，而是无法拒绝地降临。</p>
            <p className="mt-5">世界早已在生命之前就为我画好边界。</p>
            <p className="mt-5">在20年之后，我曾经以为的世界，也只是我的边界。</p>
          </div>
          <div className="space-y-5">
            <Image src="/images/writing/breaking-shell/portrait.jpg" alt="一张旧日照片" width={1280} height={1706} className="h-auto w-full object-cover" />
            <div className="grid grid-cols-2 gap-3"><Image src="/images/writing/breaking-shell/notes-1.jpg" alt="手写笔记" width={1280} height={1706} className="h-auto w-full" /><Image src="/images/writing/breaking-shell/notes-2.jpg" alt="手写随笔" width={1280} height={1706} className="h-auto w-full" /></div>
          </div>
        </div>
      </article>
    </main>
  )
}
