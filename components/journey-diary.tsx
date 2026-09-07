"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { gallerySets } from "@/components/photo-gallery"
import { outfits } from "@/lib/wardrobe-data"
import { allWritings } from "@/lib/writing-data"

type DiaryTab = "home" | "video" | "writing" | "wardrobe" | "gallery"

const tabs: { key: Exclude<DiaryTab, "home">; label: string; color: string }[] = [
  { key: "video", label: "Video", color: "#DFA0AA" },
  { key: "writing", label: "Writing", color: "#F0DFC0" },
  { key: "wardrobe", label: "Wardrobe", color: "#C8B8DA" },
  { key: "gallery", label: "Gallery", color: "#AFC7B5" },
]

const galleryPhotos = gallerySets.flat()
const writingItems = allWritings
const DOUYIN_PROFILE_URL = "https://v.douyin.com/XbKFZpgKnX8/"

interface JourneyDiaryProps {
  onOpenVideo: () => void
}

export function JourneyDiary({ onOpenVideo }: JourneyDiaryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [activeTab, setActiveTab] = useState<DiaryTab>("home")
  const [pageMotion, setPageMotion] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const activePhoto = lightboxIndex === null ? null : galleryPhotos[lightboxIndex]

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null)
      if (event.key === "ArrowLeft") setLightboxIndex((current) => current === null ? null : (current - 1 + galleryPhotos.length) % galleryPhotos.length)
      if (event.key === "ArrowRight") setLightboxIndex((current) => current === null ? null : (current + 1) % galleryPhotos.length)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [lightboxIndex])

  const openDiary = () => {
    if (isOpening) return
    setIsOpening(true)
    window.setTimeout(() => {
      setIsOpen(true)
      setIsOpening(false)
    }, 680)
  }

  const selectTab = (tab: Exclude<DiaryTab, "home">) => {
    if (tab === activeTab) return
    setPageMotion(true)
    window.setTimeout(() => {
      setActiveTab(tab)
      window.setTimeout(() => setPageMotion(false), 40)
    }, 150)
  }

  const content = useMemo(() => {
    if (activeTab === "video") return <VideoSpread onOpenVideo={onOpenVideo} />
    if (activeTab === "writing") return <WritingSpread />
    if (activeTab === "wardrobe") return <WardrobeSpread />
    if (activeTab === "gallery") return <GallerySpread onOpen={setLightboxIndex} />
    return <HomeSpread onOpenVideo={onOpenVideo} />
  }, [activeTab, onOpenVideo])

  return (
    <section className="journal-type-system journey-stage mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1540px] items-center justify-center px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
      {!isOpen ? (
        <button
          type="button"
          onClick={openDiary}
          className={`journey-cover group relative block w-[min(76vw,470px)] border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-4 ${isOpening ? "is-opening" : ""}`}
          aria-label="打开 Moe's Journey 日记本"
        >
          <Image
            src="/images/journal/journey/moes-journey-cover-cutout.png"
            alt="粉色 Moe's Journey 日记本封面"
            width={1108}
            height={1435}
            priority
            className="h-auto w-full drop-shadow-[0_24px_28px_rgba(90,68,74,.18)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 group-hover:rotate-[.4deg]"
          />
          <span className="absolute -bottom-8 left-1/2 w-[58%] -translate-x-1/2 transition-all duration-300 group-hover:-translate-y-1 group-active:scale-[.97]">
            <Image src="/images/journal/buttons/open.png" alt="Open Moe's Journey" width={430} height={254} className="h-auto w-full drop-shadow-[0_8px_8px_rgba(86,60,67,.14)]" />
          </span>
        </button>
      ) : (
        <div className="journey-open relative w-full max-w-[1480px] animate-[diaryArrive_.65s_cubic-bezier(.22,1,.36,1)_both]">
          <BackgroundScrapbookDecoration />
          <div className="journey-desktop relative z-10 hidden aspect-[3/2] w-full lg:block">
            <Image
              src="/images/journal/journey/moes-journey-open-clean.png"
              alt="打开的粉色 Moe's Journey 活页日记本"
              fill
              loading="lazy"
              sizes="min(100vw, 1480px)"
              className="object-contain drop-shadow-[0_24px_28px_rgba(90,68,74,.17)]"
            />

            <DraggableHeartCharm />
            <DiaryDecorations />

            <DiaryTabs activeTab={activeTab} onSelect={selectTab} />

            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className={`absolute z-40 transition-all duration-300 hover:-translate-y-1 hover:rotate-[4deg] active:scale-95 ${activeTab === "home" ? "pointer-events-none opacity-35" : "opacity-100"}`}
              style={{ right: "8.8%", top: "9.8%", width: "4.8%" }}
              aria-label="返回日记首页"
            >
              <Image src="/images/journal/buttons/home-bow.png" alt="" width={274} height={255} className="h-auto w-full drop-shadow-[0_5px_5px_rgba(80,61,65,.17)]" />
            </button>

            <div className={`absolute inset-x-[11.5%] bottom-[12.2%] top-[17.2%] z-20 grid grid-cols-2 gap-[12.2%] overflow-hidden transition-all duration-300 ${pageMotion ? "translate-x-1 opacity-0" : "translate-x-0 opacity-100"}`}>
              {content}
            </div>
          </div>

          <div className="mobile-notebook relative left-1/2 mx-0 aspect-square w-[180vw] max-w-none -translate-x-1/2 md:hidden">
            <Image src="/images/journal/journey/moes-journey-mobile-open.webp" alt="打开的竖版 Moe's Journey 活页日记本" fill priority sizes="180vw" className="pointer-events-none object-contain" />
            <MobileDiaryTabs activeTab={activeTab} onSelect={selectTab} />
            <button type="button" onClick={() => setActiveTab("home")} className={`absolute left-[47%] top-[45%] z-40 h-[7%] w-[7%] rounded-full ${activeTab === "home" ? "pointer-events-none opacity-0" : "opacity-0"}`} aria-label="返回日记首页" />
            <div className={`absolute inset-0 z-20 transition-all duration-300 ${pageMotion ? "translate-x-1 opacity-0" : "opacity-100"}`}>
              {activeTab === "home" ? <MobileHomeSpread onOpenVideo={onOpenVideo} /> : (
                <div className="absolute top-[7%] bottom-[10%] grid grid-rows-[43%_43%] gap-[14%] overflow-hidden" style={{ left: "10%", right: "10%" }}>
                  {content}
                </div>
              )}
            </div>
          </div>

          <div className="journey-mobile relative mx-auto hidden w-full max-w-xl rounded-[28px] border border-[#e8aeb9] bg-[#e9b4bd] p-3 pb-5 shadow-[0_22px_42px_-26px_rgba(80,54,61,.48)] md:block lg:hidden">
            <div className="absolute inset-x-5 top-1 h-3 rounded-full border-t border-white/45 opacity-70" />
            <div className="relative mt-10 min-h-[690px] overflow-hidden rounded-[20px] border border-[#ead8cf] bg-[#fff9f4] px-5 py-8 shadow-[inset_0_0_32px_rgba(144,99,89,.06)] sm:px-8">
              <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#b99e91_.45px,transparent_.55px)] [background-size:5px_5px]" />
              <button type="button" onClick={() => setActiveTab("home")} className="relative z-10 mb-6 font-serif text-xs italic tracking-widest text-stone-400">Moe&apos;s Journey</button>
              <div className={`relative z-10 transition-all duration-300 ${pageMotion ? "translate-x-1 opacity-0" : "opacity-100"}`}>
                {content}
              </div>
            </div>
            <DiaryTabs activeTab={activeTab} onSelect={selectTab} mobile />
            <span className="absolute right-[-10px] top-1/2 h-20 w-7 -translate-y-1/2 rounded-r-xl border border-[#d993a1] bg-[#dda2ae] shadow-sm" aria-hidden="true" />
          </div>
        </div>
      )}

      {activePhoto && lightboxIndex !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-stone-900/65 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label="Gallery photo viewer" onClick={() => setLightboxIndex(null)}>
          <button type="button" onClick={() => setLightboxIndex(null)} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#fff9f4] text-stone-600 shadow-lg" aria-label="关闭照片"><X className="h-5 w-5" /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length) }} className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#fff9f4]/95 text-stone-600 shadow-lg sm:left-8" aria-label="上一张"><ChevronLeft /></button>
          <figure className="animate-[photoFloat_.42s_cubic-bezier(.22,1,.36,1)_both]" onClick={(event) => event.stopPropagation()}>
            <div className="relative h-[72vh] w-[min(78vw,720px)] overflow-hidden border-[10px] border-[#fff9f4] bg-[#fff9f4] shadow-2xl sm:border-[14px]">
              <Image src={activePhoto.src} alt={activePhoto.alt} fill sizes="78vw" className="object-contain" style={{ objectPosition: activePhoto.objectPosition }} />
            </div>
            <figcaption className="mt-3 text-center font-serif text-sm italic text-white/80">memory no. {String(lightboxIndex + 1).padStart(2, "0")}</figcaption>
          </figure>
          <button type="button" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length) }} className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#fff9f4]/95 text-stone-600 shadow-lg sm:right-8" aria-label="下一张"><ChevronRight /></button>
        </div>
      )}

      <style jsx global>{`
        @font-face { font-family: 'Chenyuluoyan'; src: url('/fonts/journal/ChenYuluoyan-Thin-Monospaced.ttf?v=journal-component-1') format('truetype'); font-style: normal; font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Kalam Journal'; src: url('/fonts/journal/Kalam-Regular.ttf?v=journal-component-1') format('truetype'); font-style: normal; font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Caveat Journal'; src: url('/fonts/journal/Caveat-Variable.ttf?v=journal-component-1') format('truetype'); font-style: normal; font-weight: 400 700; font-display: swap; }
        @font-face { font-family: 'Inter Journal'; src: url('/fonts/journal/Inter-Variable.ttf?v=journal-component-1') format('truetype'); font-style: normal; font-weight: 100 900; font-display: swap; }
        @font-face { font-family: 'EB Garamond Journal'; src: url('/fonts/journal/EBGaramond-Variable.ttf?v=journal-component-1') format('truetype'); font-style: normal; font-weight: 400 800; font-display: swap; }
        .journal-type-system .journal-editorial { font-family: 'EB Garamond Journal', Garamond, serif !important; font-style: normal !important; font-weight: 500 !important; letter-spacing: -.05em !important; }
        .journal-type-system .journal-hand-en { font-family: 'Kalam Journal', 'Segoe Print', cursive !important; font-style: normal !important; font-weight: 400 !important; }
        .journal-type-system .journal-hand-cn,
        .journal-type-system .journal-hand-mixed { font-family: 'Chenyuluoyan', cursive !important; font-style: normal !important; font-weight: 400 !important; letter-spacing: .03em !important; }
        .journal-type-system .journal-note-en { font-family: 'Caveat Journal', 'Segoe Print', cursive !important; font-style: normal !important; font-weight: 500 !important; }
        .journal-type-system .journal-print { font-family: 'Inter Journal', 'Helvetica Neue', Arial, sans-serif !important; font-style: normal !important; font-weight: 400 !important; }
        .journal-type-system .profile-identity { color: #8FA58F !important; }
        .journal-type-system .profile-bow { color: #DFA0AA !important; }
        .journal-type-system .profile-quote { color: #75665d !important; }
        .journal-type-system .profile-attribution { color: #845F4A !important; }
        .journal-type-system .profile-signature { color: #D98F9D !important; }
        .journal-type-system .currently-heading { color: #DFA0AA !important; }
        .journal-type-system .currently-label { color: #8B7668 !important; }
        .journal-type-system .currently-value-cn { color: #8FA58F !important; }
        .journal-type-system .currently-value-en { color: #845F4A !important; }
        .journal-type-system .journal-contact { color: #B9AC8C !important; opacity: .78; }
        .journal-type-system .writing-archive-title { font-family: 'EB Garamond Journal', Garamond, serif !important; font-style: normal !important; font-weight: 500 !important; color: #845F4A !important; letter-spacing: .08em !important; }
        .journal-type-system .writing-archive-subtitle { font-family: 'Inter Journal', Arial, sans-serif !important; color: #B9AC8C !important; letter-spacing: .16em !important; }
        .journal-type-system .writing-archive-note { font-family: 'Chenyuluoyan', cursive !important; font-style: normal !important; color: #8FA58F !important; }
        .journal-type-system .writing-page-count { font-family: 'Inter Journal', Arial, sans-serif !important; color: #DFA0AA !important; letter-spacing: .16em !important; }
        .journal-type-system .writing-item-title { font-family: 'Chenyuluoyan', cursive !important; font-style: normal !important; color: #5F4A42 !important; }
        .journal-type-system .writing-item-summary { font-family: 'Chenyuluoyan', cursive !important; color: #9B8E84 !important; }
        .journal-type-system .writing-item-keyword { font-family: 'Kalam Journal', cursive !important; color: #8FA58F !important; }
        .journal-type-system .writing-read-more-title { font-family: 'Caveat Journal', 'Segoe Print', cursive !important; font-style: normal !important; color: #845F4A !important; letter-spacing: .04em !important; }
        .journal-type-system .writing-read-more-sub { font-family: 'Kalam Journal', cursive !important; color: #8FA58F !important; }
        .journal-type-system .video-tape-meta { font-family: 'Inter Journal', Arial, sans-serif !important; color: #DFA0AA !important; letter-spacing: .16em !important; }
        .journal-type-system .video-tape-title { font-family: 'Chenyuluoyan', cursive !important; font-style: normal !important; color: #845F4A !important; }
        .journal-type-system .video-tape-note { font-family: 'Chenyuluoyan', cursive !important; font-style: normal !important; color: #8FA58F !important; }
        .journal-type-system .video-play-note { font-family: 'Caveat Journal', cursive !important; color: #DFA0AA !important; }
        @keyframes diaryArrive { from { opacity: 0; transform: translateY(14px) scale(.965); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes photoFloat { from { opacity: 0; transform: translateY(14px) scale(.94) rotate(-1deg); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); } }
        .journey-cover { perspective: 1300px; transform-style: preserve-3d; }
        .journey-cover.is-opening { animation: diaryCoverOpen .68s cubic-bezier(.65,0,.35,1) both; transform-origin: left center; }
        .journey-heart-charm { will-change: transform; }
        .journey-heart-charm.is-dragging { cursor: grabbing; filter: brightness(1.025); }
        .journey-heart-charm:not(.is-dragging):hover { filter: brightness(1.02); }
        .avatar-lace-doily { animation: laceDrift 32s linear infinite; }
        .avatar-lace-wrap:hover .avatar-lace-doily { animation-duration: 22s; }
        .currently-term { position: relative; }
        .currently-term::after { content: attr(data-tooltip); position: absolute; left: 0; bottom: calc(100% + 6px); z-index: 30; width: max-content; max-width: 180px; padding: 5px 7px; border: 1px solid rgba(185,172,140,.38); background: #F0EDDC; color: #845F4A; font: 9px/1.35 Georgia, serif; letter-spacing: .02em; box-shadow: 0 5px 12px rgba(88,70,58,.1); opacity: 0; pointer-events: none; transform: translateY(3px); transition: opacity .2s ease, transform .2s ease; }
        .currently-term:hover::after, .currently-term:focus-visible::after { opacity: 1; transform: translateY(0); }
        @media (max-width: 768px) {
          .journey-stage { align-items: flex-start !important; padding-top: 16px !important; padding-bottom: 24px !important; overflow-x: hidden; }
          .journey-open { width: 100%; margin-top: 0 !important; }
          .mobile-notebook { isolation: isolate; overflow: visible; margin-top: -8px; }
          .mobile-notebook > img { z-index: 0; }
          .mobile-notebook .mobile-page-top,
          .mobile-notebook .mobile-page-bottom { overflow: hidden; }
          .mobile-notebook .journal-editorial { font-size: clamp(26px, 7vw, 34px) !important; }
          .mobile-notebook .journal-hand-cn { font-size: clamp(12px, 3.2vw, 15px) !important; line-height: 1.55 !important; }
          .mobile-notebook .journal-hand-en { font-size: clamp(12px, 3.2vw, 15px) !important; line-height: 1.5 !important; }
          .mobile-notebook .journal-print { font-size: 11px !important; }
          .mobile-notebook .writing-item { padding-block: 10px; }
          .mobile-notebook .writing-item-title { font-size: 17px !important; }
          .mobile-notebook .writing-item-summary { font-size: 12px !important; line-height: 1.55 !important; }
          .mobile-notebook .writing-item-keyword { font-size: 10px !important; }
          .mobile-notebook .future-memo { max-width: 100%; }
          .mobile-page-top .avatar-lace-wrap { width: clamp(78px, 21vw, 112px) !important; }
          .mobile-page-top .avatar-lace-wrap { margin-top: -2px; }
          .mobile-page-top .journal-editorial { font-size: clamp(25px, 7vw, 31px) !important; margin-top: 2px !important; }
          .mobile-page-top .profile-identity { margin-top: 5px !important; font-size: 11px !important; line-height: 1.25 !important; }
          .mobile-page-top .profile-bow { margin-block: 2px !important; font-size: 15px !important; }
          .mobile-page-top .profile-quote { font-size: 11px !important; line-height: 1.25 !important; }
          .mobile-page-top .profile-attribution { margin-top: 2px !important; font-size: 7px !important; }
          .mobile-page-top .journal-meta { margin-top: 3px !important; font-size: 8px !important; }
          .mobile-page-top .profile-signature { margin-top: 2px !important; font-size: 10px !important; }
          .mobile-page-bottom .journal-hand-en { font-size: clamp(11px, 2.8vw, 14px) !important; line-height: 1.28 !important; }
          .mobile-page-bottom .journal-hand-cn { font-size: clamp(11px, 2.8vw, 14px) !important; line-height: 1.35 !important; }
          .mobile-page-bottom > div:first-child { width: 88% !important; }
          .mobile-page-bottom > div:nth-child(2) { width: 92% !important; margin-top: 2px !important; }
          .mobile-page-bottom > div:nth-child(2) h2 { font-size: 9px !important; }
          .mobile-page-bottom > div:nth-child(2) > div { gap: 1px 10px !important; }
          .mobile-page-bottom .future-memo-content { transform: translateY(-2%); }
        }
        @keyframes laceDrift { to { transform: rotate(360deg); } }
        @keyframes diaryCoverOpen { 0% { opacity: 1; transform: rotateY(0) translateX(0); } 70% { opacity: .8; transform: rotateY(-72deg) translateX(-3%); } 100% { opacity: 0; transform: rotateY(-96deg) translateX(-9%); } }
        @media (prefers-reduced-motion: reduce) { .journey-cover.is-opening, .journey-open, .journey-photo { animation-duration: .01ms !important; } .avatar-lace-doily { animation: none !important; } }
      `}</style>
    </section>
  )
}

function DiaryDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[22]" aria-hidden="true">
      <div className="absolute -rotate-[7deg] drop-shadow-[0_5px_5px_rgba(76,57,62,.16)]" style={{ left: "10.8%", top: "13.5%", width: "6.8%" }}>
        <Image src="/images/journal/journey/deco-binder-clip.png" alt="" width={461} height={461} className="h-auto w-full" />
      </div>
      <div className="absolute rotate-[14deg] opacity-90 drop-shadow-[0_5px_5px_rgba(76,57,62,.14)]" style={{ right: "8.7%", top: "25%", width: "7.7%" }}>
        <Image src="/images/journal/journey/deco-safety-pin.png" alt="" width={461} height={461} className="h-auto w-full" />
      </div>
      <div className="absolute -rotate-[9deg] opacity-90 drop-shadow-[0_4px_4px_rgba(76,57,62,.14)]" style={{ bottom: "9.6%", left: "12%", width: "4%" }}>
        <Image src="/images/journal/journey/deco-heart-paperclip.png" alt="" width={288} height={461} className="h-auto w-full" />
      </div>
    </div>
  )
}

function BackgroundScrapbookDecoration() {
  return (
    <div className="pointer-events-none absolute z-20 hidden rotate-[4deg] lg:block" style={{ right: "0.5%", top: "-5.5%", width: "16%" }} aria-hidden="true">
      <Image src="/images/journal/sticky-note-v2.png" alt="" width={1065} height={834} className="h-auto w-full drop-shadow-[0_10px_9px_rgba(82,62,57,.16)]" />
    </div>
  )
}

