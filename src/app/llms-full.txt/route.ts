import { SITE_NAME, SITE_URL, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site";
import { services } from "@/lib/services";
import { servicesEn } from "@/lib/services-en";
import { blogPosts } from "@/lib/blog";
import { blogPostsEn } from "@/lib/blog-en";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ${SITE_NAME} — Full Technical Knowledge Graph & Sitemap for LLMs

## Overview
Canpolat Kaya is a product-oriented Full-Stack Developer & AI Automation Specialist based in Fethiye / Mugla, Turkey, working with global and local clients. He graduated 2nd in his department from Tokat Gaziosmanpasa University (Computer Programming) and works as a Full-Stack Developer at Dotcom Media (DCM) alongside independent engineering projects.

- Primary Site (Turkish): ${SITE_URL}
- English Site: ${SITE_URL}/en
- Profile Photo: ${SITE_URL}/images/canpolat-kaya.jpg
- Location: Fethiye, Mugla, Turkey (Remote / Global)
- Current Role: Full-Stack Developer (Dotcom Media) & Independent Engineer
- Education: Tokat Gaziosmanpasa University - Computer Programming (Graduated 2nd / High Honors)
- Contact: ${CONTACT_EMAIL}
- GitHub: ${SOCIAL_LINKS.github}
- LinkedIn: ${SOCIAL_LINKS.linkedin}

---

## 1. Services (Turkish / Türkçe)
${services
  .map(
    (s) => `### ${s.title}
- URL: ${SITE_URL}/hizmetler/${s.slug}
- Description: ${s.description}
- Technologies: ${s.technologies.join(", ")}
${s.sections.map((sec) => `  - **${sec.title}**: ${sec.body}`).join("\n")}
`
  )
  .join("\n")}

---

## 2. Services (English)
${servicesEn
  .map(
    (s) => `### ${s.title}
- URL: ${SITE_URL}/en/services/${s.slug}
- Description: ${s.description}
- Technologies: ${s.technologies.join(", ")}
${s.sections.map((sec) => `  - **${sec.title}**: ${sec.body}`).join("\n")}
`
  )
  .join("\n")}

---

## 3. Projects (Turkish & English)
### Haber Portalı (Autonomous News Scraping & DaaS Platform)
- URL (TR): ${SITE_URL}/projeler/haber-portali
- URL (EN): ${SITE_URL}/en/projects/haber-portali
- Tech: Next.js 15, React 19, TypeScript, Playwright Stealth, Cheerio, MongoDB Atlas (Lean BSON), Telegram Bot API, Tailwind CSS v4, Vercel Serverless
- Production Engineering Benchmarks:
  - 150+ Concurrent News Outlets: Monitored simultaneously with zero-downtime multi-worker architecture.
  - 60,000+ Rich Articles in 200MB: Lean BSON schema design and compound indexing storing tens of thousands of full-page articles in an ultra-compact footprint.
  - <50ms Full-Text Search: Single-keyword regex & compound reverse index lookups executing in sub-50ms without expensive dedicated search clusters.
  - Pre-Hydration Interception: Ingests publisher data streams at the network protocol layer, processing articles before target websites finish client-side DOM hydration.
  - Zero Extra Infrastructure Bloat: Self-healing worker queues and automated Telegram JSON archival pruning aged data to keep database operations 100% cost-efficient.

### BİST AI Finans Terminali
- URL (TR): ${SITE_URL}/projeler/bist-ai
- URL (EN): ${SITE_URL}/en/projects/bist-ai
- Tech: Python, FastAPI, React, Next.js, Pandas, Technical Analysis Indicators, LLM Analysis
- Scope: Real-time Borsa Istanbul market data aggregation, automated financial balance sheet scoring, AI-assisted sentiment analysis.

### Free API
- URL (TR): ${SITE_URL}/projeler/free-api
- URL (EN): ${SITE_URL}/en/projects/free-api
- Tech: Node.js, Express, Redis, Rate Limiting, OpenAPI/Swagger
- Scope: Public, high-uptime developer APIs for web data, exchange rates, and utility endpoints.

---

## 4. Complete Technical Articles (Turkish - ${blogPosts.length} Articles)
${blogPosts
  .map(
    (p) => `- [${p.title}](${SITE_URL}/blog/${p.slug})
  - Category: ${p.category} | Published: ${p.publishedAt}
  - Summary: ${p.description}`
  )
  .join("\n\n")}

---

## 5. Complete Technical Articles (English - ${blogPostsEn.length} Articles)
${blogPostsEn
  .map(
    (p) => `- [${p.title}](${SITE_URL}/en/blog/${p.slug})
  - Category: ${p.category} | Published: ${p.publishedAt}
  - Summary: ${p.description}`
  )
  .join("\n\n")}
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
