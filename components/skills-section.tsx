"use client"

import { useState } from "react"

type Subsection = { label: string; items: string[] }

type Category = {
  id: string
  label: string
  fullLabel: string
  color: string
  items: string[]
  subsection?: Subsection
}

const categories: Category[] = [
  {
    id: "language",
    label: "言",
    fullLabel: "语言",
    color: "from-primary to-secondary",
    items: [
      "方块秩序",
      "Crafting my own syntax",
      "新しい自分を、模索中",
    ],
  },
  {
    id: "study",
    label: "思",
    fullLabel: "领域",
    color: "from-accent to-primary",
    items: ["社会学", "政治学", "人文"],
    subsection: { label: "文学", items: ["鲁迅"] },
  },
  {
    id: "expression",
    label: "述",
    fullLabel: "表达",
    color: "from-secondary to-accent",
    items: ["写作", "影像", "一切自我表达的形式"],
  },
  {
    id: "aesthetic",
    label: "美",
    fullLabel: "审美",
    color: "from-primary to-accent",
    items: ["极繁主义", "贫民窟收藏家", "诗酒年华"],
  },
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)

  const activeData = categories.find((c) => c.id === activeCategory)

  return (
    <section className="py-2">
      <h2 className="mb-3 text-center font-serif text-3xl tracking-[-0.03em] text-stone-700">
        About Me
      </h2>

      <p className="mb-8 text-center text-[10px] uppercase tracking-[0.28em] text-pink-400">Things that make me, me</p>

      {/* 分类选择器 - 简约单字 */}
      <div className="mb-8 flex justify-center gap-3 sm:gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              relative h-11 w-11 rounded-full text-base font-bold transition-all duration-300 sm:h-12 sm:w-12
              ${activeCategory === cat.id
                ? "bg-gradient-to-br " + cat.color + " text-card shadow-[0_10px_24px_-12px_rgba(93,69,78,0.7)] scale-105"
                : "bg-white/65 text-stone-600 hover:bg-pink-50 border border-pink-100 hover:border-pink-300"
              }
            `}
            title={cat.fullLabel}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 内容展示区 */}
      {activeData && (
        <div 
          key={activeData.id}
          className="animate-in rounded-[24px] border border-pink-100 bg-white/55 p-5 shadow-[0_18px_42px_-30px_rgba(92,63,72,0.5)] backdrop-blur-sm fade-in slide-in-from-bottom-4 duration-300 sm:p-6"
        >
          <h3 className="mb-5 text-center font-serif text-xl tracking-wide text-stone-700">
            {activeData.fullLabel}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {activeData.items.map((item, idx) => (
              <span
                key={idx}
                className="cursor-default rounded-full border border-pink-100 bg-pink-50/55 px-4 py-2 text-sm text-stone-600 transition-all hover:border-pink-300 hover:text-pink-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {item}
              </span>
            ))}
          </div>

          {activeData.subsection && (
            <>
              <h4 className="text-center text-muted-foreground mt-6 mb-3 text-xs tracking-[0.25em] uppercase">
                {activeData.subsection.label}
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {activeData.subsection.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-muted/50 rounded-full text-foreground text-sm border border-border/50 hover:border-primary/50 transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  )
}
