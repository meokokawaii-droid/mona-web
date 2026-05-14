"use client"

import { useState } from "react"
import { Play, FileText, ChevronRight } from "lucide-react"

const creativeItems: {
  type: "video" | "writing"
  title: string
  description: string
  link: string
}[] = [
  {
    type: "video",
    title: "精神流民",
    description: "大隐于市",
    link: "#",
  },
  {
    type: "writing",
    title: "吃人者记",
    description: "吃人就是一种顺其自然的规则；一种安居乐业的诅咒 ",
    link: "/writing/cannibalism",
  },
  {
    type: "writing",
    title: "死",
    description: "当活着的时候，有人说：又一个幸福的人出生了...",
    link: "/writing/life-and-death",
  },
  {
    type: "writing",
    title: "此心安处是吾乡",
    description: "二十二岁，终于和我厌弃的一切达成了一种微妙的认同。",
    link: "/writing/inner-peace",
  },
  // ✨ 在这里加上这一段：
  {
    type: "writing",
    title: "刺穿",
    description: "杀死那个所谓评价的体系。为何任何目光都将要给予审判的权利？",
    link: "/writing/judgement",
  }, 
  {
    type: "writing",
    title: "不是我",
    description: "那些杀不死我的也并没有让我变得强大。But that's not mine.",
    link: "/writing/not-mine",
  },
]

export function CreativeSection() {
  const [filter, setFilter] = useState<"all" | "video" | "writing">("all")

  const filteredItems = filter === "all" 
    ? creativeItems 
    : creativeItems.filter(item => item.type === filter)

  return (
    <section className="py-6">
      <h2 className="text-sm text-muted-foreground mb-6 text-center tracking-[0.3em] uppercase">
        Thoughts & Works
      </h2>

      {/* 筛选器 */}
      <div className="flex justify-center gap-2 mb-6">
        {[
          { key: "all", label: "All" },
          { key: "video", label: "Video" },
          { key: "writing", label: "Writing" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key as "all" | "video" | "writing")}
            className={`
              px-4 py-1.5 rounded-full text-xs tracking-wider transition-all
              ${filter === item.key
                ? "bg-foreground text-card"
                : "bg-card text-foreground border border-border hover:border-foreground"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 内容列表 */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-10 px-4">
            Video 与 Writing 条目可随后在代码里自行添加
          </p>
        ) : (
          filteredItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="group block bg-card/80 rounded-2xl p-4 border border-border hover:border-foreground/30 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`
                w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                ${item.type === "video"
                  ? "bg-primary/20 text-primary"
                  : "bg-accent/20 text-accent"
                }
              `}
                >
                  {item.type === "video" ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-medium mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-2" />
              </div>
            </a>
          ))
        )}
      </div>

      {/* 查看更多 */}
      <div className="text-center mt-6">
        <a 
          href="#" 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all works
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
