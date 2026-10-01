import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Full-Stack Developer & Özel Yazılım",
  description: "Özel yazılım, web scraping, yapay zekâ otomasyonu, API ve Next.js geliştirme alanlarında ürün odaklı Full-Stack Developer.",
  path: "/",
  locale: "tr",
});

export default function HomePage() {
  return <HomeContent locale="tr" />;
}
