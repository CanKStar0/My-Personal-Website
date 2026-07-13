"use client";

import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

interface Tech {
  name: string;
  icon: string;
  invert?: boolean; // next.js & playwright icons need invert in dark mode
}

const FRONTEND: Tech[] = [
  { name: "TypeScript", icon: `${CDN}/typescript/typescript-original.svg` },
  { name: "React", icon: `${CDN}/react/react-original.svg` },
  { name: "Next.js", icon: `${CDN}/nextjs/nextjs-original.svg`, invert: true },
  { name: "Tailwind CSS", icon: `${CDN}/tailwindcss/tailwindcss-original.svg` },
  { name: "Framer Motion", icon: `${CDN}/framermotion/framermotion-original.svg` },
];

const BACKEND: Tech[] = [
  { name: "Python", icon: `${CDN}/python/python-original.svg` },
  { name: "Node.js", icon: `${CDN}/nodejs/nodejs-original.svg` },
  { name: "FastAPI", icon: `${CDN}/fastapi/fastapi-original.svg` },
  { name: "Playwright", icon: `${CDN}/playwright/playwright-original.svg` },
  { name: "Redis", icon: `${CDN}/redis/redis-original.svg` },
];

const DATA: Tech[] = [
  { name: "PostgreSQL", icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: "MongoDB", icon: `${CDN}/mongodb/mongodb-original.svg` },
  { name: "MySQL", icon: `${CDN}/mysql/mysql-original.svg` },
  { name: "Supabase", icon: `${CDN}/supabase/supabase-original.svg` },
];

/** Frontend / Backend: Icons stacked vertically, name appears as tooltip on hover */
function IconStack({ techs }: { techs: Tech[] }) {
  return (
    <div className="flex flex-col gap-6 flex-1 items-center justify-center py-4">
      {techs.map((tech) => (
        <div key={tech.name} className="relative group/item flex items-center justify-center cursor-default">
          {/* Icon */}
          <div className="w-10 h-10 relative flex items-center justify-center transition-transform duration-300 group-hover/item:scale-125">
            <img
              src={tech.icon}
              alt={tech.name}
              className={`w-full h-full object-contain ${tech.invert ? "dark:invert" : ""}`}
            />
          </div>
          {/* Tooltip */}
          <span className="absolute left-full ml-4 opacity-0 group-hover/item:opacity-100 transition-all duration-300 -translate-x-2 group-hover/item:translate-x-0 text-sm font-medium font-sans text-foreground/90 whitespace-nowrap pointer-events-none bg-background/95 px-3 py-1.5 rounded-lg border border-border/60 shadow-sm backdrop-blur-md z-20">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Data card: Icons on top, names below */
function IconGrid({ techs }: { techs: Tech[] }) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-8 sm:gap-10 opacity-90 group-hover:opacity-100 transition-opacity mt-6 lg:mt-0">
      {techs.map((tech) => (
        <div key={tech.name} className="flex flex-col items-center gap-3 group/item cursor-default">
          <div className="w-10 h-10 relative transition-transform duration-300 group-hover/item:scale-110">
            <img
              src={tech.icon}
              alt={tech.name}
              className={`w-full h-full object-contain ${tech.invert ? "dark:invert" : ""}`}
            />
          </div>
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 group-hover/item:text-brand-red transition-colors duration-300 whitespace-nowrap">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function BentoGridSection() {
  const { t } = useLanguage();

  return (
    <section id="araclar" className="relative w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Card 1: AI & Otomasyon (2 kolon) */}
          <ScrollReveal delay={0} className="md:col-span-2 lg:col-span-2 group">
            <div className="relative h-full p-8 md:p-10 rounded-3xl border border-zinc-300/80 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/40 hover:border-brand-red/50 dark:hover:border-red-900/60 hover:bg-red-50/30 dark:hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold font-jakarta text-foreground mb-4">
                  {t(translations.bento.aiTitle)}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-sans font-light leading-relaxed">
                  {t(translations.bento.aiDesc)}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Frontend */}
          <ScrollReveal delay={0.1} className="md:col-span-1 lg:col-span-1 group">
            <div className="h-full p-8 rounded-3xl border border-zinc-300/80 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/40 hover:border-brand-red/50 dark:hover:border-red-900/60 hover:bg-red-50/30 dark:hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col min-h-[300px]">
              <h3 className="text-xl font-bold font-jakarta text-foreground mb-2 text-center">
                {t(translations.bento.frontendTitle)}
              </h3>
              <IconStack techs={FRONTEND} />
            </div>
          </ScrollReveal>

          {/* Card 3: Backend */}
          <ScrollReveal delay={0.2} className="md:col-span-1 lg:col-span-1 group">
            <div className="h-full p-8 rounded-3xl border border-zinc-300/80 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/40 hover:border-brand-red/50 dark:hover:border-red-900/60 hover:bg-red-50/30 dark:hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col min-h-[300px]">
              <h3 className="text-xl font-bold font-jakarta text-foreground mb-2 text-center">
                {t(translations.bento.backendTitle)}
              </h3>
              <IconStack techs={BACKEND} />
            </div>
          </ScrollReveal>

          {/* Card 4: Veri & Altyapı (4 kolon) */}
          <ScrollReveal delay={0.3} className="md:col-span-2 lg:col-span-4 group">
            <div className="h-full p-8 md:p-10 rounded-3xl border border-zinc-300/80 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/40 hover:border-brand-red/50 dark:hover:border-red-900/60 hover:bg-red-50/30 dark:hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <h3 className="text-2xl md:text-3xl font-bold font-jakarta text-foreground mb-4">
                    {t(translations.bento.dataTitle)}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-sans font-light leading-relaxed">
                    {t(translations.bento.dataDesc)}
                  </p>
                </div>
                <IconGrid techs={DATA} />
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

