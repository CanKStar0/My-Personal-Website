"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Mouse, Box } from "lucide-react";

export function HeroAnimation() {
  const [mounted, setMounted] = useState(false);
  const name = "CANPOLAT KAYA";
  const nameLetters = name.split("");

  useEffect(() => {
    setMounted(true);
    // Force browser to scroll to top on page refresh and ignore cached scroll positions
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  const lineSweepDuration = 1.4;
  const lineDelay = 0.4;

  if (!mounted) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center pt-8">
          <h1 className="text-3xl font-extrabold tracking-wider sm:text-5xl md:text-6xl font-jakarta text-foreground opacity-0">
            {name}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden select-none px-4 pb-20 md:pb-32 bg-background dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-red-950/20 dark:via-zinc-950 dark:to-black transition-colors duration-300">
      
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
        <div className="relative py-4 px-8 flex items-center justify-center w-fit">
          <h1 className="relative text-3xl font-extrabold tracking-wider sm:text-5xl md:text-6xl font-jakarta text-foreground flex whitespace-nowrap leading-none">
            {/* 3D Spinning Red Cube */}
            <motion.div
              className="absolute top-1/2 -mt-4 md:-mt-5 w-8 h-8 md:w-10 md:h-10 z-20 text-brand-red drop-shadow-[0_0_12px_rgba(220,38,38,0.8)]"
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: lineDelay + lineSweepDuration + 0.2,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] sm:text-sm md:text-base text-muted-foreground font-sans text-center px-4 uppercase"
          >
            Fullstack Developer & AI Otomasyon Uzmanı
          </motion.p>
        </div>

        {/* Ghost Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: lineDelay + lineSweepDuration + 0.4,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mt-10"
        >
          <a
            href="/projeler"
            className="group inline-flex items-center justify-center px-8 py-3 rounded-full text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 border border-zinc-300 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:border-brand-red/50 hover:text-brand-red dark:hover:border-brand-red/60 dark:hover:text-brand-red hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] dark:hover:bg-brand-red/5"
          >
            <Rocket className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            Çalışmaları Keşfet
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: lineDelay + lineSweepDuration + 0.8, duration: 1 }}
        className="absolute bottom-16 sm:bottom-24 flex flex-col items-center justify-center animate-bounce"
      >
        <Mouse className="w-6 h-6 text-brand-red/50 dark:text-brand-red/60 opacity-80" strokeWidth={1.5} />
      </motion.div>

    </div>
  );
}
