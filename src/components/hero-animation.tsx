"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden select-none px-4 bg-background transition-colors duration-300">
      
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
          <h1 className="text-3xl font-extrabold tracking-wider sm:text-5xl md:text-6xl font-jakarta text-foreground flex whitespace-nowrap leading-none">
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

        {/* Subtitle / Title Description */}
        <div className="h-10 mt-6 overflow-hidden flex items-center justify-center">
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
      </div>

    </div>
  );
}
