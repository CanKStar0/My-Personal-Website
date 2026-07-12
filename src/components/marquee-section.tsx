"use client";

import { motion } from "framer-motion";

export function MarqueeSection() {
  const skills = [
    "Frontend",
    "Backend",
    "Web Scraping",
    "AI Automation",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
  ];

  // Double skills list to ensure seamless infinite horizontal loop
  const doubledSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="w-full overflow-hidden py-4 border-y border-border/5 bg-background/30 backdrop-blur-xs select-none">
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap gap-8 text-lg md:text-xl font-semibold text-zinc-400 dark:text-zinc-300 uppercase tracking-widest"
      >
        {doubledSkills.map((skill, i) => (
          <span key={i} className="flex items-center gap-8 group cursor-default">
            <span className="transition-colors duration-300 group-hover:text-red-500">{skill}</span>
            <span className="text-brand-red/30">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
