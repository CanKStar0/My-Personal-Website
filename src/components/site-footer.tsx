"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-context";
import { translations } from "@/lib/translations";

export function SiteFooter() {
  const { t, locale } = useLanguage();
  const links = locale === "en"
    ? [
        ["Services", "/en/services"],
        ["Projects", "/en/projects"],
        ["Blog", "/en/blog"],
        ["Contact", "/en/contact"],
      ]
    : [
        ["Hizmetler", "/hizmetler"],
        ["Projeler", "/projeler"],
        ["Blog", "/blog"],
        ["İletişim", "/iletisim"],
      ];

  return (
    <footer className="border-t border-border/10 bg-background/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Canpolat Kaya. {t(translations.footer.rights)}</p>
        <nav aria-label="Alt menü" className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-6 items-center hover:text-foreground">{label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
