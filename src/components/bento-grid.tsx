"use client";

import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";

export function BentoGridSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-20 px-6 md:px-12 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/10 via-zinc-950/50 to-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {/* Card 1: Yapay Zeka & Otomasyon (Geniş - 2 Kolon) */}
          <ScrollReveal delay={0} className="md:col-span-2 lg:col-span-2 group">
            <div className="relative h-full p-8 md:p-10 rounded-3xl border border-zinc-800/50 bg-zinc-900/40 hover:border-red-900/60 hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold font-jakarta text-foreground mb-4">
                  {t(translations.bento.aiTitle)}
                </h3>
                <p className="text-zinc-400 font-sans font-light leading-relaxed">
                  {t(translations.bento.aiDesc)}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Önyüz (Frontend) Mimarisi (Kare) */}
          <ScrollReveal delay={0.1} className="md:col-span-1 lg:col-span-1 group">
            <div className="h-full p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/40 hover:border-red-900/60 hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col">
              <h3 className="text-xl font-bold font-jakarta text-foreground mb-6">
                {t(translations.bento.frontendTitle)}
              </h3>
              <div className="flex flex-col gap-3 flex-1 justify-center">
                {["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"].map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:scale-125 transition-transform" />
                    <span className="text-zinc-300 font-medium font-sans text-sm tracking-wide">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Arkayüz (Backend) Gücü (Kare) */}
          <ScrollReveal delay={0.2} className="md:col-span-1 lg:col-span-1 group">
            <div className="h-full p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/40 hover:border-red-900/60 hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col">
              <h3 className="text-xl font-bold font-jakarta text-foreground mb-6">
                {t(translations.bento.backendTitle)}
              </h3>
              <div className="flex flex-col gap-3 flex-1 justify-center">
                {["Python", "Node.js", "REST API", "FastAPI", "Playwright", "Redis"].map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:scale-125 transition-transform" />
                    <span className="text-zinc-300 font-medium font-sans text-sm tracking-wide">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Veri & Altyapı (Yatay Geniş - 4 Kolon) */}
          <ScrollReveal delay={0.3} className="md:col-span-3 lg:col-span-4 group">
            <div className="h-full p-8 md:p-10 rounded-3xl border border-zinc-800/50 bg-zinc-900/40 hover:border-red-900/60 hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <h3 className="text-2xl md:text-3xl font-bold font-jakarta text-foreground mb-4">
                    {t(translations.bento.dataTitle)}
                  </h3>
                  <p className="text-zinc-400 font-sans font-light leading-relaxed">
                    {t(translations.bento.dataDesc)}
                  </p>
                </div>
                <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="px-6 py-3 rounded-2xl bg-zinc-950/50 border border-zinc-800/50 font-mono text-xs text-zinc-400">PostgreSQL</div>
                  <div className="px-6 py-3 rounded-2xl bg-zinc-950/50 border border-zinc-800/50 font-mono text-xs text-zinc-400">MongoDB</div>
                  <div className="px-6 py-3 rounded-2xl bg-zinc-950/50 border border-zinc-800/50 font-mono text-xs text-zinc-400">MySQL</div>
                  <div className="px-6 py-3 rounded-2xl bg-zinc-950/50 border border-zinc-800/50 font-mono text-xs text-zinc-400">Supabase</div>
                  <div className="px-6 py-3 rounded-2xl bg-zinc-950/50 border border-zinc-800/50 font-mono text-xs text-zinc-400">ElasticSearch</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
