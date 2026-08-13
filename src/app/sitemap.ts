import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { blogPostsEn } from "@/lib/blog-en";
import { localizedRoutePairs } from "@/lib/i18n";
import { SITE_CONTENT_UPDATED_AT, SITE_URL } from "@/lib/site";

const noindexPaths = new Set([
  "/gizli-repo", "/canli-yok", "/en/private-repository", "/en/demo-unavailable",
]);

const articleDates = new Map<string, string>([
  ...blogPosts.map((post) => [`/blog/${post.slug}`, post.modifiedAt] as const),
  ...blogPostsEn.map((post) => [`/en/blog/${post.slug}`, post.modifiedAt] as const),
]);

function priorityFor(path: string) {
  if (path === "/" || path === "/en") return 1;
  if (path.includes("web-scraping")) return 0.9;
  if (path === "/hizmetler" || path === "/en/services") return 0.9;
  if (path.includes("/hizmetler/") || path.includes("/services/")) return 0.8;
  if (path === "/projeler" || path === "/en/projects") return 0.8;
  if (path === "/blog" || path === "/en/blog") return 0.7;
  return 0.6;
}

function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : new URL(path, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedRoutePairs
    .filter(({ tr, en }) => !noindexPaths.has(tr) && !noindexPaths.has(en))
    .flatMap(({ tr, en }) => {
      const languages = {
        tr: absoluteUrl(tr),
        en: absoluteUrl(en),
        "x-default": absoluteUrl(tr),
      };

      return [tr, en].map((path) => ({
        url: absoluteUrl(path),
        lastModified: articleDates.get(path) ?? SITE_CONTENT_UPDATED_AT,
        changeFrequency: path.includes("/blog") ? "monthly" as const : "monthly" as const,
        priority: priorityFor(path),
        alternates: { languages },
      }));
    });
}
