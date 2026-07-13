"use client";

import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";

export function ManifestoSection() {
  const { t } = useLanguage();

  return (
    <section id="hakkimda" className="w-full py-24 md:py-32 px-6 md:px-12 bg-background border-t border-border/5 scroll-mt-16">
      <div className="max-w-4xl mx-auto text-center md:text-left flex flex-col gap-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-jakarta text-foreground leading-tight">
            {t(translations.manifesto.headingPart1)} <br className="hidden md:block" /> 
            <span className="text-brand-red">{t(translations.manifesto.headingPart2)}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-4xl mx-auto md:mx-0">
            {t(translations.manifesto.description).split(/<vision>|<\/vision>|<highlight>|<\/highlight>/).map((part, index) => {
              // Index pattern: 0=normal, 1=vision, 2=normal, 3=highlight, 4=normal, 5=highlight, 6=normal
              if (index === 1) {
                return <span key={index} className="text-red-500 font-medium">{part}</span>;
              }
              if (index === 3 || index === 5) {
                return <span key={index} className="text-red-500 font-medium">{part}</span>;
              }
              return <span key={index}>{part}</span>;
            })}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
