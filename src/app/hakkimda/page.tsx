import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { CareerTimeline } from "@/components/career-timeline";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Hakkımda",
  description:
    "Full-Stack Developer Canpolat Kaya'nın özel yazılım, web scraping, AI otomasyon, backend ve modern web geliştirme yaklaşımı.",
  path: "/hakkimda",
  image: "/images/canpolat-kaya.jpg",
});

export default function AboutPage() {
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/images/canpolat-kaya.jpg`,
      jobTitle: "Full-Stack Developer & AI Automation Specialist",
      worksFor: {
        "@type": "Organization",
        name: "Dotcom Media (DCM)",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Tokat Gaziosmanpaşa Üniversitesi",
      },
      homeLocation: {
        "@type": "Place",
        name: "Fethiye, Muğla, Turkey",
      },
      description:
        "Özel yazılım, otonom web scraping, yapay zekâ otomasyonu, REST API ve Next.js geliştirme alanlarında uzmanlaşmış Full-Stack Developer.",
      sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
      knowsAbout: [
        "Web Scraping & Browser Automation",
        "Python & FastAPI",
        "Node.js & TypeScript",
        "Next.js & React 19",
        "Artificial Intelligence & LLM Integration",
        "PostgreSQL & MongoDB",
        "Redis Caching & Queue Management",
        "RESTful API Architecture",
      ],
    },
  };

  return (
    <>
      <JsonLd data={profileSchema} />
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <article className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Hakkımda", href: "/hakkimda" },
            ]}
          />
          <header className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red dark:text-rose-400">
                Canpolat Kaya / Full-Stack Developer
              </p>
              <h1 className="mt-5 font-jakarta text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Sadece kod değil, kendi başına çalışabilen sistemler inşa ediyorum.
              </h1>
              <p className="mt-7 max-w-3xl text-lg font-light leading-8 text-muted-foreground">
                Özel yazılım, veri toplama, yapay zekâ otomasyonu, backend ve modern web geliştirme alanlarında fikirleri çalışan dijital ürünlere dönüştürüyorum.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 overflow-hidden rounded-3xl border border-brand-red/30 bg-card/60 p-2 shadow-2xl shadow-brand-red/10 backdrop-blur-md">
                <Image
                  src="/images/canpolat-kaya.jpg"
                  alt="Canpolat Kaya - Full-Stack Developer & AI Automation Specialist"
                  fill
                  priority
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </header>

          {/* Animated Career & Education Timeline */}
          <CareerTimeline locale="tr" />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border border-border/70 bg-card/40 p-8">
              <h2 className="font-jakarta text-2xl font-bold">Ürün odaklı yaklaşım</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Teknolojiyi amaç değil araç olarak görüyorum. Önce kullanıcının ve işletmenin problemini, ardından sürdürülebilir mimariyi netleştiriyorum.
              </p>
            </section>
            <section className="rounded-3xl border border-border/70 bg-card/40 p-8">
              <h2 className="font-jakarta text-2xl font-bold">Uçtan uca teknik kapsam</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Next.js ve React arayüzlerinden Python/FastAPI veya Node.js backend’lerine; PostgreSQL, MongoDB ve Redis veri katmanlarına kadar sistemi bütün olarak ele alıyorum.
              </p>
            </section>
            <section className="rounded-3xl border border-border/70 bg-card/40 p-8 md:col-span-2">
              <h2 className="font-jakarta text-2xl font-bold">Deneyimi gerçek projelerle değerlendirin</h2>
              <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                Haber Portalı, web scraping ve veri sunum mimarisini; BIST AI ise veri işleme, backend ve analiz sistemlerini görünür hale getiriyor. Süslü iddialar yerine teknik kararları ve kullanılan bileşenleri inceleyebilirsiniz.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/projeler"
                  className="inline-flex items-center gap-2 font-semibold hover:text-brand-red"
                >
                  Projeleri inceleyin <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 font-semibold hover:text-brand-red"
                >
                  İletişime geçin <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
