import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "İletişim",
  description: "Özel yazılım, web scraping, AI otomasyon, API veya Next.js projenizi değerlendirmek için Canpolat Kaya ile iletişime geçin.",
  path: "/iletisim",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

