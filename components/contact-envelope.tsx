"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Mail, MessageCircle, MessageSquare } from "lucide-react"

const WA = "https://wa.me/8617320932309"
const MAIL = "mailto:meokokawaii@gmail.com"
const WECHAT_ID = "miko33q33"

const item = {
  hidden: { scale: 0.5, opacity: 0, y: 14 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { delay: 0.07 * i, type: "spring" as const, stiffness: 400, damping: 26 },
  }),
  exit: { scale: 0.65, opacity: 0, y: 10, transition: { duration: 0.15 } },
}

export function ContactEnvelope() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const el = rootRef.current
      if (el && !el.contains(e.target as Node)) close()
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open, close])

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_ID)
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      ref={rootRef}
      className="fixed right-24 bottom-6 z-[55]"
      data-ins-skip-fx
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="row"
              className="absolute bottom-[3.35rem] flex items-center gap-2.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
            >
              <motion.a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                custom={0}
                variants={item}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[#b8c4b0] text-[#f6f7f4] shadow-md backdrop-blur-sm transition-transform hover:scale-105"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
              </motion.a>
              <motion.button
                type="button"
                custom={1}
                variants={item}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={() => void copyWechat()}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[#c9c2bb] text-[#f8f6f3] shadow-md backdrop-blur-sm transition-transform hover:scale-105"
                aria-label="复制微信号"
                title={`复制微信号：${WECHAT_ID}`}
              >
                <MessageSquare className="h-5 w-5" strokeWidth={1.75} />
              </motion.button>
              <motion.a
                href={MAIL}
                custom={2}
                variants={item}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[#b5bcc9] text-[#f5f7fa] shadow-md backdrop-blur-sm transition-transform hover:scale-105"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" strokeWidth={1.75} />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "关闭联系方式" : "打开联系方式"}
          whileTap={{ scale: 0.94 }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-neutral-400/60 bg-[#e8e4df]/90 text-[#7a756d] shadow-md backdrop-blur-md transition-colors hover:bg-[#ede9e4]"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 6h16v12H4z" />
            <path d="M4 8l8 6 8-6" />
          </svg>
        </motion.button>
      </div>
    </div>
  )
}