function DraggableHeartCharm() {
  const charmRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const motionRef = useRef({ angle: 0, velocity: 0, scale: 1, lastAngle: 0, lastTime: 0, dragging: false, anchorX: 0, anchorY: 0, length: 1 })

  const paint = (angle: number, scale = 1) => {
    if (!charmRef.current) return
    charmRef.current.style.transform = `rotate(${angle}deg) scaleY(${scale})`
  }

  const settle = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    const tick = () => {
      const motion = motionRef.current
      const acceleration = -0.022 * motion.angle
      motion.velocity = (motion.velocity + acceleration) * 0.945
      motion.angle += motion.velocity
      motion.scale += (1 - motion.scale) * 0.16
      paint(motion.angle, motion.scale)

      if (Math.abs(motion.angle) < 0.08 && Math.abs(motion.velocity) < 0.08 && Math.abs(motion.scale - 1) < 0.002) {
        motion.angle = 0
        motion.velocity = 0
        motion.scale = 1
        paint(0, 1)
        frameRef.current = null
        return
      }
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
  }, [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    event.currentTarget.setPointerCapture(event.pointerId)
    const motion = motionRef.current
    const parentRect = event.currentTarget.offsetParent?.getBoundingClientRect()
    if (parentRect) {
      motion.anchorX = parentRect.left + event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2
      motion.anchorY = parentRect.top + event.currentTarget.offsetTop
      motion.length = event.currentTarget.offsetHeight
    }
    motion.dragging = true
    motion.lastAngle = motion.angle
    motion.lastTime = performance.now()
    event.currentTarget.classList.add("is-dragging")
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const motion = motionRef.current
    if (!motion.dragging || !charmRef.current) return
    const dx = event.clientX - motion.anchorX
    const dy = Math.max(24, event.clientY - motion.anchorY)
    const nextAngle = Math.max(-58, Math.min(58, Math.atan2(dx, dy) * 180 / Math.PI))
    const pointerDistance = Math.hypot(dx, dy)
    const nextScale = Math.max(0.96, Math.min(1.055, pointerDistance / motion.length))
    const now = performance.now()
    const elapsed = Math.max(8, now - motion.lastTime)
    motion.velocity = Math.max(-5.5, Math.min(5.5, (nextAngle - motion.lastAngle) / elapsed * 16.67))
    motion.angle = nextAngle
    motion.scale = nextScale
    motion.lastAngle = nextAngle
    motion.lastTime = now
    paint(nextAngle, nextScale)
  }

  const release = (event: React.PointerEvent<HTMLDivElement>) => {
    const motion = motionRef.current
    if (!motion.dragging) return
    motion.dragging = false
    event.currentTarget.classList.remove("is-dragging")
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      motion.angle = 0
      motion.velocity = 0
      motion.scale = 1
      paint(0, 1)
    } else {
      settle()
    }
  }

  return (
    <div
      ref={charmRef}
      role="button"
      tabIndex={0}
      aria-label="可拖动的爱心吊坠"
      className="journey-heart-charm absolute z-40 origin-top cursor-grab touch-none select-none outline-none focus-visible:drop-shadow-[0_0_8px_rgba(236,142,174,.8)]"
      style={{ left: "1.35%", top: "6.7%", width: "8.7%", height: "82%" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          motionRef.current.angle += event.key === "ArrowLeft" ? -7 : 7
          motionRef.current.velocity = event.key === "ArrowLeft" ? -1.4 : 1.4
          paint(motionRef.current.angle)
          settle()
        }
      }}
    >
      <Image src="/images/journal/journey/heart-charm.png" alt="" fill sizes="130px" draggable={false} className="pointer-events-none object-contain object-top drop-shadow-[0_8px_8px_rgba(86,63,66,.18)]" />
    </div>
  )
}

