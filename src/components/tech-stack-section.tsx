import { ScrollReveal } from "./scroll-reveal";

export function TechStackSection() {
  const categories = [
    {
      title: "Frontend",
      technologies: ["TypeScript", "Framer Notion", "Next.js", "React", "Tailwind CSS"],
    },
    {
      title: "Backend",
      technologies: ["JavaScript", "Redis", "Playwright", "Python", "Node.js", "RESTAPI", "FastAPI"],
    },
    {
      title: "Veritabanı & Altyapı",
      technologies: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Docker", "Git"],
    },
  ];

  return (
    <section id="araclar" className="w-full pb-24 md:pb-32 px-6 bg-background flex justify-center scroll-mt-16">
      <div className="max-w-5xl w-full flex flex-col items-center">

        <ScrollReveal>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-jakarta text-foreground mb-16 text-center">
            Kullandığım Teknolojiler
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {categories.map((category, index) => (
            <ScrollReveal
              key={category.title}
              delay={index * 0.2}
              className="flex flex-col items-center md:items-start p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold font-jakarta text-foreground mb-6 text-center md:text-left">
                {category.title}
              </h3>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs transition-colors hover:border-brand-red/40 dark:hover:border-brand-red/40 hover:text-brand-red dark:hover:text-brand-red"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
