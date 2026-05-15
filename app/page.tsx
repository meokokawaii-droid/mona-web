'use client' // 必须加在第一行，开启点击交互

import { useState } from "react" 
import { PolkaDotBackground } from "@/components/polka-dot-background"
import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { PhotoGallery } from "@/components/photo-gallery"
import { SkillsSection } from "@/components/skills-section"
import { CreativeSection } from "@/components/creative-section"
import { Footer } from "@/components/footer"
import { Wishlist } from "@/components/wishlist/wishlist" 
import { CursorLight } from "@/components/cursor-light"
// 1. 引入柔柔的彩蛋组件
import { MeowEcho } from "@/components/meow-echo"

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <>
      {/* 2. 蝴蝶结萤火虫光标 */}
      <CursorLight />

      <PolkaDotBackground>
        <main className="py-8 px-4">
          <div className="mx-auto max-w-2xl">
            <div className="bg-white/50 backdrop-blur-lg p-8 md:p-10 rounded-[40px_15px_60px_20px] border-l-2 border-b-2 border-dashed border-pink-100 shadow-none">
              <Header />
              <AboutSection />
              <PhotoGallery />
              <SkillsSection />
              
              <CreativeSection onOpenVideo={() => setIsVideoOpen(true)} />

              <div className="mt-12">
                <Wishlist />
              </div>

              {/* ✨ 柔柔的专属角落：在愿望清单和页脚之间 */}
              <div className="mt-24 mb-12">
                <MeowEcho />
              </div>

              <Footer />
            </div>
          </div>
        </main>

        {/* 视频弹窗逻辑保持不变 */}
        {isVideoOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <div 
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src="/video/me.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
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
    </>
  )
}