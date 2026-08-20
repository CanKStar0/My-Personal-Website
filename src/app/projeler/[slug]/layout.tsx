import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PROJECTS_METADATA: Record<string, { title: string; description: string; image: string }> = {
  "free-api": {
    title: "FreeAPI Directory - 500+ Açık REST API & Canlı Sandbox Platformu",
    description: "500+ doğrulanmış ücretsiz REST API, canlı terminal sandbox konsolu ve askeri düzeyde anti-scraping koruması sunan küresel geliştirici platformu.",
    image: "/images/freeapi-cover.png",
  },
  "haber-portali": {
    title: "Haber Portalı - Otonom Web Kazıma Motoru",
    description: "Bulut tabanlı otonom haber toplama motoru ve yüksek performanslı veri sunum (DaaS) platformu.",
    image: "/images/haber-cover-v2.png",
  },
  "bist-ai": {
    title: "BIST AI - Finansal Veri Analiz Sistemi",
    description: "Finansal verileri doğrulama, önbellekleme ve analiz katmanlarıyla işleyen Borsa İstanbul analiz sistemi.",
    image: "/images/bist-ai-cover.png",
  },
};


type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_METADATA[slug];

  if (!project) {
    return {
      title: "Proje Bulunamadı",
      description: "Aradığınız proje bulunamadı.",
    };
  }

  return createMetadata({ title: project.title, description: project.description, path: `/projeler/${slug}`, image: project.image, type: "article" });
}

export function generateStaticParams() {
  return Object.keys(PROJECTS_METADATA).map((slug) => ({ slug }));
}

export default async function ProjectLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS_METADATA[slug];
  if (!project) return children;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: `${SITE_URL}/projeler/${slug}`,
        image: `${SITE_URL}${project.image}`,
        creator: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: SITE_NAME,
          url: SITE_URL,
        },
        inLanguage: "tr-TR",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projeler", item: `${SITE_URL}/projeler` },
          { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projeler/${slug}` },
        ],
      }} />
      {children}
    </>
  );
}
