"use client";

import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";
import { GithubRepos } from "@/components/github-repos";
import { SiteFooter } from "@/components/site-footer";

export default function ProjelerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-12">
        <ProjectsSection githubReposNode={<GithubRepos />} />
      </main>

      <SiteFooter />
    </>
  );
}
