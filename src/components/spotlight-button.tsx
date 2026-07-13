"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";

interface SpotlightButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function SpotlightButton({ children, className = "", href, onClick }: SpotlightButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseEnter = () => setIsHovered(true);

  const innerContent = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative overflow-hidden bg-transparent border border-zinc-400 dark:border-zinc-700 hover:border-brand-red/70 dark:hover:border-brand-red/60 text-foreground/75 dark:text-zinc-300 rounded-full px-8 py-3 font-medium transition-colors duration-300 group cursor-pointer ${className}`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(220, 38, 38, 0.15), transparent 80%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="inline-block cursor-pointer"
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <div className="inline-block cursor-pointer" onClick={onClick}>
      {innerContent}
    </div>
  );
}
