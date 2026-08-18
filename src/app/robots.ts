import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Meta-ExternalAgent",
          "cohere-ai",
          "Bytespider",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://canpolatkaya.com/sitemap.xml",
    host: "https://canpolatkaya.com",
  };
}
