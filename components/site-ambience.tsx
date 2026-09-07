"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ListMusic, Music2, Pause, SkipForward, X } from "lucide-react"

const BGM_TRACKS = [
  { title: "NewJeans — ditto", src: "/audio/ditto.mp3" },
  { title: "Mystery of Love", src: "/audio/Mystery of Love.mp3" },
  { title: "hearts2hearts - Butterflies", src: "/audio/hearts2hearts - Butterflies.mp3" },
] as const

function playSoftClickSound(audioCtx: AudioContext | null) {
  if (!audioCtx) return
  try {
    if (audioCtx.state === "suspended") void audioCtx.resume()
    const t = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(920, t)
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.06, t + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07)
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start(t)
    osc.stop(t + 0.08)
  } catch {
    /* ignore */
  }
}

export function SiteAmbience() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const skipErrorsRef = useRef(0)
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", fn)
    return () => mq.removeEventListener("change", fn)
  }, [])

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (Ctx) ctxRef.current = new Ctx()
    }
    return ctxRef.current
  }, [])

  const goNextTrack = useCallback(() => {
    setTrackIndex((i) => (i + 1) % BGM_TRACKS.length)
  }, [])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.pause()
    el.src = BGM_TRACKS[trackIndex].src
    el.load()
    if (playing) {
      void el.play().catch(() => setPlaying(false))
    }
  }, [trackIndex, playing])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const maxErr = BGM_TRACKS.length * 4
    const onEnded = () => goNextTrack()
    const onErr = () => {
      skipErrorsRef.current++
      if (skipErrorsRef.current > maxErr) return
      goNextTrack()
    }
    const onPlaying = () => {
      skipErrorsRef.current = 0
    }
    const onTimeUpdate = () => setCurrentTime(el.currentTime || 0)
    const onDurationChange = () => setDuration(Number.isFinite(el.duration) ? el.duration : 0)
    el.addEventListener("ended", onEnded)
    el.addEventListener("error", onErr)
    el.addEventListener("playing", onPlaying)
    el.addEventListener("timeupdate", onTimeUpdate)
    el.addEventListener("durationchange", onDurationChange)
    return () => {
      el.removeEventListener("ended", onEnded)
      el.removeEventListener("error", onErr)
      el.removeEventListener("playing", onPlaying)
      el.removeEventListener("timeupdate", onTimeUpdate)
      el.removeEventListener("durationchange", onDurationChange)
    }
  }, [goNextTrack])

  useEffect(() => {
    if (reducedMotion) return

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest?.("[data-ins-skip-fx]")) return

      ensureCtx()
      playSoftClickSound(ctxRef.current)

      const x = e.clientX
      const y = e.clientY
      const node = document.createElement("span")
      node.className = "ins-click-ripple"
      node.style.left = `${x}px`
      node.style.top = `${y}px`
      document.body.appendChild(node)
      const done = () => node.remove()
      node.addEventListener("animationend", done, { once: true })
      window.setTimeout(done, 900)
    }

    document.addEventListener("pointerdown", onPointerDown, true)
    return () => document.removeEventListener("pointerdown", onPointerDown, true)
  }, [ensureCtx, reducedMotion])

  const togglePlay = () => {
    ensureCtx()
    void ctxRef.current?.resume()
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
      return
    }
    void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  const skip = () => goNextTrack()

  const formatTime = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return "0:00"
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60).toString().padStart(2, "0")
    return `${minutes}:${seconds}`
  }

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0

  return (
    <>
      <audio ref={audioRef} preload="auto" />

      <div
        className="fixed bottom-5 left-4 z-[60] flex w-[min(360px,calc(100vw-32px))] flex-col items-start gap-2 sm:bottom-7 sm:left-7"
        data-ins-skip-fx
      >
        {!playerOpen ? (
          <button
            type="button"
            onClick={() => setPlayerOpen(true)}
            aria-label="展开音乐播放器"
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-rose-100/90 bg-[rgba(255,252,249,.94)] text-rose-500 shadow-[0_12px_28px_-16px_rgba(89,61,72,.55)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-rose-200 hover:text-rose-600 active:translate-y-0 active:scale-95"
          >
            <Music2 className={`h-5 w-5 ${playing ? "animate-pulse" : "transition-transform duration-300 group-hover:-rotate-6"}`} />
            {playing && (
              <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-[#fffaf7] bg-rose-400" />
            )}
          </button>
        ) : (
        <div className="journal-player relative flex w-full animate-[playerReveal_.35s_cubic-bezier(.22,1,.36,1)_both] items-center gap-3 rounded-[22px] border border-white/80 bg-[rgba(255,252,249,.94)] p-2.5 shadow-[0_18px_44px_-20px_rgba(89,61,72,.48)] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => {
              setPlayerOpen(false)
              setExpanded(false)
            }}
            className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-rose-100 bg-[#fffaf7] text-stone-400 shadow-sm transition-all hover:scale-105 hover:text-rose-600 active:scale-95"
            aria-label="收起音乐播放器"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-rose-100 bg-rose-50 text-rose-500 shadow-sm">
            <Music2 className={`h-5 w-5 ${playing ? "animate-pulse" : ""}`} aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-serif text-[13px] font-medium text-stone-700">{BGM_TRACKS[trackIndex].title}</p>
                <span className="text-[9px] uppercase tracking-[0.18em] text-rose-400">Moe&apos;s playlist</span>
              </div>
              <span className="shrink-0 text-[9px] tabular-nums text-stone-400">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-rose-100/80">
              <i className="block h-full rounded-full bg-gradient-to-r from-rose-300 to-pink-400 transition-[width] duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-200 to-pink-100 text-rose-700 shadow-sm transition-transform hover:scale-105 active:scale-95"
            aria-label={playing ? "暂停 BGM" : "播放 BGM"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={skip}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
            aria-label="下一首"
          >
            <SkipForward className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
            aria-expanded={expanded}
            aria-label="曲目信息"
          >
            <ListMusic className="h-4 w-4" />
          </button>
        </div>
        )}

        {playerOpen && expanded && (
          <div className="w-full rounded-[20px] border border-rose-100 bg-[rgba(255,252,249,.97)] px-4 py-3 text-xs text-stone-500 shadow-[0_16px_38px_-24px_rgba(89,61,72,.5)] backdrop-blur-md">
            <p className="font-medium text-foreground">正在轮换</p>
            <ul className="mt-1 space-y-0.5 pl-0">
              {BGM_TRACKS.map((t, i) => (
                <li
                  key={t.src}
                  className={`list-none text-[11px] ${i === trackIndex ? "font-medium text-foreground" : ""}`}
                >
                  {i + 1}. {t.title}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      <style jsx global>{`
        @keyframes playerReveal {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.94);
            transform-origin: left bottom;
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            transform-origin: left bottom;
          }
        }
      `}</style>
    </>
  )
}
