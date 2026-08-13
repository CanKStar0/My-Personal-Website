import { blogPostBySlug } from "@/lib/blog";
import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Canpolat Kaya teknik blog yazısı";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostBySlug[slug] ?? blogPostBySlug["web-scraping-nedir"];
  return createOgImage({ eyebrow: post.category, title: post.title, description: post.description });
}

