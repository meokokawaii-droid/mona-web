"use client"

import { useState } from "react"

const keywords = [
  { word: "自由", meaning: "追求内心的解放" },
  { word: "表达", meaning: "存在的证明" },
  { word: "思辨", meaning: "质疑与探索" },
  { word: "审美", meaning: "感知生活的美" },
  { word: "独立", meaning: "精神的自主" },
  { word: "真实", meaning: "不被定义的自我" },
]

export function TagsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-6">
      <h2 className="text-sm text-muted-foreground mb-6 text-center tracking-[0.3em] uppercase">
        Keywords
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4">
        {keywords.map((item, idx) => (
          <div
            key={item.word}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              className={`
                paper-card paper-card--soft inline-block px-6 py-3 text-base font-medium
                text-foreground backdrop-blur-sm
                hover:border-primary hover:shadow-lg
                transition-all duration-300 cursor-default
                ${hoveredIndex === idx ? "scale-105 -translate-y-1" : ""}
              `}
            >
              {item.word}
            </span>
            
            {/* 悬停显示含义 */}
            <div
              className={`
                absolute -bottom-8 left-1/2 -translate-x-1/2 
                text-xs text-muted-foreground whitespace-nowrap
                transition-all duration-300
                ${hoveredIndex === idx ? "opacity-100" : "opacity-0"}
              `}
            >
              {item.meaning}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
