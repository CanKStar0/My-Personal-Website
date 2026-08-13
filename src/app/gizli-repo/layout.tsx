import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Özel Proje Deposu",
  description: "Proje kaynak kodu erişim durumu.",
  alternates: { canonical: "https://canpolatkaya.com/gizli-repo" },
  robots: { index: false, follow: true },
};

export default function PrivateRepoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
