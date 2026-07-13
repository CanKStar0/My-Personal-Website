import { Metadata } from "next";

const PROJECTS_METADATA: Record<string, { title: string; description: string; image: string }> = {
  "haber-portali": {
    title: "Haber Portalı - Otonom Web Kazıma Motoru",
    description: "Bulut tabanlı otonom haber toplama motoru ve yüksek performanslı veri sunum (DaaS) platformu.",
    image: "/images/haber-cover.png",
  },
  "bist-ai": {
    title: "BIST AI - Finansal Veri Analiz Sistemi",
    description: "Milyonlarca finansal veriyi sıfır hatayla işleyen Borsa İstanbul analiz sistemi.",
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

  const siteUrl = "https://canpolatkaya.com";

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Canpolat Kaya`,
      description: project.description,
      url: `${siteUrl}/projeler/${slug}`,
      type: "article",
      images: [
        {
          url: `${siteUrl}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Canpolat Kaya`,
      description: project.description,
      images: [`${siteUrl}${project.image}`],
    },
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