function DiaryTabs({ activeTab, onSelect, mobile = false }: { activeTab: DiaryTab; onSelect: (tab: Exclude<DiaryTab, "home">) => void; mobile?: boolean }) {
  if (mobile) {
    return (
      <div className="absolute inset-x-3 top-1.5 z-30 flex justify-center gap-1 px-2">
        {tabs.map((tab) => (
          <button key={tab.key} type="button" onClick={() => onSelect(tab.key)} aria-current={activeTab === tab.key ? "page" : undefined} style={{ backgroundColor: tab.color }} className={`min-h-10 flex-1 rounded-t-[13px] border border-white/45 px-1 pt-1 font-serif text-[11px] italic text-stone-600 shadow-sm transition-transform duration-300 ${activeTab === tab.key ? "-translate-y-1" : "hover:-translate-y-0.5"}`}>{tab.label}</button>
        ))}
      </div>
    )
  }

  return (
    <div className="absolute left-[18.2%] right-[18.3%] top-[10.8%] z-30 flex justify-between">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onSelect(tab.key)}
          aria-current={activeTab === tab.key ? "page" : undefined}
          aria-label={`打开 ${tab.label}`}
          className="group relative h-12 w-[18%] rounded-t-[24px] border-0 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
        >
          <span className="sr-only">{tab.label}</span>
          <span className={`absolute bottom-1 left-1/2 h-1 -translate-x-1/2 rounded-full bg-white/80 transition-all duration-300 ${activeTab === tab.key ? "w-8 opacity-90" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-60"}`} />
        </button>
      ))}
    </div>
  )
}

