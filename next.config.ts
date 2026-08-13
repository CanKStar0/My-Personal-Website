import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.canpolatkaya.com" }],
        destination: "https://canpolatkaya.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
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
