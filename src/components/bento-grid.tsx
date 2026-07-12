import { ScrollReveal } from "./scroll-reveal";

export function BentoGridSection() {
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Mühendislik Vizyonu (Geniş - 2 Kolon) */}
          <ScrollReveal delay={0} className="md:col-span-2 group">
            <div className="h-full p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors duration-300">
              <h3 className="text-xl md:text-2xl font-bold font-jakarta text-foreground mb-4">
                Mühendislik Vizyonu
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-sans font-light leading-relaxed">
                Tokat Gaziosmanpaşa Üniversitesi&#39;nde başlayan yolculuğum, bugün yerel esnaftan büyük kurumsal firmalara kadar geniş bir yelpazede dijital çözümler üretmemi sağlıyor. Kod yazmayı sadece bir meslek değil, iş süreçlerini otonomlaştıran ve insanlara zaman kazandıran mimariler kurma sanatı olarak görüyorum. Saf estetik ve yüksek performansı her projenin merkezine alıyorum.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 2: Core Stack (Kare) */}
          <ScrollReveal delay={0.1} className="md:col-span-1 group">
            <div className="h-full p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors duration-300 flex flex-col">
              <h3 className="text-xl font-bold font-jakarta text-foreground mb-6">
                Core Stack
              </h3>
              <div className="flex flex-col gap-3 flex-1 justify-center">
                {["TypeScript", "JavaScript", "Python", "PostgreSQL"].map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red/70" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium font-sans text-sm tracking-wide">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: AI & Web Automation (Yatay Geniş - 3 Kolon) */}
          <ScrollReveal delay={0.2} className="md:col-span-3 group relative overflow-hidden">
            <div className="relative h-full p-8 md:p-12 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors duration-300 overflow-hidden">
              
              {/* Background Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px'
                }}
              />

              <div className="relative z-10 max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-bold font-jakarta text-foreground mb-4">
                  AI & Web Automation
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-sans font-light leading-relaxed">
                  İşletmelerin operasyonel yükünü hafifletmek için yapay zeka entegrasyonları ve web otomasyon botları (Playwright, Puppeteer) geliştiriyorum. Doğal dil işleme (NLP) algoritmalarıyla verileri analiz ediyor, manuel yapılan saatler süren işleri saniyeler içinde hatasız tamamlayan otonom sistemler inşa ediyorum.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
