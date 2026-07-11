import { Navbar } from "@/components/navbar";
import { HeroAnimation } from "@/components/hero-animation";
import { ProjectsSection } from "@/components/projects-section";
import { MarqueeSection } from "@/components/marquee-section";

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

        {/* Projeler Section */}
        <ProjectsSection />

        {/* Hakkımda Section */}
        <section id="hakkimda" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-border/10">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-jakarta">Hakkımda</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Yazılım geliştirme serüvenimde hem yerel esnafların dijitalleşme ihtiyaçlarını (kolay randevu sistemleri, SEO uyumlu kurumsal sayfalar) hem de kurumsal şirketlerin kompleks backend altyapılarını (PostgreSQL veritabanı optimizasyonları, asenkron kuyruk yönetimi vb.) çözmeye odaklanıyorum.
            </p>
          </div>
        </section>

        {/* Araçlar Section */}
        <section id="araclar" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-border/10">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-jakarta">Araçlar</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Günlük iş akışımı optimize eden teknolojiler: Next.js, React, Tailwind CSS, TypeScript, Node.js, Python, PostgreSQL ve Docker.
            </p>
          </div>
        </section>

        {/* İletişim Section */}
        <section id="iletisim" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-border/10">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-jakarta">İletişim</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Projeniz için profesyonel bir desteğe mi ihtiyacınız var? Veya sadece teknik detayları konuşmak mı istiyorsunuz? Benimle her zaman iletişime geçebilirsiniz.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/10 bg-background/50">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Canpolat Kaya. Tüm Hakları Saklıdır.</p>
          <p>Next.js & Tailwind v4 ile geliştirilmiştir.</p>
        </div>
      </footer>
    </>
  );
}
