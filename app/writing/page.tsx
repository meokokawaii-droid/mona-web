'use client'

import { useState } from "react"
import { Eye, Mountain, MessageCircle, Feather, ChevronLeft } from "lucide-react"
import { allWritings } from "@/lib/writing-data"

// 四个分类各配一个简约图标：
// self（自我）→ Eye，呼应"看见自己"的主题
// homeland（乡土）→ Mountain，山村/故乡的意象
// dialogue（对话）→ MessageCircle，AI对话录
// philosophy（哲思）→ Feather，更轻、更抽象的哲学随笔
const filters = [
  { key: "all", label: "All" },
  { key: "self", label: "自我" },
  { key: "homeland", label: "乡土" },
  { key: "dialogue", label: "对话" },
  { key: "philosophy", label: "哲思" },
] as const

// 每个分类对应的图标 + 配色，集中管理，方便以后调整
const categoryStyles = {
  self: { icon: Eye, bg: "bg-accent/20", text: "text-accent" },
  homeland: { icon: Mountain, bg: "bg-[#A8B89A]/20", text: "text-[#7A8B77]" },
  dialogue: { icon: MessageCircle, bg: "bg-primary/15", text: "text-primary" },
  philosophy: { icon: Feather, bg: "bg-[#C5A059]/15", text: "text-[#C5A059]" },
} as const

export default function WritingPage() {
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]["key"]>("all")

  const filteredWritings = activeFilter === "all"
    ? allWritings
    : allWritings.filter(item => item.category === activeFilter)

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 min-h-screen select-none">
      {/* 返回主页 */}
      <div className="mb-10">
        <a 
          href="/" 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>

      <h1 className="text-2xl font-serif italic mb-2 text-foreground font-medium">
        All Writings
      </h1>
      <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase mb-8">
        Collected Thoughts & Essays
      </p>

      {/* 分类筛选标签 */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`
              px-4 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300
              ${activeFilter === f.key
                ? "bg-foreground text-background font-medium"
                : "bg-card text-muted-foreground border border-border hover:border-foreground/40 hover:text-foreground"
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 渲染筛选后的文章列表 */}
      <div className="space-y-4">
        {filteredWritings.map((item, idx) => {
          const style = categoryStyles[item.category]
          const Icon = style.icon

          return (
            <a
              key={idx}
              href={item.link}
              className="group block bg-card/80 rounded-2xl p-5 border border-border hover:border-foreground/30 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${style.bg} ${style.text}`}>
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-medium mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                    {item.title}
                    {item.category === "dialogue" && (
                      <span className="text-[9px] font-normal tracking-wider text-muted-foreground/50 normal-case border border-border/60 rounded-full px-1.5 py-0.5">
                        AI对话录
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </main>
  )
}