function MobileDiaryTabs({ activeTab, onSelect }: { activeTab: DiaryTab; onSelect: (tab: Exclude<DiaryTab, "home">) => void }) {
  return (
    <div className="absolute left-[27%] right-[13%] top-[0.2%] z-40 flex h-[7.2%]">
      {tabs.map((tab) => (
        <button key={tab.key} type="button" onClick={() => onSelect(tab.key)} aria-current={activeTab === tab.key ? "page" : undefined} aria-label={`打开 ${tab.label}`} className="h-full flex-1 border-0 bg-transparent p-0 opacity-0 focus:outline-none" />
      ))}
    </div>
  )
}

function PageHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <header className="mb-5 border-b border-[#edcbd0] pb-3">
      <p className="text-[8px] uppercase tracking-[0.28em] text-[#c98292]">{eyebrow}</p>
      <h2 className="mt-1 font-serif text-2xl leading-none tracking-[-0.03em] text-stone-700 xl:text-3xl">{title}</h2>
      {note && <p className="mt-2 text-[10px] italic leading-4 text-[#8a927f] [font-family:'Segoe_Print','Bradley_Hand',cursive]">{note}</p>}
    </header>
  )
}

const initialWishes = [
  { id: 1, text: "Pass the JLPT N1 exam & keep learning", shortLabel: "JLPT N1", completed: false },
  { id: 2, text: "Relocate to Newtown", shortLabel: "Japan", completed: false },
  { id: 3, text: "Develop findmemoe.top website", shortLabel: "My website", completed: true },
  { id: 4, text: "Stay rebel, stay open, stay full", shortLabel: "Japanese", completed: false },
  { id: 5, text: "Got a Switch, a new laptop, and a new iPhone", shortLabel: "Create more", completed: false },
]

const currentlyNotes = [
  { label: "research", value: "社会学 · 政治学", tooltip: "society / structure / individual" },
  { label: "work", value: "外贸 · 商业", tooltip: "B2B / market / negotiation" },
  { label: "learning", value: "日本語 · English", tooltip: "language as a window" },
  { label: "recent obsession", value: "AI · agents · tokens", tooltip: "context / cost / information" },
]

