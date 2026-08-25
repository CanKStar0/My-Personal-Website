"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Layers, Code, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import { useLanguage } from "@/components/language-context";
import { services } from "@/lib/services";
import { servicesEn } from "@/lib/services-en";
import { blogPosts } from "@/lib/blog";
import { blogPostsEn } from "@/lib/blog-en";
import { localizedServicePath } from "@/lib/i18n";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  type: "service" | "project" | "article";
}

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Build searchable database based on active language
  const searchItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];

    // 1. Services
    const currentServices = isEn ? servicesEn : services;
    currentServices.forEach((s) => {
      items.push({
        id: `service-${s.slug}`,
        title: s.title,
        description: s.description,
        category: isEn ? "Services" : "Hizmetler",
        href: localizedServicePath(s.slug, locale),
        type: "service",
      });
    });

    // 2. Projects
    const projectsList = isEn
      ? [
          {
            id: "proj-mbb",
            title: "MyBusinessBoss - All-in-One ERP & CRM SaaS Platform",
            description: "High-performance modular enterprise ERP, POS, inventory, barcode, and calendar sync.",
            href: "/en/projects/mybusinessboss",
          },
          {
            id: "proj-haber",
            title: "News Portal - Autonomous Web Scraping Engine",
            description: "Distributed scraper, Redis caching, and real-time news delivery platform.",
            href: "/en/projects/haber-portali",
          },
          {
            id: "proj-bist",
            title: "BIST AI - Financial Data Analytics System",
            description: "Real-time market ingestion, technical indicators, and LLM balance sheet analysis.",
            href: "/en/projects/bist-ai",
          },
          {
            id: "proj-freeapi",
            title: "FreeAPI Directory - 500+ Public APIs",
            description: "Curated open APIs with live sandbox console and edge protection.",
            href: "/en/projects/free-api",
          },
        ]
      : [
          {
            id: "proj-mbb",
            title: "MyBusinessBoss - All-in-One Kurumsal ERP & CRM SaaS",
            description: "POS, stok, barkod, servis iş emirleri, akıllı randevu ve nakit akışını yöneten SaaS platformu.",
            href: "/projeler/mybusinessboss",
          },
          {
            id: "proj-haber",
            title: "Haber Portalı - Otonom Web Kazıma Motoru",
            description: "Otonom haber toplama, Redis önbellekleme ve DaaS veri dağıtım altyapısı.",
            href: "/projeler/haber-portali",
          },
          {
            id: "proj-bist",
            title: "BIST AI - Finansal Veri Analiz Sistemi",
            description: "Borsa İstanbul veri işleme, teknik analiz skorları ve LLM bilanço yorumlama.",
            href: "/projeler/bist-ai",
          },
          {
            id: "proj-freeapi",
            title: "FreeAPI Directory - 500+ Açık REST API",
            description: "Canlı konsol sandbox'ı ve edge korumasıyla 500+ doğrulanmış ücretsiz API.",
            href: "/projeler/free-api",
          },
        ];

    projectsList.forEach((p) => {
      items.push({
        id: p.id,
        title: p.title,
        description: p.description,
        category: isEn ? "Projects" : "Projeler",
        href: p.href,
        type: "project",
      });
    });

    // 3. Articles (100+ articles)
    const currentPosts = isEn ? blogPostsEn : blogPosts;
    currentPosts.forEach((p) => {
      items.push({
        id: `post-${p.slug}`,
        title: p.title,
        description: p.description,
        category: p.category,
        href: isEn ? `/en/blog/${p.slug}` : `/blog/${p.slug}`,
        type: "article",
      });
    });

    return items;
  }, [isEn, locale]);

  // Filter items
  const filtered = useMemo(() => {
    if (!query.trim()) {
      // Default top suggestions
      return searchItems.slice(0, 8);
    }
    const q = query.toLowerCase();
    return searchItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [query, searchItems]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      onClose();
      setQuery("");
      router.push(item.href);
    },
    [onClose, router]
  );

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        handleSelect(filtered[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, handleSelect, onClose]);

  if (!isOpen) return null;

  const getTypeIcon = (type: SearchItem["type"]) => {
    switch (type) {
      case "service":
        return <Layers className="h-4 w-4 text-brand-red dark:text-rose-400" />;
      case "project":
        return <Code className="h-4 w-4 text-amber-500" />;
      case "article":
        return <FileText className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick search"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 sm:pt-24 bg-background/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border/80 bg-card/95 shadow-2xl backdrop-blur-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              isEn
                ? "Search services, projects, guides, and 100+ articles..."
                : "Hizmetler, projeler, rehberler ve 100+ makale içinde arayın..."
            }
            autoFocus
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden rounded-md border border-border/60 bg-muted/60 px-2 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              {isEn ? "No matching results found for" : "Eşleşen sonuç bulunamadı:"} &quot;{query}&quot;
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((item, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl p-3 text-left transition-all ${
                      isSelected
                        ? "bg-brand-red/10 text-brand-red dark:bg-rose-950/30 dark:text-rose-400"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 shrink-0">{getTypeIcon(item.type)}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-bold">{item.title}</span>
                          <span className="rounded-md border border-border/50 bg-background/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            {item.category}
                          </span>
                        </div>
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {isSelected ? (
                        <span className="flex items-center gap-1 rounded border border-brand-red/40 bg-background px-1.5 py-0.5 text-[10px] font-mono text-brand-red dark:text-rose-400">
                          <CornerDownLeft className="h-3 w-3" />
                        </span>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-40" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-border/50 bg-muted/20 px-5 py-2.5 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd>
              {isEn ? "Navigate" : "Gezin"}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
              {isEn ? "Select" : "Seç"}
            </span>
          </div>
          <span>
            {filtered.length} {isEn ? "results" : "sonuç"}
          </span>
        </div>
      </div>
    </div>
  );
}
