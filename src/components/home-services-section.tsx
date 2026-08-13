import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { servicesEn } from "@/lib/services-en";
import type { Locale } from "@/lib/translations";
import { localizedServicePath } from "@/lib/i18n";

export function HomeServicesSection({ locale = "tr" }: { locale?: Locale }) {
  const isEnglish = locale === "en";
  const items = isEnglish ? servicesEn : services;
  return (
    <section className="w-full border-t border-border/10 bg-background px-6 py-24 md:px-12" aria-labelledby="home-services-heading">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red dark:text-rose-400">{isEnglish ? "From expertise to solutions" : "Uzmanlıktan çözüme"}</p>
          <h2 id="home-services-heading" className="mt-4 font-jakarta text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">{isEnglish ? "I turn business problems into working digital systems." : "İş problemlerini çalışan dijital sistemlere dönüştürüyorum."}</h2>
          <p className="mt-5 leading-7 text-muted-foreground">{isEnglish ? "Data collection, AI automation, backend/API, and modern web development work together under a custom software approach." : "Özel yazılım ana yaklaşımı altında veri toplama, AI otomasyon, backend/API ve modern web geliştirme yetkinlikleri birlikte çalışır."}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <Link key={service.slug} href={localizedServicePath(service.slug, locale)} className="group rounded-2xl border border-border/70 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-brand-red/40">
              <h3 className="font-jakarta text-xl font-bold text-foreground group-hover:text-brand-red">{service.shortTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground">{isEnglish ? "Explore details" : "Detayları inceleyin"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold">
          <Link href={isEnglish ? "/en/services" : "/hizmetler"} className="inline-flex items-center gap-2 py-1 hover:text-brand-red">{isEnglish ? "All services" : "Tüm hizmetler"} <ArrowRight className="h-4 w-4" /></Link>
          <Link href={isEnglish ? "/en/blog" : "/blog"} className="inline-flex items-center gap-2 py-1 hover:text-brand-red">{isEnglish ? "Knowledge center" : "Bilgi merkezi"} <ArrowRight className="h-4 w-4" /></Link>
          <Link href={isEnglish ? "/en/contact" : "/iletisim"} className="inline-flex items-center gap-2 py-1 hover:text-brand-red">{isEnglish ? "Discuss your project" : "Projenizi konuşalım"} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
