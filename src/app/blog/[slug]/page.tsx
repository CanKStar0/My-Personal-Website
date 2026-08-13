import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    inLanguage: "tr-TR",
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <article className="mx-auto max-w-4xl">
          <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />
          <header className="border-b border-border/60 pb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">{post.category}</p>
            <h1 className="mt-5 font-jakarta text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.08]">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-lg font-light leading-8 text-muted-foreground">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"><time dateTime={post.publishedAt}>13 Ağustos 2026</time><span aria-hidden="true">•</span><span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readingTime}</span></div>
          </header>

          <div className="space-y-14 py-14">
            {post.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-jakarta text-2xl font-bold text-foreground md:text-3xl">{section.title}</h2>
                <div className="mt-5 space-y-5 text-base font-light leading-8 text-muted-foreground">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.items && <ul className="mt-6 space-y-3 border-l-2 border-brand-red/40 pl-5 text-muted-foreground">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
              </section>
            ))}
          </div>

          <aside className="rounded-3xl border border-brand-red/20 bg-brand-red/[0.04] p-7 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Uygulama desteği</p>
            <h2 className="mt-3 font-jakarta text-2xl font-bold text-foreground">Bu konuyu çalışan bir sisteme dönüştürün.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">İhtiyacınız öğrenmekten öte üretim ortamında güvenilir bir çözüm kurmaksa, ilgili hizmet yaklaşımını ve proje kanıtlarını inceleyin.</p>
            <TrackedLink eventName="blog_to_service_click" eventParams={{ article: post.slug }} href={post.serviceHref} className="mt-6 inline-flex items-center gap-2 font-semibold text-foreground hover:text-brand-red">{post.serviceAnchor} <ArrowRight className="h-4 w-4" /></TrackedLink>
          </aside>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
