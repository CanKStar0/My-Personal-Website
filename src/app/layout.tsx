import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-context";
import { Toaster } from "sonner";
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

const siteUrl = "https://canpolatkaya.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Canpolat Kaya | Full-Stack Developer & Girişimci",
    template: "%s | Canpolat Kaya",
  },
  description:
    "Karmaşık fikirleri otonom sistemlere ve kusursuz dijital ürünlere dönüştüren Full-Stack Geliştirici. SaaS, DaaS ve ağır mühendislik çözümleri.",
  keywords: [
    "Canpolat Kaya",
    "Full Stack Developer",
    "Next.js",
    "Python",
    "PostgreSQL",
    "Web Otomasyon",
    "SaaS",
    "DaaS",
    "Yapay Zeka",
  ],
  authors: [{ name: "Canpolat Kaya", url: siteUrl }],
  creator: "Canpolat Kaya",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Canpolat Kaya",
    title: "Canpolat Kaya | Full-Stack Developer & Girişimci",
    description:
      "Karmaşık fikirleri otonom sistemlere ve kusursuz dijital ürünlere dönüştüren Full-Stack Geliştirici. SaaS, DaaS ve ağır mühendislik çözümleri.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Canpolat Kaya - Full-Stack Developer & Girişimci",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canpolat Kaya | Full-Stack Developer & Girişimci",
    description:
      "Karmaşık fikirleri otonom sistemlere ve kusursuz dijital ürünlere dönüştüren Full-Stack Geliştirici. SaaS, DaaS ve ağır mühendislik çözümleri.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (typeof window !== 'undefined') {
                  window.history.scrollRestoration = 'manual';
                  window.scrollTo(0, 0);
                  if (window.location.hash) {
                    window.history.replaceState(null, "", window.location.pathname + window.location.search);
                  }
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JLWJFQ732B"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JLWJFQ732B', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <ThemeProvider>
          <LanguageProvider>
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
            <Toaster 
              theme="dark" 
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "rgba(9, 9, 11, 0.9)",
                  border: "1px solid rgba(220, 38, 38, 0.4)",
                  color: "#f4f4f5",
                  backdropFilter: "blur(8px)",
                }
              }}
            />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
