import { Navbar } from "@/components/navbar";
import { HeroAnimation } from "@/components/hero-animation";
import { MarqueeSection } from "@/components/marquee-section";
import { BentoGridSection } from "@/components/bento-grid";
import { ManifestoSection } from "@/components/manifesto-section";
import { TechStackSection } from "@/components/tech-stack-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full">
          <HeroAnimation />
        </section>

        {/* Competencies Ticker */}
        <MarqueeSection />

        {/* Engineering Manifesto */}
        <ManifestoSection />

        {/* Bento Grid Architecture */}
        <BentoGridSection />

        {/* Tech Stack */}
        <TechStackSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/10 bg-background/50">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Canpolat Kaya. Tüm Hakları Saklıdır.</p>

        </div>
      </footer>
    </>
  );
}
