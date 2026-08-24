"use client";

import { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";
import { slugify } from "@/lib/slug";

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: { title: string }[];
  title?: string;
}

export function TableOfContents({ sections, title = "İçindekiler" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const items: TOCItem[] = sections.map((s) => ({
    id: `sec-${slugify(s.title)}`,
    title: s.title,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="my-8 rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-xs lg:p-6"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-jakarta text-sm font-bold text-foreground lg:cursor-default"
      >
        <span className="flex items-center gap-2 text-brand-red dark:text-rose-400">
          <List className="h-4 w-4" />
          <span className="uppercase tracking-wider text-xs font-extrabold">{title}</span>
        </span>
        <ChevronRight
          className={`h-4 w-4 text-muted-foreground transition-transform lg:hidden ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      <ul
        className={`mt-4 space-y-2 text-sm transition-all duration-200 ${
          isOpen ? "block" : "hidden lg:block"
        }`}
      >
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToHeading(item.id)}
                className={`group flex w-full items-start gap-2.5 text-left transition-colors duration-150 ${
                  isActive
                    ? "font-semibold text-brand-red dark:text-rose-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="mt-0.5 text-xs font-mono opacity-50">
                  {String(idx + 1).padStart(2, "0")}.
                </span>
                <span className="leading-snug">{item.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
