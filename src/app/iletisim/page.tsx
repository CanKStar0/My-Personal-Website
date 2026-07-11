import { Navbar } from "@/components/navbar";
import { Mail } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function IletisimPage() {
  const email = "canpolatkaya4@gmail.com";

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

        {/* Email Block */}
        <ScrollReveal>
          <a
            href={`mailto:${email}`}
            className="group mt-12 inline-flex items-center gap-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/60 backdrop-blur-sm px-7 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-[0_12px_40px_rgba(158,10,43,0.08)] dark:hover:shadow-[0_12px_40px_rgba(225,29,72,0.12)]"
            aria-label="E-posta gönder"
          >
            {/* Red accent dot */}
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red" />
            </span>

            {/* Mail icon */}
            <Mail className="w-5 h-5 text-brand-red stroke-[1.5] flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />

            {/* Email text */}
            <span className="text-base sm:text-xl md:text-2xl font-semibold font-jakarta tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand-red">
              {email}
            </span>

            {/* Arrow indicator */}
            <span className="ml-1 text-zinc-400 dark:text-zinc-600 text-sm transition-all duration-300 group-hover:text-brand-red group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </ScrollReveal>

      </main>
    </>
  );
}
