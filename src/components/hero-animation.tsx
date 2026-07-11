"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function HeroAnimation() {
  const [mounted, setMounted] = useState(false);
  const name = "CANPOLAT KAYA";
  const nameLetters = name.split("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-background">
        <h1 className="text-3xl font-extrabold tracking-wider sm:text-5xl md:text-6xl font-jakarta text-foreground opacity-0">
          {name}
        </h1>
      </div>
    );
  }

  // Timing configuration
  const lineSweepDuration = 1.4;
  const lineDelay = 0.4;

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden select-none px-4 bg-background transition-colors duration-300">
      {/* 3. Background Glow - Fades in after name reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: lineDelay + lineSweepDuration - 0.2,
          duration: 1.2,
          ease: "easeOut",
        }}
        className="absolute -z-10 h-48 w-48 md:h-64 md:w-64 rounded-full bg-cyan-500/10 blur-[80px] dark:bg-indigo-500/15"
      />

      <div className="relative flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
        {/* Name Container */}
        <div className="relative py-4 px-8 flex items-center justify-center w-fit">
          
          {/* 1. 3D Spinning Cube Sweeper */}
          <motion.div
            initial={{ left: "0%", opacity: 0 }}
            animate={{
              left: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              delay: lineDelay,
              duration: lineSweepDuration,
              ease: "easeInOut",
              times: [0, 0.08, 0.92, 1],
            }}
            className="absolute top-0 bottom-0 flex items-center -ml-6 z-10 pointer-events-none"
          >
            {/* 3D Cube Container */}
            <motion.div
              style={{ transformStyle: "preserve-3d" }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-10 h-10 md:w-12 md:h-12"
            >
              {/* Cube Faces - Styled with theme-aware neon border and semi-transparent glass background */}
              {/* Front */}
              <div
                className="absolute inset-0 border border-cyan-500/40 bg-cyan-500/10 dark:border-indigo-400/40 dark:bg-indigo-500/10 backdrop-blur-xs rounded-xs"
                style={{ transform: "translateZ(20px)" }}
              />
              {/* Back */}
              <div
                className="absolute inset-0 border border-cyan-500/40 bg-cyan-500/10 dark:border-indigo-400/40 dark:bg-indigo-500/10 backdrop-blur-xs rounded-xs"
                style={{ transform: "rotateY(180deg) translateZ(20px)" }}
              />
              {/* Left */}
              <div
                className="absolute inset-0 border border-cyan-500/40 bg-cyan-500/10 dark:border-indigo-400/40 dark:bg-indigo-500/10 backdrop-blur-xs rounded-xs"
                style={{ transform: "rotateY(-90deg) translateZ(20px)" }}
              />
              {/* Right */}
              <div
                className="absolute inset-0 border border-cyan-500/40 bg-cyan-500/10 dark:border-indigo-400/40 dark:bg-indigo-500/10 backdrop-blur-xs rounded-xs"
                style={{ transform: "rotateY(90deg) translateZ(20px)" }}
              />
              {/* Top */}
              <div
                className="absolute inset-0 border border-cyan-500/40 bg-cyan-500/10 dark:border-indigo-400/40 dark:bg-indigo-500/10 backdrop-blur-xs rounded-xs"
                style={{ transform: "rotateX(90deg) translateZ(20px)" }}
              />
              {/* Bottom */}
              <div
                className="absolute inset-0 border border-cyan-500/40 bg-cyan-500/10 dark:border-indigo-400/40 dark:bg-indigo-500/10 backdrop-blur-xs rounded-xs"
                style={{ transform: "rotateX(-90deg) translateZ(20px)" }}
              />
            </motion.div>
          </motion.div>

          {/* 2. Character Reveal (Average font size) */}
          <h1 className="text-3xl font-extrabold tracking-wider sm:text-5xl md:text-6xl font-jakarta text-foreground flex whitespace-nowrap leading-none">
            {nameLetters.map((char, index) => {
              const progress = index / nameLetters.length;
              const letterDelay = lineDelay + progress * (lineSweepDuration * 0.85);

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

        {/* 4. Subtitle / Title description */}
        <div className="h-10 mt-6 overflow-hidden flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: lineDelay + lineSweepDuration + 0.4,
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
