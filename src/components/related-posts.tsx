import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Compass } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import type { Locale } from "@/lib/translations";
import { formatBlogDate } from "@/lib/date";

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  allPosts: BlogPost[];
  locale?: Locale;
}

export function RelatedPosts({
  currentSlug,
  currentCategory,
  allPosts,
  locale = "tr",
}: RelatedPostsProps) {
  const isEn = locale === "en";
  const basePath = isEn ? "/en/blog" : "/blog";

  // Find index of current post for Prev / Next navigation
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Filter out current post
  const candidates = allPosts.filter((p) => p.slug !== currentSlug);

  // Prioritize same category, then fill up to 3 with latest posts
  const sameCategoryPosts = candidates.filter((p) => p.category.toLowerCase() === currentCategory.toLowerCase());
  const otherPosts = candidates.filter((p) => p.category.toLowerCase() !== currentCategory.toLowerCase());

  const selectedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);

  return (
    <section aria-label={isEn ? "Related Articles & Navigation" : "İlgili Makaleler ve Gezinim"} className="my-14 space-y-12">
      {/* Prev / Next Flow Navigation */}
      {(prevPost || nextPost) && (
        <nav
          aria-label={isEn ? "Previous and next post" : "Önceki ve sonraki yazı"}
          className="grid grid-cols-1 gap-4 border-y border-border/60 py-6 sm:grid-cols-2"
        >
          {prevPost ? (
            <Link
              href={`${basePath}/${prevPost.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border/50 bg-card/40 p-5 transition-all hover:border-brand-red/40 hover:bg-brand-red/[0.03] dark:hover:border-rose-500/40"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-brand-red dark:group-hover:text-rose-400">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                {isEn ? "Previous Post" : "Önceki Yazı"}
              </span>
              <p className="mt-2.5 font-jakarta text-sm font-bold text-foreground line-clamp-2 group-hover:text-brand-red dark:group-hover:text-rose-400">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" aria-hidden="true" />
          )}

          {nextPost ? (
            <Link
              href={`${basePath}/${nextPost.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border/50 bg-card/40 p-5 text-right transition-all hover:border-brand-red/40 hover:bg-brand-red/[0.03] dark:hover:border-rose-500/40"
            >
              <span className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-brand-red dark:group-hover:text-rose-400">
                {isEn ? "Next Post" : "Sonraki Yazı"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <p className="mt-2.5 font-jakarta text-sm font-bold text-foreground line-clamp-2 group-hover:text-brand-red dark:group-hover:text-rose-400">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" aria-hidden="true" />
          )}
        </nav>
      )}

      {/* 3 Related Posts Cards (Topic Cluster) */}
      {selectedPosts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-brand-red dark:text-rose-400">
            <Compass className="h-5 w-5" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">
              {isEn ? "Related Technical Guides" : "İlgili Teknik Rehberler"}
            </h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {isEn
              ? "Deepen your understanding with these closely related production architectures and tutorials:"
              : "Bu mimariyle bağlantılı diğer üretim odaklı rehber ve vaka analizlerini inceleyin:"}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {selectedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`${basePath}/${post.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-border/70 bg-card/50 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/40 hover:bg-brand-red/[0.03] hover:shadow-lg hover:shadow-brand-red/5 dark:border-border/50 dark:hover:border-rose-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-brand-red/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-red dark:bg-rose-950/40 dark:text-rose-400">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h4 className="mt-3.5 font-jakarta text-base font-bold text-foreground line-clamp-2 transition-colors group-hover:text-brand-red dark:group-hover:text-rose-400">
                    {post.title}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4 text-xs">
                  <span className="text-muted-foreground">
                    {formatBlogDate(post.publishedAt, locale)}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-foreground transition-colors group-hover:text-brand-red dark:group-hover:text-rose-400">
                    {isEn ? "Read Guide" : "İncele"}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
