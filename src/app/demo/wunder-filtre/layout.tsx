import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WUNDER Filtre Çapraz Referans & Araç Katalog Demosu",
  description:
    "OEM numarası, rakip filtre kodu veya araç seçimi ile WUNDER filtre karşılıklarını gösteren B2B katalog demosu.",
  alternates: { canonical: "https://canpolatkaya.com/demo/wunder-filtre" },
  robots: { index: false, follow: false },
};

export default function WunderDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
