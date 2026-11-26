import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "GNR Otomotiv | B2B Filtre Sipariş Portalı",
  },
  description:
    "GNR Otomotiv yetkili bayi B2B WUNDER filtre kataloğu, araç filtre arama ve online sipariş sistemi.",
  robots: { index: false, follow: false },
};

export default function WunderDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
