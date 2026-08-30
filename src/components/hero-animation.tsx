"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SpotlightButton } from "./spotlight-button";
import { useLanguage } from "./language-context";
import { translations } from "@/lib/translations";
import { trackEvent } from "@/lib/analytics";
import { localizedProjectPath, localizedServicePath } from "@/lib/i18n";
import { Rocket, Mouse, Box, ArrowRight, Bot, Cpu, Database, Layers, Sparkles } from "lucide-react";

export function HeroAnimation() {
  const { locale, t } = useLanguage();
  const name = "CANPOLAT KAYA";
  const nameLetters = name.split("");

  useEffect(() => {
    // Force browser to scroll to top on page refresh and ignore cached scroll positions
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  const lineSweepDuration = 1.4;
  const lineDelay = 0.4;

  const quickPills = [
    {
      label: t(translations.hero.tagScraping),
      href: localizedServicePath("web-scraping", locale),
      icon: Layers,
    },
    {
      label: t(translations.hero.tagAi),
      href: localizedServicePath("yapay-zeka-otomasyon", locale),
      icon: Bot,
    },
    {
      label: t(translations.hero.tagSaas),
      href: localizedProjectPath("mybusinessboss", locale),
      icon: Sparkles,
    },
    {
      label: t(translations.hero.tagApi),
      href: localizedServicePath("api-gelistirme", locale),
      icon: Database,
    },
    {
      label: t(translations.hero.tagNextjs),
      href: localizedServicePath("nextjs-gelistirme", locale),
      icon: Cpu,
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden select-none px-4 pb-20 md:pb-28 bg-background dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-red-950/20 dark:via-zinc-950 dark:to-black transition-colors duration-300">
      
      {/* Noble Red Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: lineDelay + lineSweepDuration - 0.2,
          duration: 1.2,
          ease: "easeOut",
        }}
        className="absolute -z-10 h-64 w-64 md:h-80 md:w-80 rounded-full bg-brand-red/10 blur-[85px] dark:bg-brand-red/15"
      />

      <div className="relative flex flex-col items-center justify-center w-full max-w-5xl mx-auto pt-8">
        
        {/* Name Header (Stagger Reveal) */}
        <div className="relative py-4 px-2 sm:px-6 md:px-8 flex items-center justify-center w-fit max-w-full">
          <h1 className="relative text-xl sm:text-4xl md:text-6xl font-extrabold tracking-wider font-jakarta text-foreground flex whitespace-nowrap leading-none">
            {/* 3D Spinning Red Cube */}
            <motion.div
              className="absolute top-1/2 -mt-2.5 sm:-mt-4 md:-mt-5 w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 z-20 text-brand-red drop-shadow-[0_0_12px_rgba(220,38,38,0.8)]"
              initial={{ left: "0%", opacity: 0, rotate: 0 }}
              animate={{ left: "100%", opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{
                left: { duration: lineSweepDuration * 0.45, delay: lineDelay, ease: "easeOut" },
                rotate: { duration: lineSweepDuration * 0.9, delay: lineDelay, ease: "linear" },
                opacity: { duration: lineSweepDuration * 0.9, delay: lineDelay, times: [0, 0.05, 0.95, 1] }
              }}
            >
              <Box className="w-full h-full" strokeWidth={1} />
            </motion.div>

            {nameLetters.map((char, index) => {
              const progress = index / nameLetters.length;
              const letterDelay = lineDelay + progress * (lineSweepDuration * 0.7);

              return (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: letterDelay,
                    duration: 0.12,
                    ease: "easeOut",
                  }}
                  className={char === " " ? "w-[0.25em]" : ""}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </h1>
        </div>

        {/* Subtle Red Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            delay: lineDelay + lineSweepDuration + 0.1,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="w-12 h-[2px] bg-brand-red/40 rounded-full mt-6"
        />

        {/* Subtitle / Title Description */}
        <div className="h-10 mt-4 overflow-hidden flex items-center justify-center">
          <motion.p
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: lineDelay + lineSweepDuration + 0.2,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-xs font-light tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.4em] sm:text-sm md:text-base text-muted-foreground font-sans text-center px-4 uppercase"
          >
            {t(translations.hero.subtitle)}
          </motion.p>
        </div>

        {/* Dual CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: lineDelay + lineSweepDuration + 0.4,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <SpotlightButton
            href={locale === "en" ? "/en/projects" : "/projeler"}
            onClick={() => trackEvent("project_case_study_click", { location: "hero" })}
            className="text-xs sm:text-sm tracking-[0.15em] uppercase"
          >
            <Rocket className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            {t(translations.hero.cta)}
          </SpotlightButton>

          <Link
            href={locale === "en" ? "/en/services" : "/hizmetler"}
            onClick={() => trackEvent("hero_services_click", { location: "hero_secondary" })}
            className="group relative inline-flex items-center gap-2 rounded-full border border-zinc-300/80 dark:border-zinc-800 bg-background/80 dark:bg-zinc-900/50 px-6 py-3 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-foreground backdrop-blur-md transition-all duration-300 hover:border-brand-red/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-brand-red/10"
          >
            {t(translations.hero.ctaSecondary)}
            <ArrowRight className="w-4 h-4 text-brand-red transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Quick Capability Tags */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: lineDelay + lineSweepDuration + 0.6,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-2xl px-4"
        >
          {quickPills.map((pill, i) => {
            const Icon = pill.icon;
            return (
              <Link
                key={i}
                href={pill.href}
                onClick={() => trackEvent("hero_pill_click", { pill: pill.label })}
                className="group flex items-center gap-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-zinc-900/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-brand-red/40 hover:bg-brand-red/5 hover:text-foreground dark:hover:border-rose-500/40 dark:hover:bg-rose-500/10"
              >
                <Icon className="w-3.5 h-3.5 text-brand-red/70 dark:text-rose-400 group-hover:scale-110 transition-transform duration-200" />
                <span>{pill.label}</span>
              </Link>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll Down Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: lineDelay + lineSweepDuration + 0.8, duration: 1 }}
        className="absolute bottom-10 sm:bottom-14 flex flex-col items-center justify-center animate-bounce pointer-events-none"
      >
        <Mouse className="w-5 h-5 text-brand-red/50 dark:text-brand-red/60 opacity-80" strokeWidth={1.5} />
      </motion.div>

    </div>
  );
}
