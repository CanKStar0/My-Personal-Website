import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Yazılım Projeleri ve Case Study'ler",
  description: "Web scraping, veri toplama, Python, FastAPI, Next.js ve backend mimarilerini gerçek projeler üzerinden inceleyin.",
  path: "/projeler",
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

