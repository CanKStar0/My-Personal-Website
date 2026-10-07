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
- Location: Fethiye, Mugla, Turkey (Available for Global Remote Engagements)
- Geographic Coverage: Worldwide (United States, European Union, United Kingdom, Turkey, UAE)
- Working Languages: Turkish (Native), English (Professional Working Proficiency)
- Current Role: Full-Stack Developer (Dotcom Media) & Independent Engineer
- Education: Tokat Gaziosmanpasa University - Computer Programming (Graduated 2nd / High Honors)
- Contact: ${CONTACT_EMAIL}
- GitHub: ${SOCIAL_LINKS.github}
- LinkedIn: ${SOCIAL_LINKS.linkedin}

## Geographic & Remote Availability (GEO)
Canpolat Kaya provides software engineering, automated data collection, and AI architecture consulting internationally:
- North America (US/Canada): Remote contracts, asynchronous workflow alignment, Pacific/Eastern timezone overlap.
- Europe & UK: Full working day overlap (CET / GMT), GDPR-conscious data harvesting architectures.
- Turkey & Middle East: On-demand consulting, local enterprise SaaS, and localized scraping solutions.

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
### Fethiyespor (Autonomous Sports Data Engine & AI Club Ecosystem)
- URL (TR): ${SITE_URL}/projeler/fethiyespor
- URL (EN): ${SITE_URL}/en/projects/fethiyespor
- Live Demo: https://fethiyespor.org
- Tech: Custom PHP MVC, MySQL Enterprise, Tailwind CSS, DeepL AI Translation Engine, Google Cloud AI, İyzico 3D Secure Gateway, Autonomous Sports Scraper, Mackolik & Transfermarkt API, DomPDF Receipt Engine, Granular RBAC, WebKit Hardening
- Production Engineering Benchmarks:
  - 100% Autonomous League & Fixture Sync: Mackolik and Transfermarkt scrapers ingest match scores, standings, and competitor crests with zero manual entry.
  - Zero Bloated CMS Overhead: Bespoke lightweight PHP MVC core replacing WordPress/WooCommerce with zero plugin vulnerability surface.
  - Native İyzico 3D Secure FanShop: Multi-variant size selection, atomic inventory holds, promo coupon logic, and automated DomPDF receipt generation.
  - DeepL AI Bilingual Press Pipeline: Turkish news and announcements automatically translated into soccer-contextual English via background worker queues.
  - Sub-40ms Server Response (TTFB): Lean PDO abstraction, optimized MySQL schemas, and strict iOS Safari WebKit hardening.

### MyBusinessBoss (All-in-One Enterprise B2B ERP & CRM SaaS Platform)
- URL (TR): ${SITE_URL}/projeler/mybusinessboss
- URL (EN): ${SITE_URL}/en/projects/mybusinessboss
- Tech: PHP MVC, MySQL Enterprise, TypeScript, Progressive Web App (PWA), Service Worker, Redis Caching, ZXing Optical Barcode Engine, CalDAV/ICS Mobile Feed, RBAC Zero-Trust Matrix, Dynamic PDF Engine
- Production Engineering Benchmarks:
  - 10+ Enterprise Modules in 1 Platform: Unifies POS, stock management, CRM, repair work orders, appointment scheduling, and cashflow.
  - <30ms Public Storefront via ETag 304: Redis payload hashing delivering instant responses and absorbing 90%+ redundant queries.
  - 100% PWA Offline Shell: Service Worker cache allowing operational navigation during connectivity interruptions.
  - Zero Hardware Cost Barcode POS: In-browser ZXing camera decoding transforming any smartphone into a commercial barcode terminal.
  - Live Mobile Calendar Synchronization: Native CalDAV/ICS feeds allowing staff to view work orders in Apple/Google Calendars in real-time.

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

### BİST AI Finans Terminali (Autonomous Financial Market Terminal & LLM Scoring)
- URL (TR): ${SITE_URL}/projeler/bist-ai
- URL (EN): ${SITE_URL}/en/projects/bist-ai
- Tech: Python, FastAPI, TypeScript, React 19, Next.js 16, Redis Hot-Cache, PostgreSQL (Time-series), NumPy/Pandas, Recharts, LLM Guardrails
- Production Engineering Benchmarks:
  - 500+ BIST Equities Monitored: Real-time price feeds, depth data, and corporate disclosures processed across the entire exchange.
  - <20ms API Response Time: Multi-tier Redis TTL hot-caching delivering instantaneous analytical queries during peak trading hours.
  - Vectorized Mathematical Indicator Engine: 10+ multi-period indicators (RSI, MACD, Bollinger Bands, EMA/SMA, Stochastic) computed in single-digit milliseconds via NumPy array vectorization.
  - 0% Hallucination Financial LLM: Two-stage architecture where deterministic Python engines calculate exact financial ratios (P/E, P/B, Net Debt/EBITDA) before feeding strict JSON schemas to the LLM for qualitative commentary.
  - Autonomous Quarterly Balance Sheet Parser: Ingests unstructured public disclosure tables (KAP) and converts them into standardized financial statement models with YoY/QoQ growth metrics.

### Free API Directory (500+ Verified REST APIs & Live Terminal Sandbox)
- URL (TR): ${SITE_URL}/projeler/free-api
- URL (EN): ${SITE_URL}/en/projects/free-api
- Live Demo: https://freeapi.website
- Tech: Next.js 15, TypeScript, React 19, Tailwind CSS v4, Framer Motion, Serverless Edge Proxy, SSRF Guard, Lucide React, i18n
- Production Engineering Benchmarks:
  - 500+ Verified REST APIs: Cataloged across 46 vertical categories (Finance, AI, Crypto, Weather, Security) with continuous health checks.
  - <30ms In-Browser Terminal Sandbox: Interactive developer console with syntax highlighting, collapsible JSON formatting, and instant testing without context switching.
  - 100% SSRF & Bot Shielding: Serverless edge proxy enforcing strict CIDR IP blacklisting (blocking internal 127.0.0.1, private subnets, and cloud metadata endpoints) while bypassing client CORS issues.
  - One-Click Polyglot Code Synthesis: Live compilation of headers and query parameters into copy-pasteable cURL, TypeScript/Fetch, and Python/Requests snippets.
  - Full Bilingual Taxonomy Parity: Complete reciprocal TR/EN localization and instant client-side fuzzy searching with zero bundle overhead.

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
