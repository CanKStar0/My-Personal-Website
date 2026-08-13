import { blogPostEnBySlug } from "@/lib/blog-en";
import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Canpolat Kaya technical blog article";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostEnBySlug[slug] ?? blogPostEnBySlug["what-is-web-scraping"];
  return createOgImage({ eyebrow: post.category, title: post.title, description: post.description });
}
