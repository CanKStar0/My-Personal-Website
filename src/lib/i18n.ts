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
  if (targetLocale === "en") return trToEn.get(pathname) ?? pathname;
  return enToTr.get(pathname) ?? pathname;
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
