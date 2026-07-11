"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  technologies: string[];
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

  return (
    <section id="projeler" className="w-full py-24 px-6 md:px-12 bg-background border-t border-border/10">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.2em] text-brand-red uppercase block mb-3 font-sans"
          >
            Portfolyo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight font-jakarta text-foreground mb-4"
          >
            Öne Çıkan Çalışmalar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground/80 font-sans font-light max-w-xl leading-relaxed"
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
                <div className="p-8 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col justify-between h-full min-h-[220px] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 dark:hover:border-brand-red/30 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  
                  {/* Top Part: Client-Focused (Title & Description) */}
                  <div>
                    <h3 className="text-xl font-bold font-jakarta text-foreground group-hover:text-brand-red transition-colors duration-200 mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground/90 text-sm leading-relaxed font-sans font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Part: Developer-Focused Tech Badges */}
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

      </div>
    </section>
  );
}
