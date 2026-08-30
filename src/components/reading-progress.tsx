"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollHeight > 0 ? Math.min(Math.max(currentScroll / scrollHeight, 0), 1) : 0;
      
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${ratio})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent pointer-events-none"
      role="progressbar"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-brand-red via-rose-500 to-amber-500 will-change-transform shadow-[0_0_8px_rgba(220,38,38,0.6)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
