import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Full-Stack Developer & Custom Software",
  description: "Full-Stack Developer focused on custom software, web scraping, AI automation, API development, and Next.js products.",
  path: "/en",
  locale: "en",
});

export default function EnglishHomePage() {
  return <HomeContent locale="en" />;
}
