import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about Full-Stack Developer Canpolat Kaya's approach to custom software, web scraping, AI automation, backend systems, and modern web development.",
  path: "/en/about",
  locale: "en",
});

export default function EnglishAboutPage() {
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Full-Stack Developer & AI Automation Specialist",
      description:
        "Full-Stack Developer specializing in autonomous web scraping architectures, custom AI automations, scalable REST APIs, and Next.js applications.",
      sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
      knowsAbout: [
        "Web Scraping & Browser Automation",
        "Python & FastAPI",
        "Node.js & TypeScript",
        "Next.js & React 19",
        "Artificial Intelligence & LLM Integration",
        "PostgreSQL & MongoDB",
        "Redis Caching & Queue Management",
        "RESTful API Architecture",
      ],
    },
  };

  return (
    <>
      <JsonLd data={profileSchema} />
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <article className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/en" },
              { label: "About", href: "/en/about" },
            ]}
          />
          <header className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red dark:text-rose-400">
              Canpolat Kaya / Full-Stack Developer
            </p>
            <h1 className="mt-5 font-jakarta text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              I build systems that can operate beyond the code itself.
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-8 text-muted-foreground">
              I turn ideas into working digital products across custom software, data collection, AI automation, backend systems, and modern web development.
            </p>
          </header>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border border-border/70 bg-card/40 p-8">
              <h2 className="font-jakarta text-2xl font-bold">Product-oriented approach</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Technology is a tool, not the objective. I first clarify the user and business problem, then design a maintainable architecture around it.
              </p>
            </section>
            <section className="rounded-3xl border border-border/70 bg-card/40 p-8">
              <h2 className="font-jakarta text-2xl font-bold">End-to-end technical scope</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                I approach the system as a whole, from Next.js and React interfaces to Python/FastAPI or Node.js backends and PostgreSQL, MongoDB, or Redis data layers.
              </p>
            </section>
            <section className="rounded-3xl border border-border/70 bg-card/40 p-8 md:col-span-2">
              <h2 className="font-jakarta text-2xl font-bold">Evaluate the work through real projects</h2>
              <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                The News Portal demonstrates web scraping and data-delivery architecture, while BIST AI shows data processing, backend, and analytics systems through visible technical decisions.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/en/projects"
                  className="inline-flex items-center gap-2 font-semibold hover:text-brand-red"
                >
                  Explore projects <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/en/contact"
                  className="inline-flex items-center gap-2 font-semibold hover:text-brand-red"
                >
                  Get in touch <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
