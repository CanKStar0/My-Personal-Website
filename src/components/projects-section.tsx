"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  slug: string;
}

interface Repo {
  name: string;
  description: string;
  technologies: string[];
  stars: number;
  slug: string;
}

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Berber Otomasyonu",
      description: "Telefon trafiğini bitiren, 7/24 otonom randevu ve müşteri yönetim sistemi.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
      slug: "berber-otomasyonu",
    },
    {
      title: "BIST AI",
      description: "Milyonlarca finansal veriyi sıfır hatayla işleyen analiz sistemi.",
      technologies: ["Python", "FastAPI", "Redis", "PostgreSQL", "Docker", "Tailwind CSS"],
      slug: "bist-ai",
    },
  ];

  const repos: Repo[] = [
    {
      name: "ai-vision-scraper",
      description: "Anti-bot engellerini yapay zeka ile aşan, ML destekli akıllı web veri kazıma motoru.",
      technologies: ["Python", "Puppeteer", "TensorFlow"],
      stars: 12,
      slug: "ai-vision-scraper",
    },
    {
      name: "API Showcase",
      description: "Hızlı entegrasyonlar için geliştirilmiş, dökümantasyonu hazır REST API mimarisi.",
      technologies: ["TypeScript", "Express", "Swagger"],
      stars: 5,
      slug: "api-showcase",
    },
  ];

  return (
    <section id="projeler" className="w-full py-24 px-6 md:px-12 bg-background">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header (Centered) */}
        <div className="mb-16 text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.2em] text-brand-red uppercase block mb-3 font-sans text-center"
          >
            Portfolyo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight font-jakarta text-foreground mb-4 text-center"
          >
            Öne Çıkan Çalışmalar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground/80 font-sans font-light max-w-xl leading-relaxed text-center"
          >
            Esnaflar ve işletmeler için yüksek dönüşümlü somut fayda; yazılım ekipleri ve İK uzmanları için temiz kod ve sürdürülebilir mimari.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="h-full"
            >
              <Link href={`/projeler/${project.slug}`} className="group block h-full">
                <div className="p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col justify-between h-full min-h-[380px] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 dark:hover:border-brand-red/30 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  
                  {/* Card Content */}
                  <div>
                    {/* Visual Card Image Placeholder */}
                    <div className="w-full aspect-video rounded-lg bg-zinc-200/40 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/40 mb-6 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.25)_100%)] pointer-events-none" />
                      <span className="text-zinc-400/50 dark:text-zinc-600/50 text-[10px] md:text-xs font-semibold tracking-widest uppercase font-sans">
                        Görsel Hazırlanıyor
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-jakarta text-foreground group-hover:text-brand-red transition-colors duration-200 mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground/90 text-sm leading-relaxed font-sans font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Part: Tech Badges */}
                  <div className="border-t border-zinc-200/40 dark:border-zinc-800/40 pt-5 mt-8">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-zinc-100 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-800/40 transition-colors duration-200 group-hover:bg-brand-red/5 dark:group-hover:bg-brand-red/5 group-hover:text-brand-red dark:group-hover:text-brand-red/90 group-hover:border-brand-red/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Open Source Section (Centered) */}
        <div className="mt-28 mb-16 text-center flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-jakarta text-foreground mb-4 text-center">
            Açık Kaynak & Repolar
          </h2>
          <p className="text-sm md:text-base text-muted-foreground/80 font-sans font-light max-w-xl leading-relaxed text-center">
            Geliştirici topluluğuna sunduğum açık kaynaklı projeler, kütüphaneler ve hazır entegrasyonlar.
          </p>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="h-full"
            >
              <Link href={`/projeler/${repo.slug}`} className="group block h-full">
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
                        <span className="text-xs font-semibold font-sans leading-none">{repo.stars}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground/90 text-xs md:text-sm leading-relaxed font-sans font-light">
                      {repo.description}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="border-t border-zinc-200/40 dark:border-zinc-800/40 pt-4 mt-6">
                    <div className="flex flex-wrap gap-2">
                      {repo.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-zinc-100 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-800/40 transition-colors duration-200 group-hover:bg-brand-red/5 dark:group-hover:bg-brand-red/5 group-hover:text-brand-red dark:group-hover:text-brand-red/90 group-hover:border-brand-red/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
