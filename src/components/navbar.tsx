"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";

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
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="relative flex items-center h-9 rounded-full border border-border/20 bg-background/50 overflow-hidden select-none"
      role="radiogroup"
      aria-label="Language selector"
    >
      {/* Sliding red pill indicator */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-brand-red/90 shadow-[0_0_12px_rgba(220,38,38,0.3)]"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        style={{
          left: locale === "tr" ? "2px" : "calc(50%)",
        }}
      />

      <button
        role="radio"
        aria-checked={locale === "tr"}
        onClick={() => setLocale("tr")}
        className={`relative z-10 flex items-center justify-center w-[38px] h-full text-xs font-bold tracking-wide cursor-pointer transition-colors duration-200 focus:outline-hidden ${
          locale === "tr"
            ? "text-white"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        TR
      </button>
      <button
        role="radio"
        aria-checked={locale === "en"}
        onClick={() => setLocale("en")}
        className={`relative z-10 flex items-center justify-center w-[38px] h-full text-xs font-bold tracking-wide cursor-pointer transition-colors duration-200 focus:outline-hidden ${
          locale === "en"
            ? "text-white"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll to add deeper styling on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
    const isHome = pathname === "/";
    if (!isHome) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const navLinks = [
    { name: t(translations.navbar.home), href: "/" },
    { name: t(translations.navbar.about), href: "/#hakkimda" },
    { name: t(translations.navbar.tools), href: "/#araclar" },
    { name: t(translations.navbar.projects), href: "/projeler" },
    { name: t(translations.navbar.contact), href: "/iletisim" },
  ];

  const isHome = pathname === "/";
  const transitionClass = isHome
    ? `transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`
    : `transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full ${transitionClass} ${
        scrolled
          ? "border-b border-border/20 bg-background/70 backdrop-blur-md shadow-xs"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo / Brand Name */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex items-center space-x-2 font-jakarta text-lg font-bold tracking-tight text-foreground transition-all duration-200"
        >
          <span className="bg-linear-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent group-hover:opacity-90">
            Canpolat Kaya
          </span>
          <span className="hidden text-xs font-semibold text-muted-foreground/60 sm:inline-block group-hover:text-brand-red transition-colors duration-200">
            / Dev
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (pathname === link.href) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                if (link.href.startsWith("/#") && pathname === "/") {
                  e.preventDefault();
                  const targetId = link.href.split("#")[1];
                  const element = document.getElementById(targetId);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="relative text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-red transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Theme Toggle & Language Toggle & Social Icons & Mobile Menu Controls */}
        <div className="flex items-center space-x-2">          
          {/* GitHub */}
          <a
            href="https://github.com/CanKStar0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 hover:text-foreground transition-colors duration-200"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/canpolat-kaya/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 hover:text-foreground transition-colors duration-200"
          >
            <LinkedInIcon className="h-[18px] w-[18px]" />
          </a>

          {/* Language Toggle (TR/EN) */}
          <LanguageToggle />

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/20 bg-background/50 hover:bg-muted/80 text-foreground transition-all duration-200 cursor-pointer focus:outline-hidden"
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/20 bg-background/50 hover:bg-muted/80 text-foreground transition-all duration-200 md:hidden cursor-pointer focus:outline-hidden"
            aria-label={t(translations.navbar.menuToggle)}
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
        <div className="absolute top-16 left-0 w-full border-b border-border/20 bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50 shadow-xl">
          <nav className="flex flex-col space-y-4 px-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (pathname === link.href) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  if (link.href.startsWith("/#") && pathname === "/") {
                    e.preventDefault();
                    const targetId = link.href.split("#")[1];
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                  setMobileMenuOpen(false);
                }}
                className="text-base font-medium text-foreground/80 hover:text-brand-red transition-colors duration-200 block w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
