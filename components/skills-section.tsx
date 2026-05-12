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
      "汉语：在方块字里走路",
      "English: finding the right words",
      "日本語、いま勉強中",
    ],
  },
  {
    id: "study",
    label: "思",
    fullLabel: "学术",
    color: "from-accent to-primary",
    items: ["社会学", "政治学", "人文批判"],
    subsection: { label: "专栏", items: ["鲁迅"] },
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
    <section className="py-8">
      <h2 className="text-sm text-muted-foreground mb-6 text-center tracking-[0.3em] uppercase">
        About Me
      </h2>

      {/* 分类选择器 - 简约单字 */}
      <div className="flex justify-center gap-6 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              relative w-12 h-12 rounded-full text-lg font-bold transition-all duration-300
              ${activeCategory === cat.id
                ? "bg-gradient-to-br " + cat.color + " text-card shadow-lg scale-110"
                : "bg-card text-foreground hover:bg-muted border border-dashed border-neutral-400/70 hover:border-primary"
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
          className="paper-card backdrop-blur-sm p-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <h3 className="text-center text-foreground mb-4 text-sm tracking-wider">
            {activeData.fullLabel}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {activeData.items.map((item, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-muted/50 rounded-full text-foreground text-sm border border-dashed border-neutral-400/60 hover:border-primary/50 transition-all cursor-default"
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
                    className="px-4 py-2 bg-muted/50 rounded-full text-foreground text-sm border border-dashed border-neutral-400/60 hover:border-primary/50 transition-all cursor-default"
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
