import { ScrollReveal } from "./scroll-reveal";

export function AboutSection() {
  return (
    <section id="hakkimda" className="w-full py-24 md:py-32 px-6 bg-background flex justify-center scroll-mt-16">
      <ScrollReveal className="max-w-4xl w-full flex flex-col items-center text-center">
        <span className="uppercase tracking-[0.3em] text-[10px] sm:text-xs font-semibold text-brand-red mb-4 select-none">
          Hakkımda
        </span>
        
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-jakarta text-foreground mb-8">
          Kimim Ben?
        </h2>

        <p className="text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 font-sans font-light leading-relaxed max-w-3xl">
          Tokat Gaziosmanpaşa Üniversitesi'nde Bilgisayar Programcılığı eğitimi alan, hem yerel esnafın dijitalleşme dertlerine pratik çözümler sunan hem de arka planda karmaşık veri mimarileri kuran bir Full-Stack Geliştiriciyim. Estetik tasarımları güçlü altyapılarla birleştirerek uçtan uca modern web deneyimleri inşa ediyorum.
        </p>
      </ScrollReveal>
    </section>
  );
}
