"use client";

import { useState, useEffect } from "react";
import { Star, GitFork, ExternalLink, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count?: number;
  html_url: string;
  language: string | null;
  fork: boolean;
  updated_at?: string;
}

// Güvenilir statik başlangıç — CanKStar0'ın gerçek açık kaynak repoları (Free-API hariç)
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: "Akakce-Scraper",
    description: "High-performance e-commerce price history scraper with headless browser orchestration & anti-bot bypass.",
    stargazers_count: 7,
    forks_count: 0,
    html_url: "https://github.com/CanKStar0/Akakce-Scraper",
    language: "JavaScript",
    fork: false,
  },
  {
    id: 102,
    name: "Cosmic-Explorer",
    description: "Interaktif bir astronomi deneyimi - Three.js ile yapılmış profesyonel bir 3D gezegen görselleştirme uygulaması.",
    stargazers_count: 6,
    forks_count: 0,
    html_url: "https://github.com/CanKStar0/Cosmic-Explorer",
    language: "JavaScript",
    fork: false,
  },
  {
    id: 103,
    name: "My-Personal-Website",
    description: "Kurumsal tasarımda zarif renk tonları ve framer animasyonlarıyla freelance işlerde beni tanıtacak kişisel websitesi.",
    stargazers_count: 5,
    forks_count: 0,
    html_url: "https://github.com/CanKStar0/My-Personal-Website",
    language: "TypeScript",
    fork: false,
  },
  {
    id: 104,
    name: "AI-Vision-Scrape",
    description: "Autonomous AI-driven web scraping SDK resilient to dynamic DOM alterations using Playwright & LLM vision.",
    stargazers_count: 1,
    forks_count: 0,
    html_url: "https://github.com/CanKStar0/AI-Vision-Scrape",
    language: "JavaScript",
    fork: false,
  },
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-[#3178c6]",
  JavaScript: "bg-[#f7df1e]",
  Python: "bg-[#3572A5]",
  HTML: "bg-[#e34c26]",
  CSS: "bg-[#563d7c]",
};

export function GithubRepos() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiveSynced, setIsLiveSynced] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadRepos() {
      try {
        // 1. Önce sunucu tarafında önbelleklenen internal API'den veri al
        const res = await fetch("/api/github-repos", { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setRepos(data);
            setIsLiveSynced(true);
            setIsLoading(false);
            return;
          }
        }

        // 2. Doğrudan GitHub API'ye istek dene (client-side fallback)
        const directRes = await fetch("https://api.github.com/users/CanKStar0/repos?per_page=100&sort=pushed", { signal: controller.signal });
        if (directRes.ok) {
          const directData = await directRes.json();
          if (isMounted && Array.isArray(directData) && directData.length > 0) {
            const filtered = directData
              .filter((r: { fork: boolean }) => !r.fork)
              .sort((a: { stargazers_count: number }, b: { stargazers_count: number }) => b.stargazers_count - a.stargazers_count)
              .slice(0, 6);

            if (filtered.length > 0) {
              setRepos(filtered);
              setIsLiveSynced(true);
            }
          }
        }
      } catch {
        // Hata veya abort durumunda FALLBACK_REPOS devrede kalır
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Canlı Eşitleme Durum Rozeti */}
      <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
        <div className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLiveSynced ? "bg-emerald-400" : "bg-zinc-400"}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveSynced ? "bg-emerald-500" : "bg-zinc-500"}`} />
          </span>
          <span className="font-mono text-[11px] tracking-wide uppercase">
            {t(translations.github.liveBadge)}
          </span>
        </div>

        <a
          href="https://github.com/CanKStar0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500 hover:text-brand-red dark:text-zinc-400 transition-colors"
        >
          <span>@CanKStar0</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      {/* Grid: 2 Sütunlu Dengeli Bento Görünümü */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading && repos.length === 0
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-zinc-300/80 dark:border-zinc-800/50 bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col justify-between h-[190px] animate-pulse"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-5 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                    <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="h-3.5 w-full bg-zinc-200/70 dark:bg-zinc-800/70 rounded" />
                    <div className="h-3.5 w-3/4 bg-zinc-200/70 dark:bg-zinc-800/70 rounded" />
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-200/40 dark:border-zinc-800/40">
                  <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            ))
          : repos.map((repo, index) => {
              const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || "bg-zinc-400" : null;

              return (
                <ScrollReveal key={repo.id || repo.name} delay={index * 0.1} className="h-full">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full relative z-10 cursor-pointer"
                  >
                    <div className="p-6 rounded-xl border border-zinc-300/80 dark:border-zinc-800/50 bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col justify-between h-full min-h-[190px] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 dark:hover:border-brand-red/40 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">

                      {/* Top Part: Title & Stars */}
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className="text-lg font-bold font-jakarta text-foreground group-hover:text-brand-red transition-colors duration-200 leading-tight truncate">
                              {repo.name}
                            </h3>
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {typeof repo.forks_count === "number" && repo.forks_count > 0 && (
                              <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs font-sans">
                                <GitFork className="w-3.5 h-3.5" />
                                <span>{repo.forks_count}</span>
                              </div>
                            )}

                            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 group-hover:text-brand-red dark:group-hover:text-brand-red transition-colors duration-200">
                              <Star className="w-4 h-4 fill-amber-400/20 text-amber-500 group-hover:fill-amber-400/40 transition-colors stroke-[1.5]" />
                              <span className="text-xs font-bold font-mono leading-none">
                                {repo.stargazers_count}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground/90 text-xs md:text-sm leading-relaxed font-sans font-light line-clamp-3">
                          {repo.description || t(translations.github.noDescription)}
                        </p>
                      </div>

                      {/* Tech Badge & Language */}
                      <div className="border-t border-zinc-200/40 dark:border-zinc-800/40 pt-4 mt-6 flex items-center justify-between">
                        {repo.language ? (
                          <div className="inline-flex items-center gap-2">
                            {langColor && <span className={`w-2 h-2 rounded-full ${langColor}`} />}
                            <span className="px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-zinc-100 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-800/40 transition-colors duration-200 group-hover:bg-brand-red/5 dark:group-hover:bg-brand-red/5 group-hover:text-brand-red dark:group-hover:text-brand-red/90 group-hover:border-brand-red/10">
                              {repo.language}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-zinc-400 font-mono">Open Source</span>
                        )}

                        <span className="text-[11px] font-mono text-zinc-400 group-hover:text-brand-red transition-colors inline-flex items-center gap-1">
                          github.com <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>

                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
      </div>

      {/* GitHub Profil CTA Butonu */}
      <div className="pt-6 flex justify-center">
        <a
          href="https://github.com/CanKStar0?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-800 bg-background/80 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-foreground font-semibold text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-xs hover:shadow-md cursor-pointer group"
        >
          <GithubIcon className="w-4 h-4 text-zinc-700 dark:text-zinc-300 group-hover:text-foreground transition-colors" />
          <span>{t(translations.github.viewAll)}</span>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
