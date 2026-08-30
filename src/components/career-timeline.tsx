"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2, MapPin, Sparkles, Award } from "lucide-react";
import type { Locale } from "@/lib/translations";

interface CareerTimelineProps {
  locale?: Locale;
}

export function CareerTimeline({ locale = "tr" }: CareerTimelineProps) {
  const isEn = locale === "en";

  const timelineItems = [
    {
      id: "dcm",
      period: isEn ? "2026 — Present" : "2026 — Günümüz",
      title: isEn ? "Full-Stack Developer" : "Full-Stack Developer",
      organization: "Dotcom Media (DCM)",
      badge: isEn ? "Active Role" : "Aktif Rol",
      badgeType: "active" as const,
      icon: Briefcase,
      description: isEn
        ? "Engineering high-performance web applications, scalable API integrations, and robust data-driven system architectures."
        : "Yüksek performanslı modern web uygulamaları, ölçeklenebilir API entegrasyonları ve veri odaklı sistem mimarilerinin geliştirilmesi.",
      skills: ["Next.js", "React 19", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs"],
    },
    {
      id: "freelance",
      period: isEn ? "2025 — Present" : "2025 — Günümüz",
      title: isEn ? "Independent Software Engineer" : "Bağımsız & Freelance Yazılım Geliştirici",
      organization: isEn ? "Autonomous Solutions & Consulting" : "Özel Projeler & Danışmanlık",
      badge: isEn ? "Specialized" : "Uzmanlık",
      badgeType: "highlight" as const,
      icon: Code2,
      description: isEn
        ? "Building stealth web scraping pipelines, anti-bot bypass architectures, custom AI agent workflows, and tailored backend systems."
        : "Anti-bot korumalarına dayanıklı otonom web scraping sistemleri, özel AI iş akışları, Redis kuyrukları ve işletmelere özel backend sistemleri.",
      skills: ["Playwright", "FastAPI", "Python", "Redis", "MongoDB", "AI Workflows"],
    },
    {
      id: "university",
      period: "2024 — 2026",
      title: isEn ? "Associate Degree in Computer Programming" : "Bilgisayar Programcılığı",
      organization: isEn ? "Tokat Gaziosmanpasa University" : "Tokat Gaziosmanpaşa Üniversitesi",
      badge: isEn ? "Graduated 2nd in Department (High Honors)" : "Bölüm İkinciliği (Onur Derecesi)",
      badgeType: "honor" as const,
      icon: GraduationCap,
      description: isEn
        ? "Completed rigorous coursework in algorithms, database design, object-oriented programming, and system architecture with academic honors."
        : "Algoritmalar, ilişkisel veritabanı tasarımı, nesne yönelimli programlama ve sistem mimarisi temellerini başarıyla tamamlayarak bölüm ikinciliği ile mezuniyet.",
      skills: isEn
        ? ["Algorithms", "Data Structures", "Database Architecture", "OOP", "Software Design"]
        : ["Algoritmalar", "Veri Yapıları", "Veritabanı Mimarisi", "OOP", "Yazılım Tasarımı"],
    },
  ];

  return (
    <section className="my-16 overflow-x-clip">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-jakarta text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {isEn ? "Experience & Education" : "Kariyer & Eğitim Zaman Çizelgesi"}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isEn
              ? "Academic foundation combined with production-grade engineering experience."
              : "Akademik temel ile canlı üretim ortamının birleşimi."}
          </p>
        </div>
      </div>

      <div className="relative mt-12 space-y-8 pl-6 sm:pl-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-brand-red before:via-brand-red/40 before:to-transparent">
        {timelineItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Pulsing Node */}
              <div className="absolute -left-[22px] sm:-left-[26px] top-5 flex h-6 w-6 items-center justify-center rounded-full border border-brand-red/50 bg-background shadow-[0_0_12px_rgba(220,38,38,0.3)] transition-transform duration-300 group-hover:scale-125">
                <div className="h-2 w-2 rounded-full bg-brand-red" />
              </div>

              {/* Card */}
              <div className="rounded-3xl border border-border/70 bg-card/40 p-6 md:p-8 backdrop-blur-xs transition-all duration-300 hover:border-brand-red/40 hover:bg-card/70 hover:shadow-[0_0_30px_rgba(220,38,38,0.06)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-jakarta text-lg font-bold text-foreground sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-muted-foreground">{item.organization}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Badge */}
                    {item.badgeType === "active" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {item.badge}
                      </span>
                    )}
                    {item.badgeType === "honor" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                        <Award className="h-3.5 w-3.5 text-amber-500" />
                        {item.badge}
                      </span>
                    )}
                    {item.badgeType === "highlight" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red dark:text-rose-400 border border-brand-red/20">
                        <Sparkles className="h-3.5 w-3.5" />
                        {item.badge}
                      </span>
                    )}

                    <span className="rounded-lg border border-border/60 bg-background/80 px-2.5 py-1 text-xs font-mono font-medium text-foreground/80">
                      {item.period}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border/60 bg-background/50 px-2 py-1 text-[11px] font-medium text-muted-foreground group-hover:border-border transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Location / Remote Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="relative group"
        >
          <div className="absolute -left-[22px] sm:-left-[26px] top-5 flex h-6 w-6 items-center justify-center rounded-full border border-blue-500/50 bg-background shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-125">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </div>

          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.03] p-6 md:p-8 backdrop-blur-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-jakarta text-lg font-bold text-foreground">
                  {isEn ? "Mugla, Fethiye (Turkey)" : "Muğla, Fethiye"}
                </h3>
                <p className="text-xs font-medium text-blue-500 dark:text-blue-400">
                  {isEn ? "Remote / Global Operations" : "Remote / Küresel Operasyon"}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {isEn
                ? "Operating remotely with deep focus, delivering high-reliability systems for clients across Turkey and worldwide."
                : "Fethiye'de derin odaklanma (deep work) disipliniyle hem Türkiye genelinde hem de küresel çaptaki projelere uzaktan kesintisiz üretim."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
