import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/gizli-repo",
          "/canli-yok",
          "/en/private-repository",
          "/en/demo-unavailable",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "Meta-ExternalAgent",
          "cohere-ai",
          "Bytespider",
          "Amazonbot",
          "Diffbot",
          "DuckAssistBot",
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/gizli-repo",
          "/canli-yok",
          "/en/private-repository",
          "/en/demo-unavailable",
        ],
      },
    ],
    sitemap: "https://canpolatkaya.com/sitemap.xml",
    host: "https://canpolatkaya.com",
  };
}
