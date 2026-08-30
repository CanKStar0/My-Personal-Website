"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "./language-context";
import { CommandPalette } from "./command-palette";
import { translations } from "@/lib/translations";
import { trackEvent } from "@/lib/analytics";
import { getLocalizedPath } from "@/lib/i18n";

// Inline brand SVGs (not available in this lucide-react version)
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LanguageToggle() {
  const pathname = usePathname();
  const { locale } = useLanguage();

  return (
    <nav
      className="relative flex items-center h-9 rounded-full border border-border/20 bg-background/50 overflow-hidden select-none"
      aria-label="Language selector"
    >
      {/* Sliding red pill indicator */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-brand-red shadow-[0_0_12px_rgba(220,38,38,0.3)]"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        style={{
          left: locale === "tr" ? "2px" : "calc(50%)",
        }}
      />

      <Link
        href={getLocalizedPath(pathname, "tr")}
        aria-current={locale === "tr" ? "page" : undefined}
        aria-label="Türkçe"
        onClick={() => trackEvent("language_switch", { from: locale, to: "tr" })}
        className={`relative z-10 flex items-center justify-center w-[38px] h-full text-xs font-bold tracking-wide cursor-pointer transition-colors duration-200 ${
          locale === "tr"
            ? "text-white"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        TR
      </Link>
      <Link
        href={getLocalizedPath(pathname, "en")}
        aria-current={locale === "en" ? "page" : undefined}
        aria-label="English"
        onClick={() => trackEvent("language_switch", { from: locale, to: "en" })}
        className={`relative z-10 flex items-center justify-center w-[38px] h-full text-xs font-bold tracking-wide cursor-pointer transition-colors duration-200 ${
          locale === "en"
            ? "text-white"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        EN
      </Link>
    </nav>
  );
}

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const { t, locale } = useLanguage();
  const homeHref = locale === "en" ? "/en" : "/";
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeVisible, setHomeVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Monitor scroll with RAF throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== homeHref) return;
    const timer = setTimeout(() => setHomeVisible(true), 2000);
    return () => clearTimeout(timer);
  }, [homeHref, pathname]);

  // Global Cmd+K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const visible = pathname !== homeHref || homeVisible;

  const navLinks = locale === "en"
    ? [
        { name: t(translations.navbar.home), href: "/en" },
        { name: t(translations.navbar.about), href: "/en/about" },
        { name: t(translations.navbar.services), href: "/en/services" },
        { name: t(translations.navbar.projects), href: "/en/projects" },
        { name: t(translations.navbar.blog), href: "/en/blog" },
        { name: t(translations.navbar.contact), href: "/en/contact" },
      ]
    : [
        { name: t(translations.navbar.home), href: "/" },
        { name: t(translations.navbar.about), href: "/hakkimda" },
        { name: t(translations.navbar.services), href: "/hizmetler" },
        { name: t(translations.navbar.projects), href: "/projeler" },
        { name: t(translations.navbar.blog), href: "/blog" },
        { name: t(translations.navbar.contact), href: "/iletisim" },
      ];

  const isHome = pathname === homeHref;
  const transitionClass = isHome
    ? `transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`
    : `transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`;

  return (
    <>
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <header
        className={`sticky top-0 z-40 w-full ${transitionClass} ${
          scrolled
            ? "border-b border-border/20 bg-background/70 backdrop-blur-md shadow-xs"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand Name */}
          <Link
            href={homeHref}
            className="group flex items-center space-x-2 font-jakarta text-base sm:text-lg font-bold tracking-tight text-foreground transition-all duration-200 shrink-0"
          >
            <span className="bg-linear-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent group-hover:opacity-90">
              Canpolat Kaya
            </span>
            <span className="hidden text-xs font-semibold text-muted-foreground sm:inline-block group-hover:text-brand-red transition-colors duration-200">
              / Dev
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-red transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Controls: Search, Socials, Language, Theme, Mobile Toggle */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            {/* Quick Search Button (Desktop / Tablet) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Arama yap (Cmd+K)"
              className="hidden sm:flex h-9 items-center gap-2 rounded-full border border-border/20 bg-background/50 px-3 text-xs text-muted-foreground transition-all duration-200 hover:border-border hover:bg-muted/60 hover:text-foreground cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
              <span>{locale === "en" ? "Search..." : "Ara..."}</span>
              <kbd className="rounded border border-border/60 bg-muted/60 px-1.5 py-0.2 text-[10px] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* GitHub (Hidden on extra small navbar, visible on sm+) */}
            <a
              href="https://github.com/CanKStar0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>

            {/* LinkedIn (Hidden on extra small navbar, visible on sm+) */}
            <a
              href="https://www.linkedin.com/in/canpolat-kaya/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </a>

            {/* Language Toggle (TR/EN) */}
            <LanguageToggle />

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/20 bg-background/50 hover:bg-muted/80 text-foreground transition-all duration-200 cursor-pointer"
              aria-label={t(translations.navbar.themeToggle)}
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="h-4.5 w-4.5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="h-4.5 w-4.5 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
                )
              ) : (
                <span className="h-4.5 w-4.5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/20 bg-background/50 hover:bg-muted/80 text-foreground transition-all duration-200 lg:hidden cursor-pointer"
              aria-label={t(translations.navbar.menuToggle)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-4.5 w-4.5 transition-transform duration-200" />
              ) : (
                <Menu className="h-4.5 w-4.5 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="absolute top-16 left-0 w-full border-b border-border/20 bg-background/95 backdrop-blur-lg transition-all duration-300 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50 shadow-xl"
          >
            <div className="flex flex-col px-6 py-6 space-y-6">
              {/* Mobile Search Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                aria-label="Arama yap"
                className="flex w-full h-10 items-center justify-between rounded-xl border border-border/60 bg-muted/40 px-3.5 text-xs text-muted-foreground transition-all hover:border-brand-red/40 hover:bg-muted/70 hover:text-foreground cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-brand-red" />
                  <span>{locale === "en" ? "Search portfolio & blog..." : "Portfolyo ve blogda ara..."}</span>
                </div>
                <kbd className="rounded border border-border/60 bg-background/80 px-1.5 py-0.5 text-[10px] font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Nav links */}
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="text-base font-semibold text-foreground/85 hover:text-brand-red transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Social Icons inside Mobile Drawer */}
              <div className="pt-4 border-t border-border/30 flex items-center gap-6">
                <a
                  href="https://github.com/CanKStar0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/canpolat-kaya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
