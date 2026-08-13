import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { createMetadata } from "@/lib/seo";
import { englishServiceByRouteSlug, englishServiceRouteSlugs } from "@/lib/services-en";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return englishServiceRouteSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = englishServiceByRouteSlug[slug];
  if (!service) return {};
  return createMetadata({
    title: service.metadataTitle,
    description: service.description,
    path: `/en/services/${slug}`,
    locale: "en",
    image: `/en/services/${slug}/opengraph-image`,
  });
}

export default async function EnglishServiceRoute({ params }: Props) {
  const { slug } = await params;
  const service = englishServiceByRouteSlug[slug];
  if (!service) notFound();
  return <ServicePage service={service} locale="en" path={`/en/services/${slug}`} />;
}
