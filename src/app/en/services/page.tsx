import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { createMetadata } from "@/lib/seo";
import { servicesEn } from "@/lib/services-en";
import { localizedServicePath } from "@/lib/i18n";

export const metadata: Metadata = createMetadata({
  title: "Software Development Services",
  description: "Explore custom software, web scraping, AI automation, API, and Next.js development services supported by real project examples.",
  path: "/en/services",
  locale: "en",
});

export default function EnglishServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/en" }, { label: "Services", href: "/en/services" }]} />
          <header className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">Solution areas</p>
            <h1 className="mt-5 font-jakarta text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">Services that turn ideas into maintainable working systems.</h1>
            <p className="mt-7 max-w-3xl text-base font-light leading-8 text-muted-foreground md:text-lg">Each service addresses a specific business problem rather than presenting an isolated technology list. These capabilities can work together within one custom software product.</p>
          </header>
          <section aria-labelledby="services-heading" className="mt-16 grid gap-5 md:grid-cols-2">
            <h2 id="services-heading" className="sr-only">Software development services</h2>
            {servicesEn.map((service, index) => (
              <Link key={service.slug} href={localizedServicePath(service.slug, "en")} className={`group rounded-3xl border border-border/70 bg-card/40 p-7 transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:bg-brand-red/[0.03] md:p-9 ${index === 0 ? "md:col-span-2" : ""}`}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">{service.eyebrow}</p>
                <h2 className="mt-4 font-jakarta text-2xl font-bold text-foreground md:text-3xl">{service.shortTitle}</h2>
                <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{service.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-brand-red">Explore the service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </section>
          <section className="mt-20 rounded-3xl border border-border/70 bg-zinc-950 p-8 text-white md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">How the process works</p>
            <h2 className="mt-4 font-jakarta text-3xl font-bold">Analysis → Architecture → Development → Testing → Release → Improvement</h2>
            <p className="mt-5 max-w-3xl leading-7 text-zinc-400">We clarify the problem, current systems, and success criteria before selecting the technical solution.</p>
            <Link href="/en/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-zinc-950">Evaluate your project <ArrowRight className="h-4 w-4" /></Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
