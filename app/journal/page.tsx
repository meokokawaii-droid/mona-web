'use client'

import { useState } from 'react'
import { PolkaDotBackground } from '@/components/polka-dot-background'
import { CursorLight } from '@/components/cursor-light'
import { JourneyDiary } from '@/components/journey-diary'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/45 bg-white/55 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-5 px-5 sm:px-8">
        <a href="/letter" className="font-serif text-xl tracking-[-0.02em] text-stone-800 transition-colors hover:text-pink-500">Moe</a>
        <nav className="flex items-center gap-5 text-[11px] uppercase tracking-[0.16em] text-stone-500 sm:gap-8" aria-label="Journal navigation">
          <a href="/studio" className="flex min-h-11 items-center border-b border-transparent transition-colors hover:border-pink-300 hover:text-pink-500">Studio</a>
          <a href="/journal" aria-current="page" className="flex min-h-11 items-center border-b border-pink-400 text-pink-500">Journal</a>
        </nav>
        <div className="hidden text-xs italic tracking-wide text-stone-400 lg:block">Somewhere between ideas and reality</div>
      </div>
    </header>
  )
}

export default function JournalPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <>
      <CursorLight />
      <PolkaDotBackground>
        <Navbar />
        <main>
          <JourneyDiary onOpenVideo={() => setIsVideoOpen(true)} />
        </main>
      </PolkaDotBackground>

      {isVideoOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="精神流民 video" onClick={() => setIsVideoOpen(false)}>
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/30 bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setIsVideoOpen(false)} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-stone-700 shadow transition hover:scale-105 hover:bg-pink-50" aria-label="Close video">×</button>
            <video src="/video/mevideo1.mp4" controls autoPlay className="max-h-[80vh] w-full bg-black" />
          </div>
        </div>
      )}
    </>
  )
}
