"use client";

import { Navbar } from "@/components/navbar";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SpotlightButton } from "@/components/spotlight-button";

export default function IletisimPage() {
  const email = "canpolatkaya4@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    toast("E-posta adresi panoya kopyalandı.");
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background px-6 text-center">

        {/* Eyebrow */}
        <span className="uppercase tracking-[0.3em] text-[10px] sm:text-xs font-semibold text-zinc-500 select-none mb-5">
          İletişim
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-jakarta text-foreground leading-tight max-w-2xl">
          Yeni bir projeniz<br />mi var?
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm md:text-base text-muted-foreground/80 font-sans font-light leading-relaxed max-w-md">
          Detayları konuşmak, fiyat teklifi almak veya sadece merhaba demek için bana ulaşın.
        </p>

        {/* Email Spotlight Button */}
        <ScrollReveal>
          <div className="mt-12 flex justify-center cursor-pointer">
            <SpotlightButton
              onClick={handleCopy}
              className="text-base sm:text-lg md:text-xl font-semibold font-jakarta group-hover:text-white"
            >
              {/* Red accent dot */}
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red" />
              </span>

              {/* Mail icon */}
              <Mail className="w-5 h-5 text-brand-red stroke-[1.5] flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />

              {/* Email text */}
              <span>{email}</span>

              {/* Arrow indicator (now a copy icon conceptually, but keeping original look) */}
              <span className="ml-1 text-zinc-500 text-sm transition-all duration-300 group-hover:text-brand-red group-hover:translate-x-0.5">
                ↗
              </span>
            </SpotlightButton>
          </div>
        </ScrollReveal>

      </main>
    </>
  );
}
