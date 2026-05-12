"use client"

import { useMemo, useState, type CSSProperties } from "react"

type PatternKind = "dots" | "dots-offset" | "hearts"

type InsPreset = {
  name: string
  bg: string
  motif: string
  dotSize: number
  gap: number
  pattern: PatternKind
  /** 图案不透明度 0–1 */
  motifAlpha: number
}

function heartTileDataUri(color: string, alpha: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"><path fill="${color}" fill-opacity="${alpha}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`
}

function buildLayerStyle(p: InsPreset): CSSProperties {
  const { bg, motif, dotSize, gap, pattern, motifAlpha } = p
  const hex = motif.replace("#", "")
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const rgba = `rgba(${r},${g},${b},${motifAlpha})`

  if (pattern === "hearts") {
    const tile = heartTileDataUri(motif, motifAlpha)
    return {
      backgroundColor: bg,
      backgroundImage: `${tile}, ${tile}`,
      backgroundSize: `${gap}px ${gap}px`,
      backgroundPosition: `0 0, ${gap / 2}px ${gap / 2}px`,
    }
  }

  const dot = `${rgba} ${dotSize}px, transparent ${dotSize + 0.5}px`
  const layer = `radial-gradient(${dot})`

  if (pattern === "dots-offset") {
    return {
      backgroundColor: bg,
      backgroundImage: `${layer}, ${layer}`,
      backgroundSize: `${gap}px ${gap}px`,
      backgroundPosition: `0 0, ${gap / 2}px ${gap / 2}px`,
    }
  }

  return {
    backgroundColor: bg,
    backgroundImage: layer,
    backgroundSize: `${gap}px ${gap}px`,
  }
}

const presetBackgrounds: InsPreset[] = [
  {
    name: "雾粉波点",
    bg: "#b9a0a8",
    motif: "#ffffff",
    dotSize: 2,
    gap: 22,
    pattern: "dots",
    motifAlpha: 0.38,
  },
  {
    name: "豆沙爱心",
    bg: "#a88982",
    motif: "#fff5f5",
    dotSize: 2,
    gap: 48,
    pattern: "hearts",
    motifAlpha: 0.28,
  },
  {
    name: "燕麦拿铁",
    bg: "#c5a99a",
    motif: "#fffaf8",
    dotSize: 2.5,
    gap: 20,
    pattern: "dots-offset",
    motifAlpha: 0.35,
  },
  {
    name: "蜜桃苏打",
    bg: "#f5d0d8",
    motif: "#5c3d2e",
    dotSize: 2,
    gap: 18,
    pattern: "dots",
    motifAlpha: 0.22,
  },
  {
    name: "芋泥奶盖",
    bg: "#d4c4d6",
    motif: "#ffffff",
    dotSize: 2,
    gap: 24,
    pattern: "dots-offset",
    motifAlpha: 0.32,
  },
  {
    name: "薄荷生巧",
    bg: "#f0fdf4",
    motif: "#6b9080",
    dotSize: 3,
    gap: 20,
    pattern: "dots",
    motifAlpha: 0.28,
  },
]

interface PolkaDotBackgroundProps {
  children: React.ReactNode
}

export function PolkaDotBackground({ children }: PolkaDotBackgroundProps) {
  const [currentBg, setCurrentBg] = useState(presetBackgrounds[0])
  const [showPicker, setShowPicker] = useState(false)

  const bgStyle = useMemo(() => buildLayerStyle(currentBg), [currentBg])

  return (
    <div
      className="min-h-screen relative transition-[background-color] duration-700"
      style={bgStyle}
    >
      <button
        type="button"
        data-ins-skip-fx
        onClick={() => setShowPicker(!showPicker)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-card/95 shadow-lg border-2 border-accent flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300 backdrop-blur-sm"
        aria-label="更换背景"
      >
        <span className="text-2xl">✿</span>
      </button>

      {showPicker && (
        <div
          className="fixed bottom-24 right-6 z-50 bg-card/95 rounded-3xl shadow-xl border-2 border-accent p-5 w-72 backdrop-blur-md"
          data-ins-skip-fx
        >
          <p className="text-base font-bold text-foreground mb-4 text-center tracking-wide">
            ins 风底纹 · 任选
          </p>
          <div className="grid grid-cols-3 gap-3">
            {presetBackgrounds.map((preset) => (
              <button
                key={preset.name}
                type="button"
                data-ins-skip-fx
                onClick={() => {
                  setCurrentBg(preset)
                  setShowPicker(false)
                }}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all hover:scale-105 ${
                  currentBg.name === preset.name ? "ring-2 ring-accent bg-muted/80" : "hover:bg-muted/50"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-2xl border-2 border-accent/40 shadow-sm overflow-hidden"
                  style={buildLayerStyle({ ...preset, gap: 14, dotSize: Math.min(preset.dotSize, 2) })}
                />
                <span className="text-[11px] text-foreground font-medium text-center leading-tight">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {children}
    </div>
  )
}
