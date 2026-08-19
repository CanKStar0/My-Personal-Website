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

// Statik fallback — API erişilemez veya rate-limit olsa bile her zaman en çok yıldız alan kendi repoları görünür
const STATIC_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "Free-API",
    description: "Free-API is a modern web application that helps developers discover free APIs for their projects. Whether you're building a weather app, a crypto tracker, or a gaming dashboard, you'll find the right API here.",
    stargazers_count: 33,
    html_url: "https://github.com/CanKStar0/Free-API",
    language: "TypeScript",
    fork: false,
  },
  {
    id: 2,
    name: "Akakce-Scraper",
    description: "Akakce.com'dan ürün fiyat geçmişi verilerini otomatik olarak toplayan güçlü bir scraper. Headless Chrome ile çalışır ve anti-bot korumasını bypass eder. Başarılı bir şekilde ML yapabilirsiniz.",
    stargazers_count: 7,
    html_url: "https://github.com/CanKStar0/Akakce-Scraper",
    language: "JavaScript",
    fork: false,
  },
  {
    id: 3,
    name: "Cosmic-Explorer",
    description: "Interaktif bir astronomi deneyimi - Three.js ile yapılmış profesyonel bir 3D gezegen görselleştirme uygulaması.",
    stargazers_count: 6,
    html_url: "https://github.com/CanKStar0/Cosmic-Explorer",
    language: "JavaScript",
    fork: false,
  },
  {
    id: 4,
    name: "My-Personal-Website",
    description: "Kurumsal tasarımda zarif renk tonları ve framer animasyonlarıyla freelance işlerde beni tanıtacak kişisel websitesi.",
    stargazers_count: 5,
    html_url: "https://github.com/CanKStar0/My-Personal-Website",
    language: "TypeScript",
    fork: false,
  },
  {
    id: 5,
    name: "AI-Vision-Scrape",
    description: "Sürekli değişen DOM yapısıyla korunan websitelerinden prompt ve URL vererek kesintisiz veri toplayan akıllı web scraping SDK'sı.",
    stargazers_count: 1,
    html_url: "https://github.com/CanKStar0/AI-Vision-Scrape",
    language: "JavaScript",
    fork: false,
  },
];

export function GithubRepos() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepo[]>(STATIC_REPOS);

  useEffect(() => {
    const controller = new AbortController();

    // Canlı GitHub verisini çek — en çok yıldız alan kendi repolarını (fork olmayanları) en başa koy
    fetch("https://api.github.com/users/CanKStar0/repos?per_page=100", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("rate-limit or network error");
        return res.json();
      })
      .then((data: GitHubRepo[]) => {
        if (!Array.isArray(data)) return;
        const topRepos = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        if (topRepos.length > 0) setRepos(topRepos);
      })
      .catch(() => {
        // Sessiz fallback — STATIC_REPOS zaten en çok yıldız alan kendi repoları
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
            <div className="p-6 rounded-xl border border-zinc-300/80 dark:border-zinc-800/50 bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col justify-between h-full min-h-[190px] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 dark:hover:border-brand-red/40 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">

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
