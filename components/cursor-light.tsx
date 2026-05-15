'use client'
import { useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CursorLight() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // 使用 Motion Value 来追踪位置
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // 使用 Spring 让跟随更丝滑，带有物理弹性
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // 计算旋转角度（根据鼠标移动方向产生轻微倾斜）
  const [rotate, setRotate] = useState(0)

  useEffect(() => {
    let lastX = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      // 根据移动距离简单计算旋转（模拟飘动）
      const deltaX = e.clientX - lastX
      setRotate(deltaX * 0.2) 
      lastX = e.clientX
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (['A', 'BUTTON', 'IMG'].includes(target.tagName) || target.closest('.group')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      // 移除 flex 布局，直接让容器覆盖全屏
    >
      <motion.div
        style={{ 
          x, 
          y, 
          left: 0, 
          top: 0, 
          position: 'fixed' 
        }}
        className="flex items-center justify-center"
      >
        {/* 1. 底层的淡粉色光晕 */}
        <motion.div
          className="absolute rounded-full"
          animate={{
            width: isHovering ? 120 : 60,
            height: isHovering ? 120 : 60,
            opacity: isHovering ? 0.6 : 0.3,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(244,114,182,0.2) 0%, rgba(244,114,182,0) 70%)',
            filter: 'blur(15px)',
            // 确保偏移中心在鼠标尖尖上
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* 2. 极简蝴蝶结图标 */}
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : (isHovering ? 1.4 : 1),
            rotate: rotate, 
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-pink-300/70"
          // 这里同样需要 translate(-50%, -50%) 来保证蝴蝶结中心点对准坐标
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 12c-2-3-6-3-8-1s2 5 8 1c6-4 10-4 8-1s-6 2-8 1Z" />
            <path d="M12 12v6c0 2-2 3-3 1s1-4 3-1c2-3 4 1 3 1s-3 1-3-1Z" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}