"use client";

import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";
import { GithubRepos } from "@/components/github-repos";
import { useLanguage } from "@/components/language-context";
import { translations } from "@/lib/translations";

export default function ProjelerPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-12">
        <ProjectsSection githubReposNode={<GithubRepos />} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/10 bg-background/50">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Canpolat Kaya. {t(translations.footer.rights)}</p>
        </div>
      </footer>
    </>
  );
}
