"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";
import { ArrowRight } from "lucide-react";
import { localizedProjectPath, localizedServicePath } from "@/lib/i18n";

interface Project {
  titleKey: { tr: string; en: string };
  descriptionKey: { tr: string; en: string };
  technologies: string[];
  slug: string;
  imagePath?: string | { tr: string; en: string };
}

interface ProjectsSectionProps {
  githubReposNode?: React.ReactNode;
}

export function ProjectsSection({ githubReposNode }: ProjectsSectionProps = {}) {
  const { t, locale } = useLanguage();

  const projects: Project[] = [
    {
      titleKey: translations.projects.mybusinessbossTitle,
      descriptionKey: translations.projects.mybusinessbossDesc,
      technologies: ["PHP MVC", "MySQL Enterprise", "TypeScript", "Progressive Web App (PWA)", "Redis Caching", "ZXing Barcode Engine", "CalDAV / ICS Feed", "RBAC Security", "Audit Trail"],
      slug: "mybusinessboss",
      imagePath: {
        tr: "/images/mybusinessboss-cover.png",
        en: "/images/mybusinessboss-cover-en.png",
      },
    },
    {
      titleKey: translations.projects.freeapiTitle,
      descriptionKey: translations.projects.freeapiDesc,
      technologies: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Serverless Edge", "Anti-Scraping Shield", "REST API", "Lucide React"],
      slug: "free-api",
      imagePath: {
        tr: "/images/freeapi-cover.png",
        en: "/images/freeapi-cover-en.png",
      },
    },
    {
      titleKey: translations.projects.haberTitle,
      descriptionKey: translations.projects.haberDesc,
      technologies: ["Next.js 15", "React 19", "Tailwind CSS v4", "TypeScript", "MongoDB Atlas", "Playwright", "Telegram Bot API", "Google News SEO"],
      slug: "haber-portali",
      imagePath: {
        tr: "/images/haber-cover-v2.png",
        en: "/images/haber-cover-v2-en.png",
      },
    },
    {
      titleKey: translations.projects.bistTitle,
      descriptionKey: translations.projects.bistDesc,
      technologies: ["Python", "FastAPI", "Redis", "PostgreSQL", "Docker", "Tailwind CSS"],
      slug: "bist-ai",
      imagePath: {
        tr: "/images/bist-ai-cover.png",
        en: "/images/bist-ai-cover-en.png",
      },
    },
  ];


  return (
    <section id="projeler" className="w-full py-24 px-6 md:px-12 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-16 text-center flex flex-col items-center">
          <span className="text-xs font-bold tracking-[0.2em] text-brand-red dark:text-rose-400 uppercase block mb-3 font-sans text-center">
            {t(translations.projects.eyebrow)}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-jakarta text-foreground mb-4 text-center">
            {t(translations.projects.heading)}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground/80 font-sans font-light max-w-xl leading-relaxed text-center">
            {t(translations.projects.subheading)}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const currentImagePath = typeof project.imagePath === "object"
              ? (project.imagePath[locale] || project.imagePath.tr)
              : project.imagePath;

            return (
            <ScrollReveal key={project.slug} delay={index * 0.2} className="h-full">
              <Link href={localizedProjectPath(project.slug, locale)} className="group block h-full relative z-10 cursor-pointer">
                <div className="p-6 rounded-xl border border-zinc-300/80 dark:border-zinc-800/50 bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col justify-between h-full min-h-[380px] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 dark:hover:border-brand-red/40 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <div>
                    {currentImagePath ? (
                      <div className="w-full aspect-video rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300/70 dark:border-zinc-800/40 mb-6 flex items-center justify-center overflow-hidden relative">
                        <Image src={currentImagePath} alt={t(project.titleKey)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    ) : (
                      <div className="w-full aspect-video rounded-lg bg-zinc-200/40 dark:bg-zinc-900/50 border border-zinc-300/70 dark:border-zinc-800/40 mb-6 flex items-center justify-center overflow-hidden relative">
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
          );
          })}
        </div>

        <ScrollReveal className="mt-12 overflow-hidden rounded-3xl border border-brand-red/30 bg-gradient-to-br from-brand-red/[0.08] via-card/70 to-background p-8 md:p-10 backdrop-blur-md relative shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-jakarta text-2xl font-bold text-foreground">
                {locale === "en" ? "Need a Tailored System or Architecture?" : "Özel Bir Sistem veya Mimariye mi İhtiyacınız Var?"}
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {locale === "en"
                  ? "From high-throughput web scraping to autonomous AI workflows and enterprise SaaS architectures, explore dedicated services designed for scale."
                  : "Yüksek hacimli web kazımadan otonom yapay zekâ iş akışlarına ve kurumsal SaaS mimarilerine kadar projelerinize özel mühendislik çözümleri."}
              </p>
            </div>
            <Link
              href={locale === "en" ? "/en/contact" : "/iletisim"}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-red px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-brand-red/20 transition-all duration-300 hover:bg-red-700 hover:shadow-brand-red/35"
            >
              {locale === "en" ? "Request a Proposal" : "Teklif Alın & Danışın"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 border-t border-zinc-200/50 dark:border-zinc-800/60 pt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link href={localizedServicePath("web-scraping", locale)} className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-brand-red transition-colors">{locale === "en" ? "Web Scraping" : "Web Scraping Hizmeti"} <ArrowRight className="h-3.5 w-3.5" /></Link>
            <Link href={localizedServicePath("api-gelistirme", locale)} className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-brand-red transition-colors">{locale === "en" ? "API Development" : "API Geliştirme"} <ArrowRight className="h-3.5 w-3.5" /></Link>
            <Link href={localizedServicePath("yapay-zeka-otomasyon", locale)} className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-brand-red transition-colors">{locale === "en" ? "AI Automation" : "AI Otomasyon"} <ArrowRight className="h-3.5 w-3.5" /></Link>
            <Link href={localizedServicePath("ozel-yazilim-gelistirme", locale)} className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-brand-red transition-colors">{locale === "en" ? "Custom Software" : "Özel Yazılım"} <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </ScrollReveal>

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
