import { serviceBySlug } from "@/lib/services";
import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Canpolat Kaya yazılım geliştirme hizmeti";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug[slug] ?? serviceBySlug["ozel-yazilim-gelistirme"];
  return createOgImage({ eyebrow: "Hizmet", title: service.title, description: service.description });
}

