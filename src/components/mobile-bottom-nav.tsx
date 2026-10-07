"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Briefcase, Boxes, BookOpen, Mail } from "lucide-react";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t, locale } = useLanguage();
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Hide the floating bar when typing in inputs/textareas to prevent virtual keyboard clipping
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = () => {
      setIsInputFocused(false);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const isHome = locale === "en" ? pathname === "/en" : pathname === "/";
  const isProjects =
    pathname === "/projeler" ||
    pathname.startsWith("/projeler/") ||
    pathname === "/en/projects" ||
    pathname.startsWith("/en/projects/");
  const isServices =
    pathname === "/hizmetler" ||
    pathname.startsWith("/hizmetler/") ||
    pathname === "/en/services" ||
    pathname.startsWith("/en/services/");
  const isBlog =
    pathname === "/blog" ||
    pathname.startsWith("/blog/") ||
    pathname === "/en/blog" ||
    pathname.startsWith("/en/blog/");
  const isContact = pathname === "/iletisim" || pathname === "/en/contact";

  const navItems = [
    {
      name: t(translations.navbar.home),
      href: locale === "en" ? "/en" : "/",
      icon: Home,
      isActive: isHome,
    },
    {
      name: t(translations.navbar.projects),
      href: locale === "en" ? "/en/projects" : "/projeler",
      icon: Briefcase,
      isActive: isProjects,
    },
    {
      name: t(translations.navbar.services),
      href: locale === "en" ? "/en/services" : "/hizmetler",
      icon: Boxes,
      isActive: isServices,
    },
    {
      name: t(translations.navbar.blog),
      href: locale === "en" ? "/en/blog" : "/blog",
      icon: BookOpen,
      isActive: isBlog,
    },
    {
      name: t(translations.navbar.contact),
      href: locale === "en" ? "/en/contact" : "/iletisim",
      icon: Mail,
      isActive: isContact,
    },
  ];

  return (
    <nav
      aria-label={locale === "en" ? "Mobile navigation" : "Mobil alt navigasyon"}
      className={`fixed bottom-3 inset-x-0 mx-auto w-[calc(100%-20px)] max-w-md z-40 md:hidden transition-all duration-300 ${
        isInputFocused
          ? "translate-y-24 opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0px)",
      }}
    >
      <div className="flex items-center justify-around px-1.5 py-1 rounded-2xl bg-[#FAF9F6]/95 dark:bg-zinc-950/90 backdrop-blur-xl border border-zinc-300/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.isActive ? "page" : undefined}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 min-h-[48px] rounded-xl transition-all duration-200 active:scale-95 group ${
                item.isActive
                  ? "text-brand-red dark:text-rose-400 font-bold"
                  : "text-muted-foreground hover:text-foreground font-medium"
              }`}
            >
              {item.isActive && (
                <motion.div
                  layoutId="mobile-nav-active-pill"
                  className="absolute inset-0 bg-brand-red/[0.08] dark:bg-rose-500/[0.12] rounded-xl"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    item.isActive ? "scale-105 stroke-[2.2]" : "stroke-[1.75]"
                  }`}
                />
                <span className="text-[10px] mt-0.5 tracking-tight leading-tight select-none">
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
