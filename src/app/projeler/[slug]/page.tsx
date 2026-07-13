"use client";

import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-context";
import { translations } from "@/lib/translations";
import { trackEvent } from "@/lib/analytics";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ProjectFeature {
  titleKey: { tr: string; en: string };
  descKey: { tr: string; en: string };
  imagePath: string;
}

interface ProjectData {
  slug: string;
  titleKey: { tr: string; en: string };
  summaryKey: { tr: string; en: string };
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  features: ProjectFeature[];
}

const PROJECTS_DATA: ProjectData[] = [
  {
    slug: "haber-portali",
    titleKey: translations.projects.haberTitle,
    summaryKey: translations.projects.haberDesc,
    techStack: ["Next.js", "TypeScript", "Node.js", "axios", "cheerio", "Playwright", "node-cron", "helmet", "MongoDB", "Mongoose", "Redis", "GZIP", "FetchAPI", "Session Storage"],
    liveUrl: "https://haber-portali.up.railway.app/",
    githubUrl: "/gizli-repo",
    features: [
      { titleKey: translations.projectDetail.haberFeature1Title, descKey: translations.projectDetail.haberFeature1Desc, imagePath: "/images/haber-1.png" },
      { titleKey: translations.projectDetail.haberFeature2Title, descKey: translations.projectDetail.haberFeature2Desc, imagePath: "/images/haber-2.png" },
      { titleKey: translations.projectDetail.haberFeature3Title, descKey: translations.projectDetail.haberFeature3Desc, imagePath: "/images/haber-3.png" },
      { titleKey: translations.projectDetail.haberFeature4Title, descKey: translations.projectDetail.haberFeature4Desc, imagePath: "/images/haber-4.png" },
    ],
  },
  {
    slug: "bist-ai",
    titleKey: translations.projects.bistTitle,
    summaryKey: translations.projects.bistDesc,
    techStack: ["Python", "FastAPI", "Redis", "NodeJS", "NextJS", "React", "Playwright", "Recharts", "Supabase", "PostreSQL", "Docker", "Tailwind CSS "],
    liveUrl: "/canli-yok",
    githubUrl: "/gizli-repo",
    features: [
      { titleKey: translations.projectDetail.bistFeature1Title, descKey: translations.projectDetail.bistFeature1Desc, imagePath: "/images/bist-ai-1.png" },
      { titleKey: translations.projectDetail.bistFeature2Title, descKey: translations.projectDetail.bistFeature2Desc, imagePath: "/images/bist-ai-2.png" },
      { titleKey: translations.projectDetail.bistFeature3Title, descKey: translations.projectDetail.bistFeature3Desc, imagePath: "/images/bist-ai-3.png" },
      { titleKey: translations.projectDetail.bistFeature4Title, descKey: translations.projectDetail.bistFeature4Desc, imagePath: "/images/bist-ai-4.png" },
    ],
  },
];

export default function ProjeDetayPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useLanguage();

  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background pt-12 pb-32">

        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <Link href="/projeler" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            {t(translations.projectDetail.backLink)}
          </Link>
        </div>

        {/* Hero Section */}
        <ScrollReveal className="max-w-4xl mx-auto px-6 text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-jakarta text-foreground mb-4 leading-tight">
            {t(project.titleKey)}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground/80 font-light font-sans max-w-2xl mx-auto leading-relaxed">
            {t(project.summaryKey)}
          </p>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto px-6 space-y-16">

          {/* Özellikler ve Görseller (Alternatif Düzen) */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-32 py-10 max-w-6xl mx-auto">
              {project.features.map((feature, index) => {
                const isEven = index % 2 === 0;
                return (
                  <ScrollReveal key={index} className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                    {/* Görsel Sütunu */}
                    <div className="w-full lg:w-[60%] flex items-center justify-center relative aspect-[4/3] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-zinc-200/40 dark:border-zinc-800/50 overflow-hidden bg-zinc-100 dark:bg-zinc-900/50">
                      <Image
                        src={feature.imagePath}
                        alt={t(feature.titleKey)}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                    {/* Metin Sütunu */}
                    <div className="w-full lg:w-[40%] flex flex-col justify-center text-left">
                      <span className="text-zinc-500 font-mono text-sm tracking-widest block mb-2">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold font-jakarta text-foreground mb-4">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        {t(feature.descKey)}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Teknoloji Yığını */}
          <ScrollReveal>
            <h2 className="text-xl font-bold font-jakarta text-foreground mb-6">{t(translations.projectDetail.techHeading)}</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/50">
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Action Links */}
          <ScrollReveal className="pt-12 border-t border-zinc-200/40 dark:border-zinc-800/40 flex flex-wrap gap-4">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => trackEvent("project_link_click", { type: "live", project: project.slug })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors relative z-10 cursor-pointer"
              >
                {t(translations.projectDetail.liveProject)} <ExternalLink className="w-4 h-4" />
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target={project.githubUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.githubUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => trackEvent("project_link_click", { type: "github", project: project.slug })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-foreground font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative z-10 cursor-pointer"
              >
                {t(translations.projectDetail.githubRepo)} <GithubIcon className="w-4 h-4" />
              </Link>
            )}
          </ScrollReveal>

          {/* Bottom CTA */}
          <ScrollReveal className="pt-16 pb-8 text-center flex flex-col items-center">
            <p className="text-muted-foreground mb-6 font-light">
              {t({ tr: "Bu proje ilginizi çekti mi? Birlikte çalışalım.", en: "Interested in this project? Let's work together." })}
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-brand-red/25 relative z-10 cursor-pointer"
            >
              {t(translations.navbar.contact)}
            </Link>
          </ScrollReveal>

        </div>
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
