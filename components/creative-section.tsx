"use client"

import { useState } from "react"
// 💡 引入了更具复古手账与独立创作感的 Film 和 Bookmark 图标
import { Film, Bookmark, ChevronRight } from "lucide-react"

// 定义接收的属性类型
interface CreativeSectionProps {
  onOpenVideo?: () => void
}

export const creativeItems: {
  type: "video" | "writing"
  title: string
  description: string
  link: string
  isNew?: boolean // 标记最近更新的内容，不写日期、不写"NEW"大字，只留一个极淡的提示位
}[] = [
  {
    type: "writing",
    title: "来处之前",
    description: "人没有选择自己的起点，却必须承担全部后果；关于出生、责任与被定义的人生。",
    link: "/writing/birth-consent",
    isNew: true,
  },
  {
    type: "video",
    title: "精神流民",
    description: "大隐于市",
    link: "/video/mevideo1.mp4",
  },
  {
    type: "writing",
    title: "安居之下",
    description: "关于顺从、代价，以及被默认继承的生活规则。",
    link: "/writing/cannibalism",
  },
  {
    type: "writing",
    title: "活着",
    description: "当活着的时候，有人说：又一个幸福的人出生了...",
    link: "/writing/life-and-death",
  },
  {
    type: "writing",
    title: "此心安处是吾乡",
    description: "二十二岁，终于和我厌弃的一切达成了一种微妙的认同。",
    link: "/writing/inner-peace",
  },
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

export function CreativeSection({ onOpenVideo }: CreativeSectionProps) {
  const [filter, setFilter] = useState<"all" | "video" | "writing">("all")

  const filteredItems = filter === "all" 
    ? creativeItems 
    : creativeItems.filter(item => item.type === filter)

  // 主页最多显示的作品数量
  const MAX_DISPLAY_COUNT = 3

  return (
    <section className="py-2">
      <h2 className="mb-3 text-center font-serif text-3xl tracking-[-0.03em] text-stone-700 sm:text-4xl">
      MOE'S LITTLE ARCHIVE
      </h2>

      <p className="mb-8 text-center text-[10px] uppercase tracking-[0.28em] text-pink-400">Notes · films · writing · little obsessions</p>

 {/* 筛选器 */}
<div className="mb-8 flex flex-wrap justify-center gap-2">
  {[
    { key: "all", label: "All" },
    { key: "video", label: "Video" },
    { key: "writing", label: "Writing" },
    { key: "wardrobe", label: "Wardrobe" },
  ].map((item) => (
    <button
      key={item.key}
      onClick={() => {
        if (item.key === "wardrobe") {
          window.location.href = "/wardrobe";
        } else {
          setFilter(item.key as "all" | "video" | "writing");
        }
      }}
      className={`
        min-h-10 px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300
        ${item.key === "wardrobe" 
          ? "bg-[#ffebf0] text-[#d95e82] border border-[#ffcad8] shadow-[0_8px_20px_-14px_rgba(230,108,141,0.55)] hover:-translate-y-0.5 hover:bg-[#ffdfe7] font-semibold"
          : filter === item.key
            ? "bg-stone-700 text-white font-semibold shadow-sm"
            : "bg-white/65 text-stone-600 border border-pink-100 hover:border-pink-300 hover:text-pink-500"
        }
      `}
    >
      {item.key === "wardrobe" && "🎀 "} {item.label} {item.key === "wardrobe" && " ✧"}
    </button>
  ))}
</div>
      {/* 内容列表 */}
      <div className="border-t border-pink-100/90">
        {filteredItems.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-10 px-4">
          </p>
        ) : (
          filteredItems.slice(0, MAX_DISPLAY_COUNT).map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={(e) => {
                if (item.type === "video" && onOpenVideo) {
                  e.preventDefault(); 
                  onOpenVideo();      
                }
              }}
              className="group block border-b border-pink-100/90 px-2 py-6 transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/45 hover:shadow-[0_16px_32px_-28px_rgba(102,72,81,0.65)] active:translate-y-0 sm:px-4"
            >
              <div className="flex items-start gap-5">
                {/* 保持系统统一的主题色背景 */}
                <div
                  className={`
                    relative w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0
                    ${item.type === "video"
                      ? "bg-primary/20 text-primary"
                      : "bg-accent/20 text-accent"
                    }
                  `}
                >
                  {/* ✨ 新图标替换：独立电影胶片 vs 复古书签带 */}
                  {item.type === "video" ? (
                    <Film className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}

                  {/* 最近更新标记：极小的呼吸点，藏在图标角落，
                      不写文字、不抢视觉，只在"最新"这一条上出现 */}
                  {item.isNew && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent/70 animate-pulse" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 flex items-center gap-1.5 font-serif text-xl font-medium tracking-[-0.01em] text-stone-700 transition-colors group-hover:text-pink-500 sm:text-2xl">
                    {item.title}
                    {/* 标题旁的极淡小字，比图标角落的点更明确一点，
                        但字号和颜色都压得很低，只有仔细看才会注意到 */}
                    {item.isNew && (
                      <span className="text-[9px] font-normal tracking-wider text-muted-foreground/50 normal-case">
                        · 最近
                      </span>
                    )}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-6 text-stone-500">
                    {item.description}
                  </p>
                </div>

                <ChevronRight className="mt-2 h-5 w-5 flex-shrink-0 text-pink-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-pink-500" />
              </div>
            </a>
          ))
        )}
      </div>

      {/* 查看更多按钮 */}
      {filteredItems.length > MAX_DISPLAY_COUNT && (
        <div className="mt-8 text-center">
          <a 
            href="/writing" 
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {/* 列表里有未在前3条展示的新内容时，按钮旁也露出同款呼吸点，
                提示"完整列表里有更新"，不写文字、只用一个极淡的点 */}
            {creativeItems.some(item => item.isNew) && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent/70 animate-pulse" />
            )}
            View all works ({filteredItems.length})
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </section>
  )
}
