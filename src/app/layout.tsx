import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-context";
import { FluidCanvasToggle } from "@/components/fluid-canvas-toggle";
import { SiteEffects } from "@/components/site-effects";
import { AnalyticsTracker } from "@/components/analytics-tracker";
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
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-JLWJFQ732B";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Canpolat Kaya | Full-Stack Developer & Özel Yazılım",
    template: "%s | Canpolat Kaya",
  },
  description:
    "Özel yazılım, web scraping, yapay zekâ otomasyonu, API ve Next.js geliştirme alanlarında ürün odaklı Full-Stack Developer.",
  alternates: {
    canonical: siteUrl,
    languages: { tr: siteUrl, en: `${siteUrl}/en`, "x-default": siteUrl },
  },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  authors: [{ name: "Canpolat Kaya", url: siteUrl }],
  creator: "Canpolat Kaya",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Canpolat Kaya",
    title: "Canpolat Kaya | Full-Stack Developer & Özel Yazılım",
    description:
      "Özel yazılım, web scraping, yapay zekâ otomasyonu, API ve Next.js geliştirme alanlarında ürün odaklı Full-Stack Developer.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Canpolat Kaya - Full-Stack Developer ve Özel Yazılım",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canpolat Kaya | Full-Stack Developer & Özel Yazılım",
    description:
      "Özel yazılım, web scraping, yapay zekâ otomasyonu, API ve Next.js geliştirme alanlarında ürün odaklı Full-Stack Developer.",
    images: [`${siteUrl}/og-image.jpg`],
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
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (typeof window !== 'undefined') {
                  document.documentElement.lang = window.location.pathname === '/en' || window.location.pathname.startsWith('/en/') ? 'en' : 'tr';
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
        {process.env.NODE_ENV === "production" && (
          <>
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
            <AnalyticsTracker />
          </>
        )}
        <ThemeProvider>
          <LanguageProvider>
            <SiteEffects />
            <FluidCanvasToggle />
            <div className="relative z-10 flex min-h-screen flex-col">
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
