import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-1 items-center justify-center bg-background px-6 py-20 text-center">
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-bold tracking-[0.3em] text-brand-red">404 / ROUTE_NOT_FOUND</p>
          <h1 className="mt-5 font-jakarta text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">Aradığınız sayfa bu sistemde yok.</h1>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-muted-foreground">Bağlantı değişmiş veya adres hatalı olabilir. Çözüm alanlarına, projelere ya da bilgi merkezine devam edebilirsiniz.</p>
          <nav aria-label="Faydalı bağlantılar" className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-background">Ana sayfa <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/hizmetler" className="rounded-full border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted">Hizmetler</Link>
            <Link href="/projeler" className="rounded-full border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted">Projeler</Link>
            <Link href="/blog" className="rounded-full border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted">Blog</Link>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

