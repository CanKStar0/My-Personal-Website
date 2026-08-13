import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { createMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata: Metadata = createMetadata({
  title: "Yazılım Geliştirme Hizmetleri",
  description: "Özel yazılım, web scraping, yapay zekâ otomasyonu, API ve Next.js geliştirme hizmetlerini gerçek proje örnekleriyle inceleyin.",
  path: "/hizmetler",
});

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Hizmetler", href: "/hizmetler" }]} />
          <header className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">Çözüm alanları</p>
            <h1 className="mt-5 font-jakarta text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">Fikri, çalışan ve sürdürülebilir bir sisteme dönüştüren hizmetler.</h1>
            <p className="mt-7 max-w-3xl text-base font-light leading-8 text-muted-foreground md:text-lg">Her hizmet ayrı bir teknoloji listesi değil, belirli bir iş problemini çözen uçtan uca yaklaşım sunar. Gerektiğinde bu alanlar tek bir özel yazılım projesinde birlikte çalışır.</p>
          </header>

          <section aria-labelledby="services-heading" className="mt-16 grid gap-5 md:grid-cols-2">
            <h2 id="services-heading" className="sr-only">Yazılım geliştirme hizmetleri</h2>
            {services.map((service, index) => (
              <Link key={service.slug} href={`/hizmetler/${service.slug}`} className={`group rounded-3xl border border-border/70 bg-card/40 p-7 transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:bg-brand-red/[0.03] md:p-9 ${index === 0 ? "md:col-span-2" : ""}`}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">{service.eyebrow}</p>
                <h2 className="mt-4 font-jakarta text-2xl font-bold text-foreground md:text-3xl">{service.shortTitle}</h2>
                <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{service.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-brand-red">Hizmeti inceleyin <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </section>

          <section className="mt-20 rounded-3xl border border-border/70 bg-zinc-950 p-8 text-white md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">Nasıl ilerliyoruz?</p>
            <h2 className="mt-4 font-jakarta text-3xl font-bold">Analiz → Mimari → Geliştirme → Test → Yayın → İyileştirme</h2>
            <p className="mt-5 max-w-3xl leading-7 text-zinc-400">İlk görüşmede çözüm dayatmak yerine problemi, mevcut sistemleri ve başarı ölçütünü netleştiririz. Böylece teknoloji seçimi iş hedefinin önüne geçmez.</p>
            <Link href="/iletisim" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-zinc-950">Projenizi değerlendirelim <ArrowRight className="h-4 w-4" /></Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

