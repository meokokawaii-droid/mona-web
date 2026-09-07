"use client"

import Image from "next/image"
import { useEffect, useState, type PointerEvent } from "react"

export const gallerySets = [
  [
    {
      src: "/images/gallery-beach-portrait.webp",
      alt: "海边旅行中的 Moe",
      objectPosition: "43% 48%",
    },
    {
      src: "/images/gallery-kyoto-steps.webp",
      alt: "京都山间神社的石阶与红灯笼",
      objectPosition: "50% 47%",
    },
    {
      src: "/images/gallery-tokyo-station.webp",
      alt: "阳光下的东京街区车站",
      objectPosition: "50% 52%",
    },
  ],
  [
    {
      src: "/images/gallery-lakeside-sunset.webp",
      alt: "荷叶与城市天际线之间的湖畔落日",
      objectPosition: "50% 50%",
    },
    {
      src: "/images/gallery-mountain-window.webp",
      alt: "旅途中窗外掠过的夏日山景",
      objectPosition: "50% 52%",
    },
    {
      src: "/images/gallery-summer-garden.webp",
      alt: "阳光穿过树叶的夏日庭园",
      objectPosition: "50% 46%",
    },
  ],
]

export function PhotoGallery() {
  const [activeSet, setActiveSet] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = window.setInterval(() => {
      setActiveSet((current) => (current + 1) % gallerySets.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2

    event.currentTarget.style.setProperty("--gallery-x", `${x * 5}px`)
    event.currentTarget.style.setProperty("--gallery-y", `${y * 5}px`)
  }

  const resetPointer = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--gallery-x", "0px")
    event.currentTarget.style.setProperty("--gallery-y", "0px")
    setIsPaused(false)
  }

  return (
    <section className="py-2">
      <h2 className="mb-6 text-center font-serif text-2xl tracking-[-0.02em] text-stone-700 sm:text-3xl">
        Gallery
      </h2>

      <div
        className="grid grid-cols-6 grid-rows-2 gap-3"
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
      >
        {gallerySets[activeSet].map((photo, index) => (
          <div
            key={`${activeSet}-${photo.src}`}
            className={`journal-gallery-frame group relative isolate overflow-hidden border border-white/70 bg-card shadow-[0_12px_28px_-18px_rgba(92,63,72,0.45)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_22px_42px_-24px_rgba(92,63,72,0.55)] active:scale-[0.985] ${
              index === 0
                ? "col-span-4 row-span-2 min-h-[300px] rounded-[24px]"
                : "col-span-2 min-h-[144px] rounded-[18px]"
            }`}
            onPointerEnter={() => setIsPaused(true)}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={index === 0 ? "(max-width: 640px) 60vw, 360px" : "(max-width: 640px) 30vw, 180px"}
              priority={activeSet === 0}
              className="journal-gallery-image object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
            <div className="journal-gallery-light absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/10 via-transparent to-white/5" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" aria-label="画廊分页">
        {gallerySets.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`查看第 ${index + 1} 组照片`}
            aria-current={activeSet === index ? "true" : undefined}
            onClick={() => setActiveSet(index)}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ${
              activeSet === index ? "w-6 bg-rose-300" : "w-1.5 bg-stone-300 hover:bg-rose-200"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-xs leading-6 tracking-wide text-stone-400">
        点击右下角小花按钮可更换展示主题=v=
      </p>
    </section>
  )
}
