import Link from "next/link";
import { ArrowRight, Check, Code2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import type { Service } from "@/lib/services";
import { serviceBySlug } from "@/lib/services";
import { englishServiceBySlug } from "@/lib/services-en";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/translations";
import { localizedServicePath } from "@/lib/i18n";
import { TrackedLink } from "@/components/tracked-link";

export function ServicePage({ service, locale = "tr", path = `/hizmetler/${service.slug}` }: { service: Service; locale?: Locale; path?: string }) {
  const isEnglish = locale === "en";
  const labels = isEnglish
    ? {
        home: "Home", services: "Services", discuss: "Discuss your project", proof: "View project evidence",
        realProject: "Real project", tech: "Technical stack", related: "Related services",
        closingTitle: "Let’s define the right solution for your system.",
        closingBody: "We can evaluate the need, current infrastructure, and success criteria to create an actionable technical roadmap.",
        contact: "Get in touch",
      }
    : {
        home: "Ana Sayfa", services: "Hizmetler", discuss: "Projenizi konuşalım", proof: "Proje kanıtını inceleyin",
        realProject: "Gerçek proje", tech: "Teknik altyapı", related: "İlgili hizmetler",
        closingTitle: "Sisteminiz için doğru çözümü birlikte netleştirelim.",
        closingBody: "İhtiyacı, mevcut altyapıyı ve başarı ölçütünü konuşarak uygulanabilir bir teknik yol haritası çıkaralım.",
        contact: "İletişime geçin",
      };
  const relatedIndex = isEnglish ? englishServiceBySlug : serviceBySlug;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_URL}${path}`,
    provider: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    areaServed: "TR",
    inLanguage: isEnglish ? "en" : "tr",
  };

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="flex-1 bg-background">
        <header className="border-b border-border/10 px-6 pb-20 pt-14 md:px-12 md:pb-28 md:pt-20">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[
              { label: labels.home, href: isEnglish ? "/en" : "/" },
              { label: labels.services, href: isEnglish ? "/en/services" : "/hizmetler" },
              { label: service.shortTitle, href: path },
            ]} />
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-brand-red dark:text-rose-400">{service.eyebrow}</p>
            <h1 className="max-w-4xl font-jakarta text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.08]">{service.title}</h1>
            <p className="mt-7 max-w-3xl text-base font-light leading-8 text-muted-foreground md:text-lg">{service.intro}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <TrackedLink eventName="service_cta_click" eventParams={{ service: service.slug, location: "service_hero" }} href={isEnglish ? "/en/contact" : "/iletisim"} className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700">{labels.discuss} <ArrowRight className="h-4 w-4" /></TrackedLink>
              {service.project && <TrackedLink eventName="project_case_study_click" eventParams={{ service: service.slug }} href={service.project.href} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted">{labels.proof}</TrackedLink>}
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl gap-16 px-6 py-20 md:px-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20 lg:py-28">
          <article className="space-y-16">
            {service.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-jakarta text-2xl font-bold tracking-tight text-foreground md:text-3xl">{section.title}</h2>
                <p className="mt-5 text-base font-light leading-8 text-muted-foreground">{section.body}</p>
                {section.items && (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => <li key={item} className="flex gap-3 rounded-xl border border-border/60 bg-card/50 p-4 text-sm text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />{item}</li>)}
                  </ul>
                )}
              </section>
            ))}

            {service.project && (
              <section className="rounded-3xl border border-brand-red/20 bg-brand-red/[0.04] p-7 md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red dark:text-rose-400">{labels.realProject}</p>
                <h2 className="mt-3 font-jakarta text-2xl font-bold text-foreground">{service.project.title}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{service.project.description}</p>
                <TrackedLink eventName="project_case_study_click" eventParams={{ service: service.slug }} href={service.project.href} className="mt-6 inline-flex items-center gap-2 font-semibold text-foreground hover:text-brand-red">{service.project.anchor} <ArrowRight className="h-4 w-4" /></TrackedLink>
              </section>
            )}
          </article>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/70 bg-card/50 p-6">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground"><Code2 className="h-4 w-4 text-brand-red" /> {labels.tech}</div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.technologies.map((technology) => <li key={technology} className="rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs text-muted-foreground">{technology}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/50 p-6">
              <h2 className="text-sm font-bold text-foreground">{labels.related}</h2>
              <ul className="mt-4 space-y-3">
                {service.relatedServices.map((slug) => {
                  const related = relatedIndex[slug];
                  return <li key={slug}><Link href={localizedServicePath(slug, locale)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-red">{related.shortTitle}<ArrowRight className="h-3.5 w-3.5" /></Link></li>;
                })}
              </ul>
            </div>
          </aside>
        </div>

        <section className="border-t border-border/10 px-6 py-20 text-center md:px-12">
          <h2 className="font-jakarta text-3xl font-extrabold text-foreground">{labels.closingTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{labels.closingBody}</p>
          <TrackedLink eventName="service_cta_click" eventParams={{ service: service.slug, location: "service_footer" }} href={isEnglish ? "/en/contact" : "/iletisim"} className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-semibold text-background">{labels.contact} <ArrowRight className="h-4 w-4" /></TrackedLink>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
