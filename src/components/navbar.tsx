"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
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
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: "Hakkımda", href: "#hakkimda" },
    { name: "Projeler", href: "#projeler" },
    { name: "Araçlar", href: "#araclar" },
    { name: "İletişim", href: "#iletisim" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      } ${
        scrolled
          ? "border-b border-border/20 bg-background/70 backdrop-blur-md shadow-xs"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo / Brand Name */}
        <Link
          href="/"
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
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-red transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Theme Toggle & Mobile Menu Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/20 bg-background/50 hover:bg-muted/80 text-foreground transition-all duration-200 cursor-pointer focus:outline-hidden"
            aria-label="Karanlık/Aydınlık mod geçişi"
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
            aria-label="Menüyü Aç/Kapat"
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
        <div className="absolute top-16 left-0 w-full border-b border-border/20 bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4 px-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-foreground/80 hover:text-brand-red transition-colors duration-200"
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
