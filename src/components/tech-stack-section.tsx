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
    <section id="araclar" className="w-full py-20 px-6 bg-background flex justify-center scroll-mt-16">
      <div className="max-w-6xl w-full flex flex-col items-center">

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
              className="flex flex-col items-center md:items-start p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/40 shadow-sm dark:shadow-none hover:border-red-900/40 hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-lg font-bold font-jakarta text-foreground mb-6 text-center md:text-left">
                {category.title}
              </h3>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-zinc-100 dark:bg-zinc-950/50 text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800/80 transition-colors hover:border-red-500 hover:text-red-600 dark:hover:border-red-900/60 dark:hover:text-red-500"
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
