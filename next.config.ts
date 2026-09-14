import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "sonner"],
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cdn.jsdelivr.net https://*.google-analytics.com https://*.googletagmanager.com https://*.google.com https://*.google.com.tr",
      "font-src 'self'",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.google.com https://*.google.com.tr https://stats.g.doubleclick.net",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
        ],
      },
      {
        source: "/(images|icons)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.canpolatkaya.com" }],
        destination: "https://canpolatkaya.com/:path*",
        permanent: true,
      },
      {
        source: "/rakip-fiyat-takip-sistemi",
        destination: "/hizmetler/rakip-fiyat-takip-sistemi",
        permanent: true,
      },
      {
        source: "/e-ticaret-fiyat-takibi",
        destination: "/hizmetler/rakip-fiyat-takip-sistemi",
        permanent: true,
      },
      {
        source: "/e-ticaret-urun-veri-aktarimi",
        destination: "/hizmetler/e-ticaret-urun-veri-aktarimi",
        permanent: true,
      },
      {
        source: "/urun-verisi-cekme",
        destination: "/hizmetler/e-ticaret-urun-veri-aktarimi",
        permanent: true,
      },
      {
        source: "/woocommerce-veri-aktarimi",
        destination: "/hizmetler/e-ticaret-urun-veri-aktarimi",
        permanent: true,
      },
      {
        source: "/web-scraping-hizmeti",
        destination: "/hizmetler/web-scraping",
        permanent: true,
      },
      {
        source: "/web-scraping-api",
        destination: "/hizmetler/web-scraping",
        permanent: true,
      },
      {
        source: "/veri-toplama-hizmeti",
        destination: "/hizmetler/web-scraping",
        permanent: true,
      },
      {
        source: "/en/competitor-price-tracking",
        destination: "/en/services/competitor-price-tracking",
        permanent: true,
      },
      {
        source: "/en/ecommerce-price-tracking",
        destination: "/en/services/competitor-price-tracking",
        permanent: true,
      },
      {
        source: "/en/ecommerce-product-data-extraction",
        destination: "/en/services/ecommerce-product-data-extraction",
        permanent: true,
      },
      {
        source: "/en/product-data-extraction",
        destination: "/en/services/ecommerce-product-data-extraction",
        permanent: true,
      },
      {
        source: "/en/woocommerce-data-migration",
        destination: "/en/services/ecommerce-product-data-extraction",
        permanent: true,
      },
      {
        source: "/en/web-scraping-service",
        destination: "/en/services/web-scraping",
        permanent: true,
      },
      {
        source: "/en/web-scraping-api",
        destination: "/en/services/web-scraping",
        permanent: true,
      },
      {
        source: "/en/data-collection-service",
        destination: "/en/services/web-scraping",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/**",
      },
    ],
  },
};

export default nextConfig;
