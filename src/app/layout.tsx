import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Canpolat Kaya | Senior Full-Stack Developer",
  description: "Canpolat Kaya'nın kişisel portföyü, projeleri ve yazılım çözümleri. Yerel işletmeler için sade, yazılımcı ve İK uzmanları için teknik derinliğe sahip modern web platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
