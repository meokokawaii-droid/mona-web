"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Music2, Pause, SkipForward, Volume2 } from "lucide-react"

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
  const [expanded, setExpanded] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

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
    el.addEventListener("ended", onEnded)
    el.addEventListener("error", onErr)
    el.addEventListener("playing", onPlaying)
    return () => {
      el.removeEventListener("ended", onEnded)
      el.removeEventListener("error", onErr)
      el.removeEventListener("playing", onPlaying)
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

  return (
    <>
      <audio ref={audioRef} preload="auto" />

      <div
        className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-2"
        data-ins-skip-fx
      >
        <div className="flex items-center gap-2 rounded-full border-2 border-border/80 bg-card/90 px-2 py-1.5 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 text-foreground transition-transform hover:scale-105 active:scale-95"
            aria-label={playing ? "暂停 BGM" : "播放 BGM"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={skip}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="下一首"
          >
            <SkipForward className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-expanded={expanded}
            aria-label="曲目信息"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>

        {expanded && (
          <div className="max-w-[220px] rounded-2xl border border-border/60 bg-card/95 px-3 py-2 text-xs text-muted-foreground shadow-md backdrop-blur-md">
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
            <p className="mt-2 text-[10px] leading-snug opacity-80">
              请将对应 mp3 放入 <code className="rounded bg-muted px-0.5">public/audio/</code>
              （ditto、mystery-of-love、hurt）
            </p>
          </div>
        )}
      </div>
    </>
  )
}
