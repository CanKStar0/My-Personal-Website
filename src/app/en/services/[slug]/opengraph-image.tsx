import { englishServiceByRouteSlug } from "@/lib/services-en";
import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Canpolat Kaya software development service";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = englishServiceByRouteSlug[slug] ?? englishServiceByRouteSlug["custom-software-development"];
  return createOgImage({ eyebrow: "Service", title: service.title, description: service.description });
}

