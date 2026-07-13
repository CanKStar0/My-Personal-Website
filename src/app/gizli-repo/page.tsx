"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/components/language-context";
import { translations } from "@/lib/translations";

export default function GizliRepoPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <ScrollReveal className="flex flex-col items-center text-center max-w-2xl">
          {/* Icon */}
          <div className="mb-8 p-6 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <Shield className="w-12 h-12 text-zinc-400 dark:text-zinc-500" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-jakarta text-foreground mb-6">
            {t(translations.gizliRepo.title)}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground font-sans font-light leading-relaxed mb-12">
            {t(translations.gizliRepo.description)}
          </p>

          {/* Action Button */}
          <Link 
            href="/projeler" 
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-foreground font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            {t(translations.gizliRepo.backButton)}
          </Link>
        </ScrollReveal>
      </main>
    </>
  );
}
