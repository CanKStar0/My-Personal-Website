import { SITE_NAME, SITE_URL, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site";
import { services } from "@/lib/services";
import { blogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ${SITE_NAME}
> Full-Stack Developer & AI Automation Specialist specializing in autonomous web scraping, AI workflows, scalable REST APIs, and Next.js applications.

## About
Canpolat Kaya is a product-oriented Full-Stack Developer based in Turkey, working with global and local clients. He builds robust, autonomous systems ranging from high-scale web scraping pipelines and custom AI agents/workflows to enterprise REST APIs and modern Next.js/React web applications.

- Website: ${SITE_URL}
- English Version: ${SITE_URL}/en
- Profile Photo: ${SITE_URL}/images/canpolat-kaya.jpg
- Contact Email: ${CONTACT_EMAIL}
- GitHub: ${SOCIAL_LINKS.github}
- LinkedIn: ${SOCIAL_LINKS.linkedin}

## Core Services
${services
  .map(
    (s) => `- [${s.title}](${SITE_URL}/hizmetler/${s.slug}): ${s.description} (Tech: ${s.technologies.join(", ")})`
  )
  .join("\n")}

## Featured Projects
- [Haber Portalı](${SITE_URL}/projeler/haber-portali): Autonomous multi-source news gathering, automated content classification, Redis caching, and real-time feed distribution.
- [BİST AI Finans Terminali](${SITE_URL}/projeler/bist-ai): AI-powered financial data processing, stock technical analysis, balance sheet scoring, and real-time visualization.
- [Free API Projeleri](${SITE_URL}/projeler/free-api): High-performance, open developer APIs with rate limiting, caching, and comprehensive OpenAPI/Swagger documentation.

## Technical Expertise & Knowledge Graph
- Web Scraping & Automation: Playwright, Puppeteer, Scrapy, BeautifulSoup, Selenium, Cloudflare/WAF bypass architectures, Residential/Datacenter Proxy rotation, Anti-bot detection mitigation.
- AI & LLM Systems: Large Language Models, RAG (Retrieval-Augmented Generation), Prompt Engineering, Autonomous AI Agents, Vector Databases, OpenAI/Anthropic/Gemini APIs.
- Backend & Data: Node.js, TypeScript, Python, FastAPI, Express, PostgreSQL, MongoDB, Redis, RESTful API Design, Microservices, Caching Strategies.
- Frontend & UI: Next.js (App Router), React 19, Tailwind CSS v4, TypeScript, Responsive & Accessible UI, Glassmorphism, Core Web Vitals Optimization.

## Key Articles & Guides (Selected)
${blogPosts
  .slice(0, 15)
  .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
  .join("\n")}

## Full Index
- For complete comprehensive documentation including all 100+ articles and technical breakdowns, see: ${SITE_URL}/llms-full.txt
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
