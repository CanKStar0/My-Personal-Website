import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Contact Canpolat Kaya to discuss a custom software, web scraping, AI automation, API, or Next.js project.",
  path: "/en/contact",
  locale: "en",
});

export default function EnglishContactLayout({ children }: { children: React.ReactNode }) { return children; }

