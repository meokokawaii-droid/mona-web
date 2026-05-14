'use client' // 必须加在第一行，开启点击交互

import { useState } from "react" // 引入状态管理
import { PolkaDotBackground } from "@/components/polka-dot-background"
import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { PhotoGallery } from "@/components/photo-gallery"
import { SkillsSection } from "@/components/skills-section"
import { CreativeSection } from "@/components/creative-section"
import { Footer } from "@/components/footer"
// 1. 导入你的愿望清单组件
import { Wishlist } from "@/components/wishlist/wishlist" 

export default function HomePage() {
  // 控制背景窗格是否显示的“开关”
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <PolkaDotBackground>
      <main className="py-8 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="bg-white/50 backdrop-blur-lg p-8 md:p-10 rounded-[40px_15px_60px_20px] border-l-2 border-b-2 border-dashed border-pink-100 shadow-none">
            <Header />
            <AboutSection />
            <PhotoGallery />
            <SkillsSection />
            
            {/* ✨ 修复点：删掉了包裹在表层的 onClick div */}
            {/* 现在直接把控制开关传给组件，让组件内部去决定哪里可以点 */}
            <CreativeSection onOpenVideo={() => setIsVideoOpen(true)} />

            {/* 2. 将愿望清单放在这里，设置一个上间距 mt-12 让排版不拥挤 */}
            <div className="mt-12">
              <Wishlist />
            </div>

            <Footer />
          </div>
        </div>
      </main>

      {/* 极简背景窗格：只有点开时才渲染 */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setIsVideoOpen(false)} // 点击背景关闭
        >
          <div 
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()} // 点击视频区域不关闭
          >
            <video 
              src="/video/me.mp4" // 对应你放在 public/video 里的文件
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            />
            {/* 右上角关闭按钮 */}
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </PolkaDotBackground>
  )
}