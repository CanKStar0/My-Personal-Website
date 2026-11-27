"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactIntake } from "@/components/contact-intake";
import { JsonLd } from "@/components/json-ld";
import { useLanguage } from "@/components/language-context";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";
import { translations } from "@/lib/translations";

function ContactIntakeFallback() {
  return (
    <div
      className="h-[540px] rounded-2xl border border-border bg-card p-6 sm:p-8"
      aria-busy="true"
      aria-label="Loading form"
    >
      <div className="h-6 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="h-11 animate-pulse rounded-xl bg-muted" />
        <div className="h-11 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="mt-4 h-11 animate-pulse rounded-xl bg-muted" />
      <div className="mt-4 h-32 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}

export default function IletisimPage() {
  const { locale, t } = useLanguage();
  const isEn = locale === "en";
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      trackEvent("contact_email_copy", { location: "contact_page" });
      toast.success(t(translations.contact.toast));
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      toast.error(isEn ? "Could not copy email." : "E-posta kopyalanamadı.");
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: isEn ? `Contact | ${SITE_NAME}` : `İletişim | ${SITE_NAME}`,
    url: isEn ? `${SITE_URL}/en/contact` : `${SITE_URL}/iletisim`,
    inLanguage: isEn ? "en" : "tr-TR",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      email: CONTACT_EMAIL,
      url: SITE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "sales",
        availableLanguage: ["Turkish", "English"],
      },
    },
  };

  const processSteps = isEn
    ? [
        {
          title: "Scope & Feasibility",
          desc: "I review your goals, target systems, and edge cases within 24 hours.",
        },
        {
          title: "Architecture & Quote",
          desc: "You get a clear technical plan, fixed milestone estimate, and delivery schedule.",
        },
        {
          title: "Build & Handover",
          desc: "Iterative delivery with clean TypeScript/Python code, documentation, and deployment.",
        },
      ]
    : [
        {
          title: "Kapsam & Fizibilite",
          desc: "Hedeflerinizi, entegre edilecek sistemleri ve riskleri 24 saat içinde incelerim.",
        },
        {
          title: "Mimari & Net Teklif",
          desc: "Size teknik yaklaşım, kilometre taşları ve net teslimat takvimi sunarım.",
        },
        {
          title: "Geliştirme & Teslimat",
          desc: "Temiz kod, dokümantasyon ve canlı ortam kurulumu ile projeyi teslim ederim.",
        },
      ];

  return (
    <>
      <JsonLd data={contactSchema} />
      <Navbar />
      <main className="flex-1 bg-background px-4 sm:px-6 pb-24 pt-12 md:px-12 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={
              isEn
                ? [
                    { label: "Home", href: "/en" },
                    { label: "Contact", href: "/en/contact" },
                  ]
                : [
                    { label: "Ana Sayfa", href: "/" },
                    { label: "İletişim", href: "/iletisim" },
                  ]
            }
          />

          <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* Left Editorial & Direct Channels Column */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 px-3.5 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                <span>{t(translations.contact.availabilityLabel)}</span>
              </div>

              <h1 className="mt-5 font-jakarta text-3xl font-extrabold tracking-tight text-foreground text-balance sm:text-4xl md:text-5xl">
                {t(translations.contact.heading)}
              </h1>

              <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground text-pretty">
                {t(translations.contact.subtitle)}
              </p>

              {/* Direct Channels */}
              <div className="mt-8 space-y-3 border-t border-border pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    onClick={() => trackEvent("contact_email_click", { location: "contact_page" })}
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-red/50"
                  >
                    <Mail className="size-4 text-brand-red" aria-hidden="true" />
                    <span>{CONTACT_EMAIL}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={isEn ? "Copy email address" : "E-posta adresini kopyala"}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-card px-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copiedEmail ? (
                      <Check className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    ) : (
                      <Copy className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{t(translations.contact.responseTimeLabel)}</span>
                </div>

                <div className="flex flex-wrap gap-4 pt-2 text-sm font-medium">
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                  <Link
                    href={isEn ? "/en/services" : "/hizmetler"}
                    className="inline-flex min-h-9 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{isEn ? "Services & Scope Calculator" : "Hizmetler & Kapsam Hesaplayıcı"}</span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Clean Sequential Process List (no nested cards) */}
              <div className="mt-8 border-t border-border pt-6">
                <h2 className="font-jakarta text-base font-bold text-foreground">
                  {isEn ? "How we work together" : "Çalışma süreci"}
                </h2>
                <ol className="mt-4 space-y-4">
                  {processSteps.map((step, index) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs font-bold text-foreground tabular-nums">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{step.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                          {step.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right Interactive Scope Intake Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={<ContactIntakeFallback />}>
                <ContactIntake locale={locale} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
