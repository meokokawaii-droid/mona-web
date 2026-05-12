import { PolkaDotBackground } from "@/components/polka-dot-background"
import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { PhotoGallery } from "@/components/photo-gallery"
import { SkillsSection } from "@/components/skills-section"
import { CreativeSection } from "@/components/creative-section"
import { TagsSection } from "@/components/tags-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <PolkaDotBackground>
      <main className="py-8 px-4">
        <div className="mx-auto max-w-2xl">
        <div className="bg-white/50 backdrop-blur-lg p-8 md:p-10 rounded-[40px_15px_60px_20px] border-l-2 border-b-2 border-dashed border-pink-100 shadow-none">
            <Header />
            <AboutSection />
            <PhotoGallery />
            <SkillsSection />
            <CreativeSection />
            <Footer />
          </div>
        </div>
      </main>
    </PolkaDotBackground>
  )
}
