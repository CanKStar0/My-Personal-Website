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
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-4xl mx-auto md:mx-0">
            Kodlar herkes tarafından kopyalanabilir, ancak bir <span className="text-red-500 font-medium">vizyon</span> kopyalanamaz. Ben, karmaşık fikirleri alıp onları kusursuz işleyen dijital ürünlere dönüştüren bir mekanizmayım. Estetiği, <span className="text-red-500 font-medium">ağır mühendislikle</span> birleştiriyorum. Amacım sadece &quot;çalışan&quot; bir şeyler yapmak değil; piyasaya çıktığı an kendi başının çaresine bakabilen, güçlü ve <span className="text-red-500 font-medium">otonom sistemler</span> yaratmak.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
