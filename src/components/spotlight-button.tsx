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
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to the button's top-left (for spotlight)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top } = ref.current.getBoundingClientRect();
    
    // Spotlight position
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const commonProps = {
    ref: ref as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onClick,
    className: `relative overflow-hidden bg-transparent border border-zinc-800 hover:border-brand-red/60 text-zinc-300 rounded-full px-8 py-3 font-medium transition-colors duration-300 group cursor-pointer inline-flex items-center justify-center ${className}`
  };

  const innerContent = (
    <>
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(220, 38, 38, 0.15), transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} {...commonProps}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button {...commonProps}>
      {innerContent}
    </button>
  );
}
