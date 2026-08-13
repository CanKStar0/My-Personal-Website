import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { blogPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Yazılım ve Otomasyon Blogu",
  description: "Web scraping, yapay zekâ otomasyonu, API ve modern web geliştirme üzerine uygulamaya dönük teknik yazılar.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Blog", href: "/blog" }]} />
          <header className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red dark:text-rose-400">Bilgi merkezi</p>
            <h1 className="mt-5 font-jakarta text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">Teknik kararları anlaşılır ve uygulanabilir hale getiren notlar.</h1>
            <p className="mt-7 max-w-3xl text-base font-light leading-8 text-muted-foreground md:text-lg">Yüzeysel içerik kalabalığı yerine; gerçek sistemlerin nasıl tasarlandığını, hangi aracın ne zaman anlamlı olduğunu ve üretim ortamında nelerin önemli hale geldiğini anlatan yazılar.</p>
          </header>

          <section aria-labelledby="articles-heading" className="mt-16 grid gap-6 md:grid-cols-3">
            <h2 id="articles-heading" className="sr-only">Son yazılar</h2>
            {blogPosts.map((post) => (
              <article key={post.slug} className="flex h-full flex-col rounded-3xl border border-border/70 bg-card/40 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red dark:text-rose-400">{post.category}</p>
                <h2 className="mt-4 font-jakarta text-2xl font-bold leading-tight text-foreground"><Link href={`/blog/${post.slug}`} className="hover:text-brand-red">{post.title}</Link></h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{post.description}</p>
                <div className="mt-7 flex items-center justify-between border-t border-border/50 pt-5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readingTime}</span>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-brand-red">Oku <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
