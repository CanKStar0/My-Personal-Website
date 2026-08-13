import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { alternatePathFor } from "@/lib/i18n";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  locale?: "tr" | "en";
  alternatePath?: string;
};

export function createMetadata({
  title,
  description,
  path,
  image = "/opengraph-image.jpg",
  type = "website",
  locale = "tr",
  alternatePath,
}: MetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const resolvedAlternatePath = alternatePath ?? alternatePathFor(path);
  const alternateUrl = resolvedAlternatePath ? new URL(resolvedAlternatePath, SITE_URL).toString() : undefined;
  const trUrl = locale === "tr" ? url : alternateUrl;
  const enUrl = locale === "en" ? url : alternateUrl;

  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: {
      canonical: url,
      ...(trUrl && enUrl ? { languages: { tr: trUrl, en: enUrl, "x-default": trUrl } } : {}),
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_US" : "tr_TR",
      alternateLocale: [locale === "en" ? "tr_TR" : "en_US"],
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}
