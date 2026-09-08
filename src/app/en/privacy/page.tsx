import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy & Terms of Use",
  description:
    "Canpolat Kaya personal engineering website privacy policy, cookies, GDPR compliance statement, and terms of use.",
  path: "/en/privacy",
});

export default function PrivacyPageEn() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy & Terms of Use",
    url: `${SITE_URL}/en/privacy`,
    description: "Protection of personal data, analytics cookies, and website terms.",
    publisher: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
    },
    inLanguage: "en",
  };

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <article className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/en" },
              { label: "Privacy Policy & Terms", href: "/en/privacy" },
            ]}
          />

          <header className="border-b border-border/40 pb-8 pt-4">
            <div className="flex items-center gap-3 text-brand-red dark:text-rose-400 mb-3">
              <ShieldCheck className="h-6 w-6" />
              <span className="text-xs font-bold uppercase tracking-widest">Transparency & Trust</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-jakarta text-foreground">
              Privacy Policy & Terms of Use
            </h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Last updated: January 1, 2026. Transparent disclosure regarding your privacy rights, data handling, and acceptable use of this engineering portfolio.
            </p>
          </header>

          <div className="prose prose-zinc dark:prose-invert mt-12 max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-foreground sm:text-2xl font-jakarta">
                <Lock className="h-5 w-5 text-brand-red dark:text-rose-400" />
                1. Overview & Data Controller
              </h2>
              <p>
                This website (<strong>{SITE_URL}</strong>) is operated by independent software engineer and Full-Stack Developer <strong>Canpolat Kaya</strong>. We fully respect your privacy and adhere to the General Data Protection Regulation (GDPR) and local data privacy laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-foreground sm:text-2xl font-jakarta">
                <Eye className="h-5 w-5 text-brand-red dark:text-rose-400" />
                2. Data Collection & Analytics Cookies
              </h2>
              <p>
                We do not harvest unnecessary personal data, and we never sell your data to third parties. We only process:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Technical & Analytics Data:</strong> Visited pages, device type, screen resolution, and generative AI referral sources (ChatGPT, Perplexity, etc.) measured via Google Analytics 4 (GA4) with anonymized IP addresses.
                </li>
                <li>
                  <strong>Inquiries & Contact:</strong> Email address and message details you directly provide when reaching out for consulting or engineering inquiries.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-foreground sm:text-2xl font-jakarta">
                <FileText className="h-5 w-5 text-brand-red dark:text-rose-400" />
                3. Intellectual Property & Terms
              </h2>
              <p>
                All technical articles, architectural breakdowns, code walkthroughs, and case studies published on this site are authored by Canpolat Kaya unless otherwise stated. Open-source repositories adhere to their respective repository licenses (MIT/Apache).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl font-jakarta">
                4. Inquiries & Data Subject Rights
              </h2>
              <p>
                For any questions regarding personal data or privacy inquiries, contact:
              </p>
              <p className="font-mono text-sm text-foreground bg-muted/40 p-4 rounded-xl border border-border/40 inline-block">
                Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-red hover:underline">{CONTACT_EMAIL}</a>
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
