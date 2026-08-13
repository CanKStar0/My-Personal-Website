import type { Metadata } from "next";
export const metadata: Metadata = { title: "Private Project Repository", description: "Source-code access status for this project.", alternates: { canonical: "https://canpolatkaya.com/en/private-repository" }, robots: { index: false, follow: true } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

