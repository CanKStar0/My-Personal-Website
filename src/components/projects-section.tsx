"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";

interface Project {
  titleKey: { tr: string; en: string };
  descriptionKey: { tr: string; en: string };
  technologies: string[];
  slug: string;
  imagePath?: string;
}

interface ProjectsSectionProps {
  githubReposNode?: React.ReactNode;
}

export function ProjectsSection({ githubReposNode }: ProjectsSectionProps = {}) {
  const { t, locale } = useLanguage();

  const projects: Project[] = [
    {
      titleKey: translations.projects.haberTitle,
      descriptionKey: translations.projects.haberDesc,
      technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "GZIP"],
      slug: "haber-portali",
      imagePath: "/images/haber-cover.png",
    },
    {
      titleKey: translations.projects.bistTitle,
      descriptionKey: translations.projects.bistDesc,
      technologies: ["Python", "FastAPI", "Redis", "PostgreSQL", "Docker", "Tailwind CSS"],
      slug: "bist-ai",
      imagePath: "/images/bist-ai-cover.png",
    },
  ];

  return (
    <section id="projeler" className="w-full py-24 px-6 md:px-12 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-16 text-center flex flex-col items-center">
          <span className="text-xs font-bold tracking-[0.2em] text-brand-red uppercase block mb-3 font-sans text-center">
            {t(translations.projects.eyebrow)}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-jakarta text-foreground mb-4 text-center">
            {t(translations.projects.heading)}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground/80 font-sans font-light max-w-xl leading-relaxed text-center">
            {t(translations.projects.subheading)}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.2} className="h-full">
              <Link href={`/projeler/${project.slug}`} className="group block h-full relative z-10 cursor-pointer">
                <div className="p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col justify-between h-full min-h-[380px] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 dark:hover:border-brand-red/30 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <div>
                    {project.imagePath ? (
                      <div className="w-full aspect-video rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/40 mb-6 flex items-center justify-center overflow-hidden relative">
                        <Image src={project.imagePath} alt={t(project.titleKey)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    ) : (
                      <div className="w-full aspect-video rounded-lg bg-zinc-200/40 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/40 mb-6 flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.25)_100%)] pointer-events-none" />
                        <span className="text-zinc-400/50 dark:text-zinc-600/50 text-[10px] md:text-xs font-semibold tracking-widest uppercase font-sans">
                          {t(translations.projects.imagePreparing)}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold font-jakarta text-foreground group-hover:text-brand-red transition-colors duration-200 mb-3 leading-tight">
                      {t(project.titleKey)}
                    </h3>
                    <p className="text-muted-foreground/90 text-sm leading-relaxed font-sans font-light">
                      {t(project.descriptionKey)}
                    </p>
                  </div>
                  <div className="border-t border-zinc-200/40 dark:border-zinc-800/40 pt-5 mt-8">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-zinc-100 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-800/40 transition-colors duration-200 group-hover:bg-brand-red/5 dark:group-hover:bg-brand-red/5 group-hover:text-brand-red dark:group-hover:text-brand-red/90 group-hover:border-brand-red/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-28 mb-16 text-center flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-jakarta text-foreground mb-4 text-center">
            {t(translations.projects.openSourceHeading)}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground/80 font-sans font-light max-w-xl leading-relaxed text-center">
            {t(translations.projects.openSourceSubheading)}
          </p>
        </ScrollReveal>

        {githubReposNode}
      </div>
    </section>
  );
}
