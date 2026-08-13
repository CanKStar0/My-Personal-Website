import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Hakkımda",
  description: "Full-Stack Developer Canpolat Kaya'nın özel yazılım, web scraping, AI otomasyon, backend ve modern web geliştirme yaklaşımı.",
  path: "/hakkimda",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <article className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Hakkımda", href: "/hakkimda" }]} />
          <header className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">Canpolat Kaya / Full-Stack Developer</p>
            <h1 className="mt-5 font-jakarta text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">Sadece kod değil, kendi başına çalışabilen sistemler inşa ediyorum.</h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-8 text-muted-foreground">Özel yazılım, veri toplama, yapay zekâ otomasyonu, backend ve modern web geliştirme alanlarında fikirleri çalışan dijital ürünlere dönüştürüyorum.</p>
          </header>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border border-border/70 bg-card/40 p-8"><h2 className="font-jakarta text-2xl font-bold">Ürün odaklı yaklaşım</h2><p className="mt-4 leading-7 text-muted-foreground">Teknolojiyi amaç değil araç olarak görüyorum. Önce kullanıcının ve işletmenin problemini, ardından sürdürülebilir mimariyi netleştiriyorum.</p></section>
            <section className="rounded-3xl border border-border/70 bg-card/40 p-8"><h2 className="font-jakarta text-2xl font-bold">Uçtan uca teknik kapsam</h2><p className="mt-4 leading-7 text-muted-foreground">Next.js ve React arayüzlerinden Python/FastAPI veya Node.js backend’lerine; PostgreSQL, MongoDB ve Redis veri katmanlarına kadar sistemi bütün olarak ele alıyorum.</p></section>
            <section className="rounded-3xl border border-border/70 bg-card/40 p-8 md:col-span-2"><h2 className="font-jakarta text-2xl font-bold">Deneyimi gerçek projelerle değerlendirin</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Haber Portalı, web scraping ve veri sunum mimarisini; BIST AI ise veri işleme, backend ve analiz sistemlerini görünür hale getiriyor. Süslü iddialar yerine teknik kararları ve kullanılan bileşenleri inceleyebilirsiniz.</p><div className="mt-6 flex flex-wrap gap-4"><Link href="/projeler" className="inline-flex items-center gap-2 font-semibold hover:text-brand-red">Projeleri inceleyin <ArrowRight className="h-4 w-4" /></Link><Link href="/iletisim" className="inline-flex items-center gap-2 font-semibold hover:text-brand-red">İletişime geçin <ArrowRight className="h-4 w-4" /></Link></div></section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
