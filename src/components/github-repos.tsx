"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  language: string | null;
  fork: boolean;
}

// Statik fallback — API erişilemez olsa bile her zaman görünür
const STATIC_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "EcoTrace",
    description: "A lightweight Python library for tracking carbon emissions and energy consumption of your code — with zero configuration.",
    stargazers_count: 3,
    html_url: "https://github.com/CanKStar0/EcoTrace",
    language: "Python",
    fork: false,
  },
  {
    id: 2,
    name: "My-Personal-Website",
    description: "My personal portfolio built with Next.js 16, React 19, Tailwind CSS v4 and Framer Motion. Crimson-Noir design system with TR/EN i18n.",
    stargazers_count: 1,
    html_url: "https://github.com/CanKStar0/My-Personal-Website",
    language: "TypeScript",
    fork: false,
  },
  {
    id: 3,
    name: "Zillow-Stealth-Scraper",
    description: "Autonomous Zillow scraper with ML-based ghost cursor movements, PerimeterX bypass, and intelligent pagination.",
    stargazers_count: 1,
    html_url: "https://github.com/CanKStar0",
    language: "JavaScript",
    fork: false,
  },
  {
    id: 4,
    name: "BIST-AI",
    description: "Real-time Borsa Istanbul analytics dashboard powered by Python, FastAPI, Redis and Next.js with ML-based scoring.",
    stargazers_count: 0,
    html_url: "https://github.com/CanKStar0",
    language: "Python",
    fork: false,
  },
];

export function GithubRepos() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepo[]>(STATIC_REPOS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    // Sessizce dene — başarılı olursa canlı veriyle güncelle, olmazsa statik kalır
    fetch("https://api.github.com/users/CanKStar0/repos", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("rate-limit or network error");
        return res.json();
      })
      .then((data: GitHubRepo[]) => {
        const topRepos = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 4);
        if (topRepos.length > 0) setRepos(topRepos);
      })
      .catch(() => {
        // Sessiz başarısız — statik veri zaten görünüyor
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {repos.map((repo, index) => (
        <ScrollReveal key={repo.id} delay={index * 0.15} className="h-full">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full relative z-10 cursor-pointer"
          >
            <div className="p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col justify-between h-full min-h-[190px] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 dark:hover:border-brand-red/30 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">

              {/* Top Part: Title & Stars */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="text-lg font-bold font-jakarta text-foreground group-hover:text-brand-red transition-colors duration-200 leading-tight">
                    {repo.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 group-hover:text-brand-red dark:group-hover:text-brand-red transition-colors duration-200">
                    <Star className="w-4 h-4 fill-zinc-400/10 dark:fill-zinc-600/10 group-hover:fill-brand-red/10 stroke-[1.5]" />
                    <span className="text-xs font-semibold font-sans leading-none">
                      {repo.stargazers_count}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground/90 text-xs md:text-sm leading-relaxed font-sans font-light line-clamp-3">
                  {repo.description || t(translations.github.noDescription)}
                </p>
              </div>

              {/* Tech Badge */}
              <div className="border-t border-zinc-200/40 dark:border-zinc-800/40 pt-4 mt-6">
                <div className="flex flex-wrap gap-2">
                  {repo.language && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-zinc-100 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-800/40 transition-colors duration-200 group-hover:bg-brand-red/5 dark:group-hover:bg-brand-red/5 group-hover:text-brand-red dark:group-hover:text-brand-red/90 group-hover:border-brand-red/10">
                      {repo.language}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </a>
        </ScrollReveal>
      ))}
    </div>
  );
}

