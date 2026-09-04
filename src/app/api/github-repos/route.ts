import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache on server for 1 hour

export interface GitHubRepoItem {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string | null;
  fork: boolean;
  updated_at?: string;
}

// Güvenilir fallback — CanKStar0'ın gerçek, aktif açık kaynak repoları (Free-API hariç)
const FALLBACK_REPOS: GitHubRepoItem[] = [
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

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/CanKStar0/repos?per_page=100&sort=pushed", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "CanpolatKaya-Portfolio",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(FALLBACK_REPOS, {
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
      });
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return NextResponse.json(FALLBACK_REPOS);
    }

    // Yalnızca kendi orijinal repolarını (fork olmayanları) al, yıldıza göre sırala
    const filteredRepos: GitHubRepoItem[] = data
      .filter((repo: { fork: boolean }) => !repo.fork)
      .map((r: {
        id: number;
        name: string;
        description: string | null;
        stargazers_count: number;
        forks_count?: number;
        html_url: string;
        language: string | null;
        fork: boolean;
        updated_at?: string;
      }) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count || 0,
        html_url: r.html_url,
        language: r.language,
        fork: r.fork,
        updated_at: r.updated_at,
      }))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    const result = filteredRepos.length > 0 ? filteredRepos : FALLBACK_REPOS;

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json(FALLBACK_REPOS, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  }
}
