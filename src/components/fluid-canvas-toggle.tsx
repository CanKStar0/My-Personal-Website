"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Palette } from "lucide-react";
import { useLanguage } from "@/components/language-context";

export function FluidCanvasToggle() {
  const [isActive, setIsActive] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isActive) {
      // Prevent scrolling on mobile & touch devices while in canvas mode
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocOverflow = document.documentElement.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsActive(false);
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocOverflow;
        document.body.style.touchAction = originalTouchAction;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isActive]);

  return (
    <>
      {/* Full-screen touch capture overlay when canvas mode is active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pointer-events-auto touch-none"
            style={{ touchAction: "none" }}
          >
            {/* Top Control Bar with Glassmorphism */}
            <div className="absolute top-4 inset-x-0 flex justify-center items-center px-4 pointer-events-auto">
              <motion.div
                initial={{ y: -20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-zinc-950/85 border border-red-500/30 text-white backdrop-blur-md shadow-2xl shadow-red-950/40"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <span className="text-xs md:text-sm font-medium tracking-wide text-zinc-200">
                    {t({
                      tr: "İnteraktif Tuval Aktif",
                      en: "Interactive Canvas Active",
                    })}
                  </span>
                </div>

                <div className="h-4 w-px bg-zinc-800" />

                <button
                  type="button"
                  onClick={() => setIsActive(false)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-red-600/90 hover:bg-red-600 text-white transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>
                    {t({
                      tr: "Kapat",
                      en: "Close",
                    })}
                  </span>
                </button>
              </motion.div>
            </div>

            {/* Bottom Hint Tip */}
            <div className="absolute bottom-6 inset-x-0 flex justify-center px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-sm text-[11px] md:text-xs text-zinc-400 font-mono tracking-tight"
              >
                {t({
                  tr: "👆 Ekrana dokunup serbestçe kaydırarak çizin",
                  en: "👆 Touch and drag freely across the screen",
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mode Toggle Pill Button */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="fixed bottom-5 right-5 z-25 pointer-events-auto md:hidden"
          >
            <button
              type="button"
              onClick={() => setIsActive(true)}
              aria-label="Toggle Fluid Canvas Mode"
              className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-zinc-950/85 hover:bg-zinc-900 border border-red-500/30 hover:border-red-500/60 text-zinc-200 hover:text-white backdrop-blur-md shadow-lg shadow-black/60 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <Palette className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" />
                <Sparkles className="w-2.5 h-2.5 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xs font-semibold tracking-wide">
                {t({
                  tr: "Akışkan Tuval",
                  en: "Fluid Canvas",
                })}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
