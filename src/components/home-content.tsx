"use client";

import { useLanguage } from "@/components/language-context";
import { Navbar } from "@/components/navbar";
import { HeroAnimation } from "@/components/hero-animation";
import { MarqueeSection } from "@/components/marquee-section";
import { ManifestoSection } from "@/components/manifesto-section";
import { BentoGridSection } from "@/components/bento-grid";
import { HomeServicesSection } from "@/components/home-services-section";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { ScrollToQuery } from "@/components/scroll-to-query";
import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

import type { Locale } from "@/lib/translations";

export function HomeContent({ locale: propLocale }: { locale?: Locale } = {}) {
  const { locale: contextLocale } = useLanguage();
  const locale = propLocale ?? contextLocale;
  const isEnglish = locale === "en";

  return (
    <>
      <ScrollToQuery />
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website-schema`,
          name: SITE_NAME,
          url: SITE_URL,
          publisher: { "@id": `${SITE_URL}/#person` },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/${isEnglish ? "en/" : ""}blog?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: "Canpolat Kaya",
          jobTitle: isEnglish ? "Full-Stack Developer & AI Automation Specialist" : "Full-Stack Developer & Yapay Zekâ Otomasyon Uzmanı",
          url: SITE_URL,
          image: `${SITE_URL}/images/canpolat-kaya.jpg`,
          sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
          description: isEnglish
            ? "Full-Stack Developer specializing in autonomous web scraping architectures, custom AI automations, scalable REST APIs, and Next.js applications."
            : "Özel yazılım, otonom web scraping, yapay zekâ otomasyonu, API ve Next.js geliştirme alanlarında uzmanlaşmış Full-Stack Developer.",
          knowsAbout: isEnglish
            ? [
                "Web Scraping",
                "AI Automation",
                "Large Language Models",
                "Next.js",
                "React",
                "TypeScript",
                "Python",
                "FastAPI",
                "REST API Architecture",
                "Playwright Automation",
                "Generative Engine Optimization (GEO)",
              ]
            : [
                "Web Scraping",
                "Yapay Zekâ Otomasyonu",
                "Büyük Dil Modelleri (LLM)",
                "Next.js",
                "React",
                "TypeScript",
                "Python",
                "FastAPI",
                "REST API Mimarisi",
                "Playwright Otomasyonu",
                "Generative Engine Optimization (GEO)",
              ],
        },
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#professionalservice`,
          name: "Canpolat Kaya Dev Services",
          url: SITE_URL,
          provider: { "@id": `${SITE_URL}/#person` },
          areaServed: "Global",
          inLanguage: ["tr", "en"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: isEnglish ? "Software & Automation Services" : "Yazılım ve Otomasyon Hizmetleri",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEnglish ? "Web Scraping Systems" : "Web Scraping Sistemleri",
                  url: `${SITE_URL}/hizmetler/web-scraping`,
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEnglish ? "AI Automation & Workflows" : "Yapay Zekâ Otomasyon Çözümleri",
                  url: `${SITE_URL}/hizmetler/yapay-zeka-otomasyon`,
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEnglish ? "Custom Software Development" : "Özel Yazılım Geliştirme",
                  url: `${SITE_URL}/hizmetler/ozel-yazilim-gelistirme`,
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEnglish ? "High-Performance API Development" : "API Geliştirme ve Entegrasyon",
                  url: `${SITE_URL}/hizmetler/api-gelistirme`,
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEnglish ? "Next.js Web Application Development" : "Next.js Web Geliştirme",
                  url: `${SITE_URL}/hizmetler/nextjs-gelistirme`,
                },
              },
            ],
          },
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
