import type { Locale } from "@/lib/translations";

const routePairs = [
  ["/", "/en"],
  ["/hakkimda", "/en/about"],
  ["/hizmetler", "/en/services"],
  ["/hizmetler/ozel-yazilim-gelistirme", "/en/services/custom-software-development"],
  ["/hizmetler/web-scraping", "/en/services/web-scraping"],
  ["/hizmetler/yapay-zeka-otomasyon", "/en/services/ai-automation"],
  ["/hizmetler/api-gelistirme", "/en/services/api-development"],
  ["/hizmetler/nextjs-gelistirme", "/en/services/nextjs-development"],
  ["/projeler", "/en/projects"],
  ["/projeler/mybusinessboss", "/en/projects/mybusinessboss"],
  ["/projeler/free-api", "/en/projects/free-api"],
  ["/projeler/haber-portali", "/en/projects/haber-portali"],
  ["/projeler/bist-ai", "/en/projects/bist-ai"],
  ["/blog", "/en/blog"],
  ["/blog/web-scraping-nedir", "/en/blog/what-is-web-scraping"],
  ["/blog/ai-otomasyon-nedir", "/en/blog/what-is-ai-automation"],
  ["/blog/rest-api-nedir", "/en/blog/what-is-rest-api"],
  ["/iletisim", "/en/contact"],
  ["/gizli-repo", "/en/private-repository"],
  ["/canli-yok", "/en/demo-unavailable"],
] as const;

export const localizedRoutePairs = routePairs.map(([tr, en]) => ({ tr, en }));

const trToEn = new Map<string, string>(routePairs);
const enToTr = new Map<string, string>(routePairs.map(([tr, en]) => [en, tr]));

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
}

export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  if (targetLocale === "en") {
    const direct = trToEn.get(pathname);
    if (direct) return direct;
    if (pathname.startsWith("/projeler/")) return `/en/projects/${pathname.slice(10)}`;
    if (pathname.startsWith("/hizmetler/")) return `/en/services/${pathname.slice(11)}`;
    if (pathname.startsWith("/blog/")) return `/en/blog/${pathname.slice(6)}`;
    if (pathname === "/projeler") return "/en/projects";
    if (pathname === "/hizmetler") return "/en/services";
    if (pathname === "/hakkimda") return "/en/about";
    if (pathname === "/iletisim") return "/en/contact";
    if (pathname.startsWith("/en")) return pathname;
    return `/en${pathname === "/" ? "" : pathname}`;
  } else {
    const direct = enToTr.get(pathname);
    if (direct) return direct;
    if (pathname.startsWith("/en/projects/")) return `/projeler/${pathname.slice(13)}`;
    if (pathname.startsWith("/en/services/")) return `/hizmetler/${pathname.slice(13)}`;
    if (pathname.startsWith("/en/blog/")) return `/blog/${pathname.slice(9)}`;
    if (pathname === "/en/projects") return "/projeler";
    if (pathname === "/en/services") return "/hizmetler";
    if (pathname === "/en/about") return "/hakkimda";
    if (pathname === "/en/contact") return "/iletisim";
    if (pathname === "/en") return "/";
    if (pathname.startsWith("/en/")) return pathname.replace(/^\/en/, "") || "/";
    return pathname;
  }
}


export function alternatePathFor(pathname: string): string | undefined {
  return trToEn.get(pathname) ?? enToTr.get(pathname);
}

export function localizedServicePath(slug: string, locale: Locale): string {
  const trPath = `/hizmetler/${slug}`;
  return locale === "en" ? trToEn.get(trPath) ?? "/en/services" : trPath;
}

export function localizedProjectPath(slug: string, locale: Locale): string {
  return locale === "en" ? `/en/projects/${slug}` : `/projeler/${slug}`;
}
