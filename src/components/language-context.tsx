"use client";

import { createContext, useContext, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/translations";
import { getLocalizedPath, localeFromPathname } from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (value: { tr: string; en: string }) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = localeFromPathname(pathname);

  // Update localStorage and html lang attribute on locale change
  const setLocale = useCallback((newLocale: Locale) => {
    router.push(getLocalizedPath(pathname, newLocale));
  }, [pathname, router]);

  // Sync html lang when the active language changes
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Translation helper
  const t = useCallback(
    (value: { tr: string; en: string }) => value[locale],
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
