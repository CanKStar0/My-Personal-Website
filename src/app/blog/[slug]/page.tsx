import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, HelpCircle, Info, Lightbulb, AlertTriangle, Bookmark, CheckCircle2, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { CodeBlock } from "@/components/code-block";
import { blogPostBySlug, blogPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { TrackedLink } from "@/components/tracked-link";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    image: `/blog/${slug}/opengraph-image`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  if (!post) notFound();

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.modifiedAt,
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      author: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
      },
      inLanguage: "tr-TR",
    }
  ];

  if (post.faqs && post.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <>
      <JsonLd data={schemas} />
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <article className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <header className="border-b border-border/60 pb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red dark:text-rose-400">
              {post.category}
            </p>
            <h1 className="mt-5 font-jakarta text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-[1.15]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-light leading-8 text-muted-foreground">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>17 Ağustos 2026</time>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
          </header>

          {/* GEO / RAG BLUF Doğrudan Çözüm Özeti */}
          {post.directAnswer && (
            <section
              aria-label="Doğrudan Çözüm ve Özet"
              className="my-10 rounded-3xl border border-brand-red/30 bg-brand-red/[0.03] p-6 md:p-8 backdrop-blur-xs dark:border-red-900/40 dark:bg-red-950/20"
            >
              <div className="flex items-center gap-2 text-brand-red dark:text-rose-400">
                <Bookmark className="h-5 w-5" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Özet & Doğrudan Çözüm (TL;DR)</h2>
              </div>
              <p className="mt-3.5 text-base font-medium leading-relaxed text-foreground md:text-lg">
                {post.directAnswer}
              </p>
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="mt-6 border-t border-brand-red/15 pt-5 dark:border-red-900/30">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Önemli Çıkarımlar:</p>
                  <ul className="mt-3 space-y-2.5 text-sm text-foreground/90">
                    {post.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red dark:text-rose-400" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          <div className="space-y-12 py-12">
            {post.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-jakarta text-2xl font-bold text-foreground md:text-3xl">
                  {section.title}
                </h2>
                
                {section.callout && (
                  <div className="my-5 flex gap-3.5 rounded-2xl border border-brand-red/20 bg-brand-red/[0.03] p-4 text-sm text-foreground/90 dark:border-red-900/40 dark:bg-red-950/20">
                    {section.callout.type === "tip" && (
                      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    )}
                    {section.callout.type === "warning" && (
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                    )}
                    {(!section.callout.type || section.callout.type === "info") && (
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                    )}
                    <div>
                      {section.callout.title && (
                        <p className="font-semibold text-foreground">{section.callout.title}</p>
                      )}
                      <p className="mt-0.5 text-muted-foreground">{section.callout.text}</p>
                    </div>
                  </div>
                )}

                <div className="mt-4 space-y-4 text-base font-light leading-8 text-muted-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.codeSnippet && (
                  <CodeBlock
                    code={section.codeSnippet.code}
                    language={section.codeSnippet.language}
                    filename={section.codeSnippet.filename}
                  />
                )}

                {section.items && (
                  <ul className="mt-5 space-y-2.5 border-l-2 border-brand-red/40 pl-5 text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Sıkça Sorulan Sorular (FAQ) */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="my-12 rounded-3xl border border-border/80 bg-card/40 p-6 md:p-8">
              <div className="flex items-center gap-2 text-brand-red dark:text-rose-400">
                <HelpCircle className="h-5 w-5" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Sıkça Sorulan Sorular</h3>
              </div>
              <div className="mt-6 space-y-6">
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-border/40 pb-5 last:border-0 last:pb-0">
                    <h4 className="font-jakarta text-lg font-bold text-foreground">{faq.question}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Otoriter Kaynaklar ve Referanslar (GEO Cite Sources) */}
          {post.sourcesCited && post.sourcesCited.length > 0 && (
            <div className="my-10 rounded-3xl border border-border/80 bg-card/30 p-6 md:p-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ExternalLink className="h-4 w-4 text-brand-red dark:text-rose-400" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Doğrulanmış Kaynaklar ve Dokümantasyon</h3>
              </div>
              <ul className="mt-4 divide-y divide-border/40 text-sm">
                {post.sourcesCited.map((source, idx) => (
                  <li key={idx} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <span className="font-medium text-foreground">{source.name}</span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red hover:underline dark:text-rose-400"
                    >
                      Resmi Doküman <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <aside className="rounded-3xl border border-brand-red/20 bg-brand-red/[0.04] p-7 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red dark:text-rose-400">
              Uygulama desteği
            </p>
            <h2 className="mt-3 font-jakarta text-2xl font-bold text-foreground">
              Bu konuyu çalışan bir sisteme dönüştürün.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              İhtiyacınız öğrenmekten öte üretim ortamında güvenilir bir çözüm kurmaksa, ilgili hizmet yaklaşımını ve proje kanıtlarını inceleyin.
            </p>
            <TrackedLink
              eventName="blog_to_service_click"
              eventParams={{ article: post.slug }}
              href={post.serviceHref}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-foreground hover:text-brand-red"
            >
              {post.serviceAnchor} <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </aside>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
