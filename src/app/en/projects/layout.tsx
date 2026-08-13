import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Software Projects and Case Studies",
  description: "Explore web scraping, data processing, Python, FastAPI, Next.js, and backend architecture through real projects.",
  path: "/en/projects",
  locale: "en",
});

export default function EnglishProjectsLayout({ children }: { children: React.ReactNode }) { return children; }

