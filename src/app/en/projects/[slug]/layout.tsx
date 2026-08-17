import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const projects: Record<string, { title: string; description: string; image: string }> = {
  "haber-portali": { title: "News Portal - Autonomous Web Scraping Engine", description: "A cloud-based news collection engine and maintainable data-delivery platform.", image: "/images/haber-cover-v2.png" },
  "bist-ai": { title: "BIST AI - Financial Data Analytics System", description: "A Borsa Istanbul analytics system combining validation, caching, backend, and data-processing layers.", image: "/images/bist-ai-cover.png" },
};

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(projects).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const project = projects[slug]; if (!project) return {};
  return createMetadata({ title: project.title, description: project.description, path: `/en/projects/${slug}`, image: project.image, type: "article", locale: "en" });
}

export default async function EnglishProjectLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = projects[slug]; if (!project) return children;
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.description, url: `${SITE_URL}/en/projects/${slug}`, image: `${SITE_URL}${project.image}`, creator: { "@type": "Person", name: SITE_NAME, url: SITE_URL }, inLanguage: "en" }} /><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` }, { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/en/projects` }, { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/en/projects/${slug}` }] }} />{children}</>;
}

