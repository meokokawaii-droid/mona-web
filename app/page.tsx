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
          <div className="bg-card/60 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-xl border border-border/30">
            <Header />
            <AboutSection />
            <PhotoGallery />
            <SkillsSection />
            <CreativeSection />
            <TagsSection />
            <Footer />
          </div>
        </div>
      </main>
    </PolkaDotBackground>
  )
}
