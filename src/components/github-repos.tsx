import { Star } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  language: string | null;
  fork: boolean;
}

export async function GithubRepos() {
  try {
    const res = await fetch("https://api.github.com/users/CanKStar0/repos", {
      next: { revalidate: 3600 }, // Saatte bir güncelle
    });

    if (!res.ok) {
      throw new Error("GitHub API'sine ulaşılamadı.");
    }

    const repos: GitHubRepo[] = await res.json();

    const topRepos = repos
      .filter((repo) => !repo.fork) // Fork olanları gizle
      .sort((a, b) => b.stargazers_count - a.stargazers_count) // Yıldızlara göre sırala
      .slice(0, 4); // İlk 4 repoyu al

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topRepos.map((repo, index) => (
          <ScrollReveal key={repo.id} delay={index * 0.2} className="h-full">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group block h-full">
              <div className="p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col justify-between h-full min-h-[190px] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 dark:hover:border-brand-red/30 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                
                {/* Top Part: Title & Stars */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold font-jakarta text-foreground group-hover:text-brand-red transition-colors duration-200 leading-tight">
                      {repo.name}
                    </h3>
                    {/* Premium Star Icon */}
                    <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 group-hover:text-brand-red dark:group-hover:text-brand-red transition-colors duration-200">
                      <Star className="w-4 h-4 fill-zinc-400/10 dark:fill-zinc-600/10 group-hover:fill-brand-red/10 stroke-[1.5]" />
                      <span className="text-xs font-semibold font-sans leading-none">{repo.stargazers_count}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground/90 text-xs md:text-sm leading-relaxed font-sans font-light line-clamp-3">
                    {repo.description || "Açıklama bulunmuyor."}
                  </p>
                </div>

                {/* Tech Badges */}
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
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return (
      <div className="w-full p-8 text-center border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20">
        <p className="text-sm text-muted-foreground">Şu an GitHub repolarına ulaşılamıyor.</p>
      </div>
    );
  }
}
