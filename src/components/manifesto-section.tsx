import { ScrollReveal } from "./scroll-reveal";

export function ManifestoSection() {
  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-12 bg-background border-t border-border/5">
      <div className="max-w-4xl mx-auto text-center md:text-left flex flex-col gap-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-jakarta text-foreground leading-tight">
            Sadece Kod Yazmıyor, <br className="hidden md:block" /> 
            <span className="text-brand-red">Sistem İnşa Ediyorum.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-2xl text-zinc-400 font-sans font-light leading-relaxed max-w-3xl">
            Estetik arayüzleri, sağlam bir veritabanı altyapısıyla harmanlayarak dijital dünyada fark yaratan yapılar kuruyorum. Güçlü <span className="text-brand-red font-medium">PostgreSQL</span> mimarilerini ve kesintisiz <span className="text-brand-red font-medium">Full-Stack</span> süreçleri merkeze alıyor; <span className="text-brand-red font-medium">Yapay Zeka</span> entegrasyonları ve <span className="text-brand-red font-medium">Otonom Sistemler</span> ile manuel iş gücünü sıfıra indiriyorum.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
