import { Navbar } from "@/components/navbar";
import { HeroAnimation } from "@/components/hero-animation";
import { MarqueeSection } from "@/components/marquee-section";
import { BentoGridSection } from "@/components/bento-grid";
import { ManifestoSection } from "@/components/manifesto-section";
import { HomeServicesSection } from "@/components/home-services-section";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { ScrollToQuery } from "@/components/scroll-to-query";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/site";
import type { Locale } from "@/lib/translations";

export function HomeContent({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";

  return (
    <>
      <ScrollToQuery />
      <JsonLd data={[
        {
          "@context": "https://schema.org", "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Canpolat Kaya", url: SITE_URL,
          jobTitle: "Full-Stack Developer", sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
          knowsAbout: isEnglish
            ? ["Custom Software Development", "Web Scraping", "AI Automation", "API Development", "Next.js"]
            : ["Özel Yazılım Geliştirme", "Web Scraping", "Yapay Zekâ Otomasyonu", "API Geliştirme", "Next.js"],
        },
        {
          "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Canpolat Kaya",
          url: SITE_URL, inLanguage: ["tr", "en"], author: { "@id": `${SITE_URL}/#person` },
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
