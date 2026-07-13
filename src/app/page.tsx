"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { HeroAnimation } from "@/components/hero-animation";
import { MarqueeSection } from "@/components/marquee-section";
import { BentoGridSection } from "@/components/bento-grid";
import { ManifestoSection } from "@/components/manifesto-section";
import { useLanguage } from "@/components/language-context";
import { translations } from "@/lib/translations";

export default function Home() {
  const { t } = useLanguage();

  // Başka sayfadan /#hakkimda veya /#araclar ile gelindiğinde
  // animasyonsuz direkt section'a scroll yap, sonra URL'i temizle
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get("scrollTo");
    if (!scrollTo) return;

    // URL'den parametreyi temizle (geri tuşu / yenileme sorunları için)
    const cleanUrl = window.location.pathname;
    window.history.replaceState(null, "", cleanUrl);

    // DOM hazır olana kadar kısa bekle, sonra instant scroll
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 100);
      }
    };
    tryScroll();
  }, []);

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

        {/* Dynamic Hover Separator */}
        <div className="w-full flex justify-center py-4 bg-background group cursor-default">
          <div className="h-[2px] w-12 bg-zinc-800/80 rounded-full transition-all duration-700 ease-out group-hover:w-40 group-hover:bg-brand-red/60" />
        </div>

        {/* Bento Grid Architecture */}
        <BentoGridSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/10 bg-background/50">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Canpolat Kaya. {t(translations.footer.rights)}</p>
        </div>
      </footer>
    </>
  );
}
