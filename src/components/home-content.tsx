"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { HeroAnimation } from "@/components/hero-animation";
import { MarqueeSection } from "@/components/marquee-section";
import { BentoGridSection } from "@/components/bento-grid";
import { ManifestoSection } from "@/components/manifesto-section";
import { HomeServicesSection } from "@/components/home-services-section";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/site";
import type { Locale } from "@/lib/translations";

export function HomeContent({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get("scrollTo");
    if (!scrollTo) return;
    window.history.replaceState(null, "", window.location.pathname);
    const tryScroll = (attempts = 0) => {
      const element = document.getElementById(scrollTo);
      if (element) element.scrollIntoView({ behavior: "instant" });
      else if (attempts < 10) setTimeout(() => tryScroll(attempts + 1), 100);
    };
    tryScroll();
  }, []);

  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org", "@type": "Person", name: "Canpolat Kaya", url: SITE_URL,
          jobTitle: "Full-Stack Developer", sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
          knowsAbout: isEnglish
            ? ["Custom Software Development", "Web Scraping", "AI Automation", "API Development", "Next.js"]
            : ["Özel Yazılım Geliştirme", "Web Scraping", "Yapay Zekâ Otomasyonu", "API Geliştirme", "Next.js"],
        },
        {
          "@context": "https://schema.org", "@type": "WebSite", name: "Canpolat Kaya",
          url: isEnglish ? `${SITE_URL}/en` : SITE_URL, inLanguage: locale,
        },
      ]} />
      <Navbar />
      <main className="flex-1">
        <section className="w-full"><HeroAnimation /></section>
        <MarqueeSection />
        <ManifestoSection />
        <HomeServicesSection locale={locale} />
        <div className="group flex w-full cursor-default justify-center bg-background py-4"><div className="h-[2px] w-12 rounded-full bg-zinc-800/80 transition-all duration-700 ease-out group-hover:w-40 group-hover:bg-brand-red/60" /></div>
        <BentoGridSection />
      </main>
      <SiteFooter />
    </>
  );
}
