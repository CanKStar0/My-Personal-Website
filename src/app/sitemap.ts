import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { blogPostsEn } from "@/lib/blog-en";
import { services } from "@/lib/services";
import { servicesEn } from "@/lib/services-en";
import { SITE_CONTENT_UPDATED_AT, SITE_URL } from "@/lib/site";
import { getLocalizedPath } from "@/lib/i18n";

function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : new URL(path, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          tr: absoluteUrl("/"),
          en: absoluteUrl("/en"),
          "x-default": absoluteUrl("/"),
        },
      },
    },
    {
      url: absoluteUrl("/en"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          tr: absoluteUrl("/"),
          en: absoluteUrl("/en"),
          "x-default": absoluteUrl("/"),
        },
      },
    },
    {
      url: absoluteUrl("/hakkimda"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/hakkimda"),
          en: absoluteUrl("/en/about"),
          "x-default": absoluteUrl("/hakkimda"),
        },
      },
    },
    {
      url: absoluteUrl("/en/about"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/hakkimda"),
          en: absoluteUrl("/en/about"),
          "x-default": absoluteUrl("/hakkimda"),
        },
      },
    },
    {
      url: absoluteUrl("/hizmetler"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          tr: absoluteUrl("/hizmetler"),
          en: absoluteUrl("/en/services"),
          "x-default": absoluteUrl("/hizmetler"),
        },
      },
    },
    {
      url: absoluteUrl("/en/services"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          tr: absoluteUrl("/hizmetler"),
          en: absoluteUrl("/en/services"),
          "x-default": absoluteUrl("/hizmetler"),
        },
      },
    },
    {
      url: absoluteUrl("/projeler"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/projeler"),
          en: absoluteUrl("/en/projects"),
          "x-default": absoluteUrl("/projeler"),
        },
      },
    },
    {
      url: absoluteUrl("/en/projects"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/projeler"),
          en: absoluteUrl("/en/projects"),
          "x-default": absoluteUrl("/projeler"),
        },
      },
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          tr: absoluteUrl("/blog"),
          en: absoluteUrl("/en/blog"),
          "x-default": absoluteUrl("/blog"),
        },
      },
    },
    {
      url: absoluteUrl("/en/blog"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          tr: absoluteUrl("/blog"),
          en: absoluteUrl("/en/blog"),
          "x-default": absoluteUrl("/blog"),
        },
      },
    },
    {
      url: absoluteUrl("/iletisim"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/iletisim"),
          en: absoluteUrl("/en/contact"),
          "x-default": absoluteUrl("/iletisim"),
        },
      },
    },
    {
      url: absoluteUrl("/en/contact"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/iletisim"),
          en: absoluteUrl("/en/contact"),
          "x-default": absoluteUrl("/iletisim"),
        },
      },
    },
  ];

  // Project items
  const projectRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/projeler/haber-portali"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/projeler/haber-portali"),
          en: absoluteUrl("/en/projects/haber-portali"),
          "x-default": absoluteUrl("/projeler/haber-portali"),
        },
      },
    },
    {
      url: absoluteUrl("/en/projects/haber-portali"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/projeler/haber-portali"),
          en: absoluteUrl("/en/projects/haber-portali"),
          "x-default": absoluteUrl("/projeler/haber-portali"),
        },
      },
    },
    {
      url: absoluteUrl("/projeler/bist-ai"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/projeler/bist-ai"),
          en: absoluteUrl("/en/projects/bist-ai"),
          "x-default": absoluteUrl("/projeler/bist-ai"),
        },
      },
    },
    {
      url: absoluteUrl("/en/projects/bist-ai"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: absoluteUrl("/projeler/bist-ai"),
          en: absoluteUrl("/en/projects/bist-ai"),
          "x-default": absoluteUrl("/projeler/bist-ai"),
        },
      },
    },
    {
      url: absoluteUrl("/projeler/free-api"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          tr: absoluteUrl("/projeler/free-api"),
          en: absoluteUrl("/en/projects/free-api"),
          "x-default": absoluteUrl("/projeler/free-api"),
        },
      },
    },
    {
      url: absoluteUrl("/en/projects/free-api"),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          tr: absoluteUrl("/projeler/free-api"),
          en: absoluteUrl("/en/projects/free-api"),
          "x-default": absoluteUrl("/projeler/free-api"),
        },
      },
    },
  ];

  // Service items (TR & EN with reciprocal alternates)
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => {
    const trPath = `/hizmetler/${s.slug}`;
    const enPath = getLocalizedPath(trPath, "en");
    return {
      url: absoluteUrl(trPath),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          tr: absoluteUrl(trPath),
          en: absoluteUrl(enPath),
          "x-default": absoluteUrl(trPath),
        },
      },
    };
  });

  const serviceEnRoutes: MetadataRoute.Sitemap = servicesEn.map((s) => {
    const enPath = getLocalizedPath(`/hizmetler/${s.slug}`, "en");
    const trPath = `/hizmetler/${s.slug}`;
    return {
      url: absoluteUrl(enPath),
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          tr: absoluteUrl(trPath),
          en: absoluteUrl(enPath),
          "x-default": absoluteUrl(trPath),
        },
      },
    };
  });

  // Turkish Blog Articles (with reciprocal alternates)
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const trPath = `/blog/${post.slug}`;
    const enPath = getLocalizedPath(trPath, "en");
    return {
      url: absoluteUrl(trPath),
      lastModified: post.modifiedAt || SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: absoluteUrl(trPath),
          en: absoluteUrl(enPath),
          "x-default": absoluteUrl(trPath),
        },
      },
    };
  });

  // English Blog Articles (with reciprocal alternates)
  const blogEnRoutes: MetadataRoute.Sitemap = blogPostsEn.map((post) => {
    const enPath = `/en/blog/${post.slug}`;
    const trPath = getLocalizedPath(enPath, "tr");
    return {
      url: absoluteUrl(enPath),
      lastModified: post.modifiedAt || SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: absoluteUrl(trPath),
          en: absoluteUrl(enPath),
          "x-default": absoluteUrl(trPath),
        },
      },
    };
  });

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...serviceRoutes,
    ...serviceEnRoutes,
    ...blogRoutes,
    ...blogEnRoutes,
  ];
}
