import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { createMetadata } from "@/lib/seo";
import { serviceBySlug, services } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) return {};

  return createMetadata({
    title: service.metadataTitle,
    description: service.description,
    path: `/hizmetler/${slug}`,
    image: `/hizmetler/${slug}/opengraph-image`,
  });
}

export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  return <ServicePage service={service} />;
}
