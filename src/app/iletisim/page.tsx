"use client";

import { Navbar } from "@/components/navbar";
import { Mail, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SpotlightButton } from "@/components/spotlight-button";
import { useLanguage } from "@/components/language-context";
import { translations } from "@/lib/translations";
import { trackEvent } from "@/lib/analytics";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";

export default function IletisimPage() {
  const email = "canpolatkaya4@gmail.com";
  const { t, locale } = useLanguage();

  const handleMailClick = () => {
    trackEvent("contact_email_click", { location: "contact_page" });
  };

  const handleWhatsAppClick = () => {
    trackEvent("contact_whatsapp_click", { location: "contact_page" });
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background px-4 py-16 sm:px-6 md:py-24 text-center">
        {/* Eyebrow */}
        <span className="uppercase tracking-[0.3em] text-[10px] sm:text-xs font-semibold text-zinc-600 dark:text-zinc-400 select-none mb-4">
          {t(translations.contact.eyebrow)}
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-jakarta text-foreground leading-tight max-w-3xl">
          {t(translations.contact.heading).split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && " "}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm md:text-base text-muted-foreground/80 font-sans font-light leading-relaxed max-w-lg">
          {t(translations.contact.subtitle)}
        </p>

        {/* Interactive B2B Contact Form */}
        <div className="w-full mt-10">
          <ContactForm locale={locale} />
        </div>

        {/* Direct Contact Options */}
        <ScrollReveal>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <SpotlightButton
              href={`mailto:${email}`}
              onClick={handleMailClick}
              className="text-sm sm:text-base font-semibold font-jakarta"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              <Mail className="w-4 h-4 text-brand-red stroke-[1.5] flex-shrink-0" />
              <span>{email}</span>
              <span className="ml-1 text-zinc-500 text-xs">↗</span>
            </SpotlightButton>

            <a
              href={`https://wa.me/905436214152?text=${
                locale === "en"
                  ? "Hello%20Canpolat,%20I'm%20reaching%20out%20from%20your%20website%20regarding%20a%20project."
                  : "Merhaba%20Canpolat%20Bey,%20web%20sitenizden%20ula%C5%9F%C4%B1yorum.%20Bir%20proje%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
              }`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-600 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50 dark:text-emerald-400 font-jakarta shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp: +90 543 621 41 52</span>
              <span className="ml-1 text-emerald-500/70 text-xs">↗</span>
            </a>
          </div>
        </ScrollReveal>
      </main>
      <SiteFooter />
    </>
  );
}
