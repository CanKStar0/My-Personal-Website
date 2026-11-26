import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "WUNDER Filtre | B2B Bayi ve Sipariş Portalı",
  },
  description:
    "WUNDER Filtre yetkili bayi B2B ürün kataloğu, araç filtre arama ve online sipariş sistemi.",
  robots: { index: false, follow: false },
};

export default function WunderDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