function MobileHomeSpread({ onOpenVideo }: { onOpenVideo: () => void }) {
  const [wishes, setWishes] = useState(initialWishes)
  return (
    <>
      <section className="mobile-page-top absolute h-[29%] overflow-hidden text-center text-[#845F4A]" style={{ left: "18%", right: "18%", top: "10%" }}>
        <div className="avatar-lace-wrap relative mx-auto isolate -rotate-[2deg]" style={{ width: "clamp(68px, 18vw, 96px)", aspectRatio: "1 / 1" }}>
          <Image src="/images/journal/journey/avatar-lace-doily.png" alt="" fill sizes="96px" className="avatar-lace-doily z-0 object-contain drop-shadow-[0_2px_2px_rgba(89,70,58,.09)]" aria-hidden="true" />
          <span className="absolute z-10 overflow-hidden rounded-full border border-[#E7D8CB] rotate-[2deg]" style={{ inset: "19.5%" }}><Image src="/images/avatar.png" alt="Moe 的头像" fill sizes="64px" className="object-cover" /></span>
        </div>
        <h1 className="journal-editorial mt-[1%] text-[clamp(24px,7vw,30px)] leading-none">MOE</h1>
        <p className="journal-hand-cn mt-[1.5%] text-[clamp(9px,2.7vw,12px)] leading-relaxed text-[#83927a]">观察者 / 游荡者 / 我心飘零久</p>
        <div className="my-[1.5%] flex items-center justify-center gap-2 text-[10px] text-[#DFA0AA]"><span className="h-px w-8 bg-[#DFA0AA]/40" />୨୧<span className="h-px w-8 bg-[#DFA0AA]/40" /></div>
        <blockquote className="journal-hand-cn text-[clamp(10px,2.8vw,13px)] leading-relaxed">“人生而自由，却无往不在枷锁之中”</blockquote>
        <p className="journal-print mt-[1%] text-[7px] uppercase tracking-[.18em] text-[#845F4A]">— Jean-Jacques Rousseau</p>
        <p className="journal-meta mt-[1%] text-[8px] tracking-[.08em] text-[#94877B]">萌 / 03年 INFP / 永远在路上</p>
        <p className="journal-hand-cn mt-[.5%] text-[9px] text-[#B9AC8C]">我思故我在</p>
      </section>

      <section className="mobile-page-bottom absolute h-[34%] overflow-hidden text-center text-[#845F4A]" style={{ left: "18%", right: "18%", top: "61%" }}>
        <div className="relative mx-auto aspect-[1248/868] w-[78%] -rotate-[1deg] drop-shadow-[0_4px_10px_rgba(132,95,74,.10)]">
          <Image src="/images/journal/journey/future-lace-memo-supplied.png" alt="" fill sizes="72vw" className="pointer-events-none object-contain" aria-hidden="true" />
          <div className="absolute bottom-[10%] left-[14%] right-[14%] top-[26%]">
            <h2 className="journal-hand-en text-center text-[clamp(11px,3vw,14px)]">Future / little plans</h2>
            <div className="mt-[2%]">
              {wishes.map((wish) => <button key={wish.id} type="button" onClick={() => setWishes(current => current.map(item => item.id === wish.id ? {...item, completed: !item.completed} : item))} className="journal-hand-en flex w-full items-center gap-1 py-0 text-left text-[clamp(8px,2.3vw,11px)] leading-[1.35]" aria-pressed={wish.completed}><span>{wish.completed ? "✓" : "○"}</span><span className={wish.completed ? "line-through opacity-60" : ""}>{wish.shortLabel}</span></button>)}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-[1%] w-[82%]">
          <h2 className="journal-print text-[8px] uppercase tracking-[.18em] text-[#DFA0AA]">Currently</h2>
          <div className="mt-[1%] grid grid-cols-2 gap-x-[8%] gap-y-[2%]">
            {currentlyNotes.map(item => <div key={item.label}><p className="journal-hand-en text-[8px] text-[#DFA0AA]">{item.label}</p><span className="journal-hand-mixed text-[clamp(8px,2.25vw,10px)] leading-snug">{item.value}</span></div>)}
          </div>
        </div>
        <a href={DOUYIN_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="absolute bottom-[1%] right-[5%] h-[clamp(32px,9vw,40px)] w-[clamp(32px,9vw,40px)] opacity-75 transition duration-300 hover:-rotate-2 hover:scale-105 hover:opacity-100" aria-label="Open Moe's Douyin profile"><Image src="/images/journal/journey/douyin-stamp.png" alt="" fill sizes="40px" className="object-contain drop-shadow-[0_2px_3px_rgba(132,95,74,.10)]" /></a>
      </section>
    </>
  )
}

function HomeSpread({ onOpenVideo }: { onOpenVideo: () => void }) {
  const [wechatCopied, setWechatCopied] = useState(false)
  const [wishes, setWishes] = useState(initialWishes)

  return (
    <>
      <div className="relative flex h-full flex-col items-center justify-start px-[9%] pb-[clamp(70px,6vw,90px)] pt-[8%] text-center" style={{ transform: "translateY(clamp(56px, 5vw, 76px))" }}>
        <div className="avatar-lace-wrap relative isolate -rotate-[2deg]" style={{ width: "clamp(142px, 12.6vw, 190px)", aspectRatio: "1 / 1" }}>
          <Image src="/images/journal/journey/avatar-lace-doily.png" alt="" fill sizes="158px" className="avatar-lace-doily z-0 object-contain drop-shadow-[0_3px_3px_rgba(89,70,58,.1)]" aria-hidden="true" />
          <span className="absolute z-10 overflow-hidden rounded-full border border-[#E7D8CB] rotate-[2deg] shadow-[0_2px_5px_rgba(95,74,60,.13)]" style={{ inset: "19.5%" }}>
            <Image src="/images/avatar.png" alt="Moe 的头像" fill sizes="102px" className="object-cover" />
          </span>
        </div>
        <h1 className="journal-editorial mt-2 text-[clamp(2.7rem,4vw,4.8rem)] not-italic leading-none tracking-[-.05em] text-stone-700">MOE</h1>
        <div className="mt-1 max-w-[92%] text-center">
        <p className="profile-identity journal-hand-cn mt-3 text-[clamp(12px,1vw,15px)] not-italic leading-6">观察者 / 游荡者 / 我心飘零久</p>
        <div className="profile-bow journal-hand-cn my-2.5 text-[22px] not-italic leading-none" aria-hidden="true">୨୧</div>
        <blockquote className="profile-quote journal-hand-cn max-w-sm text-[clamp(14px,1.15vw,17px)] not-italic leading-7">“人生而自由，却无往不在枷锁之中”</blockquote>
        <p className="profile-attribution journal-print mt-2 text-[9px] uppercase tracking-[.14em]">— Jean-Jacques Rousseau</p>
        <p className="journal-meta mt-4 text-[11px] tracking-[.12em] text-stone-500">萌 <span className="mx-2 text-[#B9AC8C]">/</span> 03年 INFP <span className="mx-2 text-[#B9AC8C]">/</span> 永远在路上</p>
        <p className="profile-signature journal-hand-cn mt-3 text-[clamp(16px,1.25vw,19px)] not-italic tracking-[.04em]">我思故我在</p>
        </div>
      </div>

      <div className="relative flex h-full flex-col px-[7%] pb-[clamp(70px,6vw,90px)] pt-[5%]">
        <section className="relative mx-auto" style={{ marginTop: "8%", width: "clamp(340px, 30vw, 380px)", maxWidth: "108%", aspectRatio: "1248 / 868", transform: "rotate(-1deg)", filter: "drop-shadow(0 8px 8px rgba(90,67,55,.12)) drop-shadow(0 2px 2px rgba(90,67,55,.09))" }} aria-labelledby="diary-future-title">
          <Image src="/images/journal/journey/future-lace-memo-supplied.png" alt="" fill sizes="(min-width: 1024px) 380px, 92vw" className="pointer-events-none z-0 object-contain" aria-hidden="true" />
          <div className="absolute z-10 flex flex-col" style={{ left: "14%", right: "14%", top: "26%", bottom: "9%" }}>
            <h2 id="diary-future-title" className="journal-hand-en text-center text-[17px] font-normal tracking-[.035em] text-[#845F4A]">Future / little plans</h2>
            <div className="mx-auto mt-1.5 h-px w-14 bg-[#a98a78]/35" />
          <div className="mt-1.5 space-y-0">
            {wishes.map((wish) => (
              <button key={wish.id} type="button" onClick={() => setWishes((current) => current.map((item) => item.id === wish.id ? { ...item, completed: !item.completed } : item))} className="group flex w-full items-center gap-2 py-0 text-left" aria-pressed={wish.completed} title={wish.text}>
                <span
                  className="inline-flex h-4 w-4 shrink-0 items-center justify-center font-serif text-[12px] leading-none transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"
                  style={{ color: wish.completed ? "#845F4A" : "#94877B", transform: `rotate(${wish.id % 2 ? -4 : 3}deg)` }}
                >{wish.completed ? "✓" : "○"}</span>
                <span
                  className={`journal-hand-en text-[clamp(13px,1vw,15px)] leading-[20px] tracking-[.01em] transition-all duration-300 group-hover:translate-x-0.5 ${wish.completed ? "line-through decoration-[#845F4A]/45 opacity-60" : ""}`}
                  style={{ color: "#6F5A4E" }}
                >{wish.shortLabel}</span>
              </button>
            ))}
          </div>
          </div>
        </section>

        <section className="ml-[7%] mt-4 w-[86%] text-left text-[#845F4A]" aria-labelledby="currently-title">
          <h2 id="currently-title" className="currently-heading journal-print text-[12px] font-medium uppercase tracking-[.18em]">Currently</h2>
          <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2">
            {currentlyNotes.map((item) => (
              <div key={item.label} className="border-b border-dashed border-[#B9AC8C]/35 pb-1 text-left">
                <p className="currently-label journal-hand-en text-[11px] italic leading-4">{item.label}</p>
                <span tabIndex={0} data-tooltip={item.tooltip} className={`currently-term cursor-help text-[13px] leading-5 outline-none ${item.value.includes("社会学") || item.value.includes("外贸") ? "currently-value-cn journal-hand-cn" : "currently-value-en journal-hand-en"}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="absolute left-[7%] right-[7%] flex items-end justify-between gap-5" style={{ bottom: "clamp(76px, 6vw, 90px)" }}>
          <a href={DOUYIN_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="group flex -rotate-[1deg] items-center gap-2 border-b border-[#B9AC8C]/45 pb-1 text-left text-[#845F4A] transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-px" aria-label="Open Moe's Douyin profile">
            <span className="relative h-10 w-12 shrink-0 transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105">
              <Image src="/images/journal/journey/douyin-stamp.png" alt="" fill sizes="48px" className="object-contain drop-shadow-[0_3px_3px_rgba(91,71,59,.13)]" aria-hidden="true" />
            </span>
            <span><span className="journal-note-en block text-[14px]">watch me →</span><span className="journal-note-en block text-[10px] tracking-[.04em] text-[#94877B]">moving archive</span></span>
          </a>
        <address className="journal-contact self-end border-t border-[#B9AC8C]/30 pt-2 text-right not-italic" aria-label="Contact Moe">
            <p className="journal-note-en mb-1 text-[14px] text-[#b87988]">write to Moe</p>
          <div className="journal-print flex items-center justify-end gap-3 text-[9px] tracking-[.06em] text-stone-400">
            <a href="https://wa.me/8617320932309" className="transition-colors hover:text-pink-500" aria-label="Contact Moe on WhatsApp">WhatsApp · say hello</a>
            <span className="text-pink-200">✦</span>
            <button type="button" onClick={() => { void navigator.clipboard?.writeText("miko33q33"); setWechatCopied(true); window.setTimeout(() => setWechatCopied(false), 1600) }} className="transition-colors hover:text-pink-500" aria-label="Copy WeChat ID">WeChat · {wechatCopied ? "copied" : "say hello"}</button>
            <span className="text-pink-200">✦</span>
            <a href="mailto:meokokawaii@gmail.com" className="transition-colors hover:text-pink-500">Mail</a>
          </div>
        </address>
        </div>
      </div>
    </>
  )
}

function WritingSpread() {
  const midpoint = Math.ceil(writingItems.length / 2)
  return (
    <>
      {[writingItems.slice(0, midpoint), writingItems.slice(midpoint)].map((column, columnIndex) => (
        <div key={columnIndex} className="relative h-full overflow-y-auto px-[7%] pt-[10%] [scrollbar-width:thin]">
          {columnIndex === 0 ? (
            <header className="mb-7 border-b border-[#DFA0AA]/20 pb-4">
              <h2 className="writing-archive-title text-[clamp(21px,2vw,29px)] leading-none">WRITINGS</h2>
              <p className="writing-archive-subtitle mt-2 text-[8px] uppercase">thoughts / essays / fragments</p>
              <p className="writing-archive-note mt-4 text-[14px] leading-6">写下来，是为了不让它消失。</p>
            </header>
          ) : (
            <header className="mb-7 border-b border-[#DFA0AA]/20 pb-4">
              <p className="writing-page-count text-[13px]">06 — 10</p>
              <div className="writing-archive-note mt-2 text-[18px] leading-none text-[#DFA0AA]" aria-hidden="true">୨୧</div>
            </header>
          )}
          <div className="space-y-1">
            {column.map((item, index) => (
              <Link key={item.link} href={item.link} className="writing-item group relative block border-b border-[#B9AC8C]/20 py-4 transition-transform duration-300 hover:translate-x-1">
                <div className="flex items-baseline gap-3">
                  <span className="writing-page-count text-[9px] tabular-nums">{String(index + 1 + columnIndex * midpoint).padStart(2, "0")}</span>
                  <h3 className="writing-item-title text-[clamp(16px,1.35vw,20px)] leading-tight transition-colors group-hover:text-[#D98F9D]">{item.title}{item.link === "/writing/breaking-shell" ? <span className="ml-2 align-middle font-sans text-[8px] uppercase tracking-[.16em] text-[#DFA0AA] opacity-80">new</span> : null}</h3>
                </div>
                <p className="writing-item-summary mt-2 max-w-[92%] pl-7 text-[11px] leading-6">{item.description}</p>
                <span className="writing-item-keyword absolute bottom-3 right-1 text-[10px] italic">{categoryLabel(item.category)} /</span>
              </Link>
            ))}
          </div>
          {columnIndex === 1 && (
            <Link href="/writing" className="writing-read-more group absolute bottom-[clamp(72px,6vw,88px)] right-[7%] flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 active:scale-[.97]" aria-label="阅读更多文章">
              <span className="text-[27px] leading-none text-[#845F4A] transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true">🪶</span>
              <span className="block text-left">
                <span className="writing-read-more-title block text-[18px] leading-none">read more →</span>
                <span className="writing-read-more-sub mt-1 block text-[10px]">all writings</span>
              </span>
            </Link>
          )}
        </div>
      ))}
    </>
  )
}

function categoryLabel(category: (typeof allWritings)[number]["category"]) {
  return ({ self: "自我", homeland: "乡土", dialogue: "对话", philosophy: "哲思" } as const)[category]
}

function VideoSpread({ onOpenVideo }: { onOpenVideo: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) { void video.play(); setIsPlaying(true) }
    else { video.pause(); setIsPlaying(false) }
  }

  return (
    <>
      <div className="relative flex h-full flex-col justify-center px-[14%] py-[9%] text-left">
        <div className="max-w-[78%]">
          <p className="video-tape-meta text-[9px] uppercase">TAPE 01 / 2026</p>
          <h2 className="video-tape-title mt-5 text-[clamp(25px,3vw,39px)] font-normal leading-none">精神流民</h2>
          <p className="video-tape-note mt-4 text-[clamp(14px,1.2vw,18px)] leading-6">被我留下的片段</p>
          <div className="mt-7 h-px w-24 bg-[#B9AC8C]/30" />
          <button type="button" onClick={togglePlayback} className="video-play-note mt-7 text-[clamp(15px,1.25vw,19px)] transition-transform duration-300 hover:translate-x-0.5 hover:opacity-75" aria-label={isPlaying ? "暂停精神流民" : "播放精神流民"}>press play on my little CCD ↗</button>
        </div>
      </div>
      <div className="relative flex h-full items-center justify-center p-[4%]">
        <button type="button" onClick={togglePlayback} className="group relative w-full max-w-[520px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300" aria-label={isPlaying ? "暂停精神流民" : "播放精神流民"}>
          <Image src="/images/journal/journey/ccd-camera-cutout.png" alt="银黑色 CCD 相机" width={1450} height={1088} className="h-auto w-full drop-shadow-[0_14px_16px_rgba(72,60,60,.16)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[.4deg]" />
          <span className="absolute left-[12.5%] top-[29%] flex h-[50%] w-[54%] items-center justify-center overflow-hidden rounded-[2%] bg-[#171516] transition-all duration-500 group-hover:bg-[#211b1c]">
            <video ref={videoRef} src="/video/mevideo1.mp4" muted playsInline preload="metadata" onEnded={() => setIsPlaying(false)} className={`absolute inset-0 h-full w-full object-cover ${isPlaying ? "opacity-100" : "opacity-0"}`} aria-label="精神流民录像" />
            <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#DFA0AA]/60 bg-[#DFA0AA]/85 text-[#F7F2EA] shadow-[0_3px_8px_rgba(70,45,50,.25)] transition-all duration-300 ${isPlaying ? "scale-75 opacity-0" : "group-hover:scale-105"}`}><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
            {isPlaying && <span className="absolute left-2 top-2 z-10 font-mono text-[8px] tracking-[.12em] text-[#F0EDDC]/65">REC&nbsp; 00:00:12</span>}
          </span>
        </button>
      </div>
    </>
  )
}

function WardrobeSpread() {
  const shown = outfits.slice(0, 6)
  return (
    <>
      <div className="h-full overflow-hidden px-[7%] py-[7%]">
        <PageHeading eyebrow="Closet notes" title="Wardrobe" note="little looks, little selves" />
        <div className="grid grid-cols-2 gap-3">
          {shown.slice(0, 4).map((outfit, index) => (
            <Link href="/wardrobe" key={outfit.id} className={`group relative bg-[#fbf3ec] p-2 pb-5 shadow-[0_8px_16px_-14px_rgba(80,55,58,.45)] transition-transform hover:-translate-y-1 ${index % 2 ? "rotate-[1deg]" : "-rotate-[1deg]"}`}>
              <div className="relative aspect-[3/4] overflow-hidden"><Image src={`/wardrobe/${outfit.id}.png`} alt={outfit.name} fill sizes="160px" className="object-contain transition-transform duration-500 group-hover:scale-[1.03]" /></div>
              <p className="absolute bottom-1.5 left-2 font-serif text-[9px] italic text-stone-500">{outfit.name} · {outfit.tag}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex h-full flex-col justify-center px-[8%] py-[8%]">
        <div className="relative grid grid-cols-2 gap-4">
          {shown.slice(4).map((outfit, index) => (
            <Link href="/wardrobe" key={outfit.id} className={`relative bg-[#fbf3ec] p-2 pb-6 shadow-[0_8px_16px_-14px_rgba(80,55,58,.45)] transition-transform hover:-translate-y-1 ${index ? "rotate-[2deg]" : "-rotate-[2deg]"}`}>
              <div className="relative aspect-[3/4]"><Image src={`/wardrobe/${outfit.id}.png`} alt={outfit.name} fill sizes="180px" className="object-contain" /></div>
              <p className="absolute bottom-1.5 left-2 text-[9px] text-stone-500">{outfit.name}</p>
            </Link>
          ))}
          <span className="absolute -top-4 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-pink-200/55" />
        </div>
        <Link href="/wardrobe" className="group ml-auto mt-5 block w-[58%] transition-all duration-300 hover:-translate-y-1 active:scale-[.97]" aria-label="探索完整衣橱">
          <Image src="/images/journal/buttons/explore.png" alt="Explore" width={540} height={245} className="h-auto w-full drop-shadow-[0_7px_6px_rgba(83,62,65,.13)] transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  )
}

function GallerySpread({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <>
      <div className="relative h-full px-[6%] py-[6%]">
        <PageHeading eyebrow="Summer fragments" title="Gallery" note="photos I almost forgot" />
        <PhotoPrint photo={galleryPhotos[0]} index={0} onOpen={onOpen} className="left-[8%] top-[29%] h-[58%] w-[56%] -rotate-[2deg]" />
        <PhotoPrint photo={galleryPhotos[1]} index={1} onOpen={onOpen} className="bottom-[8%] right-[6%] h-[38%] w-[34%] rotate-[2deg]" />
      </div>
      <div className="relative h-full px-[6%] py-[6%]">
        <PhotoPrint photo={galleryPhotos[2]} index={2} onOpen={onOpen} className="left-[7%] top-[9%] h-[38%] w-[42%] rotate-[1deg]" />
        <PhotoPrint photo={galleryPhotos[3]} index={3} onOpen={onOpen} className="right-[7%] top-[13%] h-[31%] w-[38%] -rotate-[2deg]" />
        <PhotoPrint photo={galleryPhotos[4]} index={4} onOpen={onOpen} className="bottom-[8%] left-[12%] h-[42%] w-[36%] -rotate-[1deg]" />
        <PhotoPrint photo={galleryPhotos[5]} index={5} onOpen={onOpen} className="bottom-[12%] right-[8%] h-[39%] w-[39%] rotate-[2deg]" />
        <span className="absolute left-[42%] top-[48%] -rotate-6 text-xs text-[#b88791] [font-family:'Segoe_Print','Bradley_Hand',cursive]">small pieces<br />of everywhere ♡</span>
        <button type="button" onClick={() => onOpen(0)} className="group absolute z-30 transition-all duration-300 hover:-translate-y-1 active:scale-[.97]" style={{ bottom: "1.5%", left: "34%", width: "38%" }} aria-label="查看更多照片">
          <Image src="/images/journal/buttons/view-more.png" alt="View more" width={575} height={270} className="h-auto w-full drop-shadow-[0_7px_6px_rgba(83,62,65,.14)] transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </>
  )
}

function PhotoPrint({ photo, index, onOpen, className }: { photo: (typeof galleryPhotos)[number]; index: number; onOpen: (index: number) => void; className: string }) {
  return (
    <button type="button" onClick={() => onOpen(index)} className={`journey-photo group absolute border-[6px] border-[#fffaf5] bg-[#fffaf5] pb-5 shadow-[0_12px_20px_-15px_rgba(68,44,49,.52)] transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_18px_28px_-15px_rgba(68,44,49,.48)] ${className}`}>
      <span className="relative block h-full w-full overflow-hidden"><Image src={photo.src} alt={photo.alt} fill sizes="260px" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" style={{ objectPosition: photo.objectPosition }} /></span>
      <span className="absolute bottom-1 left-2 text-[7px] italic tracking-wider text-stone-400">memory {String(index + 1).padStart(2, "0")}</span>
    </button>
  )
}
