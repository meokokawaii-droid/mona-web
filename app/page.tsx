import { PolkaDotBackground } from "@/components/polka-dot-background"
import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { PhotoGallery } from "@/components/photo-gallery"
import { SkillsSection } from "@/components/skills-section"
import { CreativeSection } from "@/components/creative-section"
import { TagsSection } from "@/components/tags-section"
import { Footer } from "@/components/footer"
import { ContactEnvelope } from "@/components/contact-envelope"

export default function HomePage() {
  return (
    <PolkaDotBackground>
      <main className="py-8 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="paper-card paper-card--soft backdrop-blur-md p-8 md:p-10 shadow-xl">
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
      <ContactEnvelope />
    </PolkaDotBackground>
  )
}
