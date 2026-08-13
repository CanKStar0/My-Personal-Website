import type { Metadata } from "next";
export const metadata: Metadata = { title: "Live Demo Status", description: "Status information for a project demo.", alternates: { canonical: "https://canpolatkaya.com/en/demo-unavailable" }, robots: { index: false, follow: true } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

