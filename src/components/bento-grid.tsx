"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

interface Tech {
  name: string;
  icon: string;
  invert?: boolean; // next.js & playwright iconları light'ta görünmez
}

const FRONTEND: Tech[] = [
  { name: "TypeScript",    icon: `${CDN}/typescript/typescript-original.svg` },
  { name: "React",         icon: `${CDN}/react/react-original.svg` },
  { name: "Next.js",       icon: `${CDN}/nextjs/nextjs-original.svg`, invert: true },
  { name: "Tailwind CSS",  icon: `${CDN}/tailwindcss/tailwindcss-original.svg` },
  { name: "Framer Motion", icon: `${CDN}/framermotion/framermotion-original.svg` },
];

const BACKEND: Tech[] = [
  { name: "Python",   icon: `${CDN}/python/python-original.svg` },
  { name: "Node.js",  icon: `${CDN}/nodejs/nodejs-original.svg` },
  { name: "FastAPI",  icon: `${CDN}/fastapi/fastapi-original.svg` },
  { name: "Playwright", icon: `${CDN}/playwright/playwright-original.svg` },
  { name: "Redis",    icon: `${CDN}/redis/redis-original.svg` },
];

const DATA: Tech[] = [
  { name: "PostgreSQL",    icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: "MongoDB",       icon: `${CDN}/mongodb/mongodb-original.svg` },
  { name: "MySQL",         icon: `${CDN}/mysql/mysql-original.svg` },
  { name: "Supabase",      icon: `${CDN}/supabase/supabase-original.svg` },
  { name: "ElasticSearch", icon: `${CDN}/elasticsearch/elasticsearch-original.svg` },
];

/** Frontend / Backend: ikon dikey, hover'da isim sağa açılır */
function IconStack({ techs }: { techs: Tech[] }) {
  return (
    <div className="flex flex-col gap-4 flex-1 justify-center">
      {techs.map((tech) => (
        <div key={tech.name} className="relative flex items-center gap-3 group/item cursor-default">
          {/* Icon */}
          <div className="w-7 h-7 flex-shrink-0 relative">
            <Image
              src={tech.icon}
              alt={tech.name}
              fill
              className={`object-contain transition-all duration-200 ${
                tech.invert
                  ? "dark:invert group-hover/item:scale-110"
                  : "group-hover/item:scale-110"
              }`}
              unoptimized
            />
          </div>
          {/* İsim — hover'da görünür */}
          <span className="text-sm font-medium font-sans text-foreground/0 group-hover/item:text-foreground/80 transition-colors duration-200 whitespace-nowrap overflow-hidden max-w-0 group-hover/item:max-w-[160px] transition-[max-width] duration-300">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Data card: ikon üstte, isim altta */
function IconGrid({ techs }: { techs: Tech[] }) {
  return (
    <div className="flex flex-wrap gap-5 opacity-80 group-hover:opacity-100 transition-opacity">
      {techs.map((tech) => (
        <div key={tech.name} className="flex flex-col items-center gap-1.5 group/item cursor-default">
          <div className="w-8 h-8 relative transition-transform duration-200 group-hover/item:scale-110">
            <Image
              src={tech.icon}
              alt={tech.name}
              fill
              className={`object-contain ${tech.invert ? "dark:invert" : ""}`}
              unoptimized
            />
          </div>
          <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 group-hover/item:text-brand-red transition-colors duration-200 whitespace-nowrap">
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

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
            <div className="h-full p-8 rounded-3xl border border-zinc-300/80 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/40 hover:border-brand-red/50 dark:hover:border-red-900/60 hover:bg-red-50/30 dark:hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col min-h-[260px]">
              <h3 className="text-xl font-bold font-jakarta text-foreground mb-6">
                {t(translations.bento.frontendTitle)}
              </h3>
              <IconStack techs={FRONTEND} />
            </div>
          </ScrollReveal>

          {/* Card 3: Backend */}
          <ScrollReveal delay={0.2} className="md:col-span-1 lg:col-span-1 group">
            <div className="h-full p-8 rounded-3xl border border-zinc-300/80 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/40 hover:border-brand-red/50 dark:hover:border-red-900/60 hover:bg-red-50/30 dark:hover:bg-red-950/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col min-h-[260px]">
              <h3 className="text-xl font-bold font-jakarta text-foreground mb-6">
                {t(translations.bento.backendTitle)}
              </h3>
              <IconStack techs={BACKEND} />
            </div>
          </ScrollReveal>

          {/* Card 4: Veri & Altyapı (4 kolon) */}
          <ScrollReveal delay={0.3} className="md:col-span-3 lg:col-span-4 group">
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
