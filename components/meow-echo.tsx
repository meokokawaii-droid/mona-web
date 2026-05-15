'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function MeowEcho() {
  const [isHovered, setIsHovered] = useState(false)
  const [showShadow, setShowShadow] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isHovered) {
      timer = setTimeout(() => {
        setShowShadow(true)
      }, 2000)
    } else {
      setShowShadow(false)
    }
    return () => clearTimeout(timer)
  }, [isHovered])

  return (
    <div className="relative flex flex-col items-center py-12">
      {/* 1. 明显的大猫爪 - 交互中心 */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-none text-pink-300/40 hover:text-pink-400 transition-colors duration-500"
        whileHover={{ scale: 1.2 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          {/* 肉垫主圆 */}
          <circle cx="12" cy="15" r="5" />
          {/* 四个脚趾圆 */}
          <circle cx="7" cy="9" r="2.5" />
          <circle cx="10.5" cy="6" r="2.5" />
          <circle cx="15.5" cy="7" r="2.5" />
          <circle cx="19" cy="11" r="2.5" />
        </svg>
      </motion.div>

      {/* 2. 柔柔的可爱简笔画 */}
      <AnimatePresence>
        {showShadow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="absolute -top-32 pointer-events-none flex flex-col items-center"
          >
            {/* 手绘感简笔画猫咪 */}
            <motion.div
              animate={{ rotate: [ -5, 5, -5] }} // 轻轻晃动，显得活泼
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <svg width="80" height="80" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="6" className="text-pink-300">
                {/* 猫头 */}
                <path d="M60 110 C 60 70, 140 70, 140 110 C 140 150, 60 150, 60 110" strokeLinecap="round" />
                {/* 耳朵 */}
                <path d="M70 85 L 60 60 L 90 80" strokeLinejoin="round" />
                <path d="M130 85 L 140 60 L 110 80" strokeLinejoin="round" />
                {/* 眼睛 */}
                <circle cx="85" cy="110" r="4" fill="currentColor" />
                <circle cx="115" cy="110" r="4" fill="currentColor" />
                {/* 胡须 */}
                <path d="M50 110 L 30 105 M50 120 L 30 125" />
                <path d="M150 110 L 170 105 M150 120 L 170 125" />
                {/* 小嘴巴 */}
                <path d="M95 125 Q 100 130 105 125" />
              </svg>
            </motion.div>
            
            {/* 名字：柔柔 */}
            <div className="bg-pink-100/50 px-3 py-1 rounded-full mt-2">
              <span className="text-[12px] text-pink-400 font-bold tracking-[0.3em] ml-1">ROUROU</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 极淡的指引 */}
      {isHovered && !showShadow && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute mt-14 text-[10px] text-pink-300 font-medium tracking-widest"
        >
          摸摸爪印...
        </motion.span>
      )}
    </div>
  )
}