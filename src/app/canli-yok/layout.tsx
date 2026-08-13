import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canlı Demo Durumu",
  description: "Projenin canlı demo durumunu açıklayan yardımcı sayfa.",
  alternates: { canonical: "https://canpolatkaya.com/canli-yok" },
  robots: { index: false, follow: true },
};

export default function DemoStatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
