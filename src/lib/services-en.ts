import type { Service } from "@/lib/services";

export const servicesEn: Service[] = [
  {
    slug: "web-scraping",
    shortTitle: "Web Scraping",
    title: "Web Scraping and Automated Data Collection Services",
    metadataTitle: "Web Scraping and Data Collection Services",
    description: "Custom web scraping systems for reliable data collection, cleaning, scheduling, and delivery to APIs or databases.",
    eyebrow: "Data collection systems",
    intro: "I build custom systems that turn publicly available web data into a structured, reliable, and maintainable flow. Each solution is designed around the source, required fields, update frequency, and delivery format.",
    sections: [
      { title: "What problem does web scraping solve?", body: "Web scraping replaces repetitive manual collection with an automated data pipeline. The goal is not merely to extract a page, but to create a monitored system that can clean, validate, and deliver useful records." },
      { title: "What data can be collected?", body: "Publicly available data can be structured after evaluating access conditions and the intended use.", items: ["Product, price, and stock data", "News and category feeds", "Listings and catalog records", "Public web data for research"] },
      { title: "Dynamic websites and browser automation", body: "Playwright-based browser automation can handle JavaScript-rendered content and interaction-driven flows. Lightweight HTTP clients are preferred when a full browser would add unnecessary cost." },
      { title: "Cleaning, standardization, and delivery", body: "Raw records are processed for duplicates, missing fields, and inconsistent formats. Results can be delivered through an API, PostgreSQL, MongoDB, or another application-ready format." },
      { title: "Scheduled and maintainable operation", body: "Scheduled jobs, logs, retries, and cache layers help the system remain manageable as sources change instead of working as a one-off script." },
    ],
    technologies: ["Playwright", "Node.js", "Python", "MongoDB", "Redis", "PostgreSQL", "REST API"],
    relatedServices: ["api-gelistirme", "ozel-yazilim-gelistirme"],
    project: { title: "News Portal", description: "Explore a real product combining autonomous news collection, caching, data cleaning, and delivery layers.", href: "/en/projects/haber-portali", anchor: "Explore the News Portal web scraping architecture" },
  },
  {
    slug: "yapay-zeka-otomasyon",
    shortTitle: "AI Automation",
    title: "Artificial Intelligence and AI Automation Solutions",
    metadataTitle: "AI Automation Services",
    description: "Practical AI automation solutions combining LLM integrations, controlled workflows, APIs, and existing business systems.",
    eyebrow: "Intelligent workflows",
    intro: "I transform repetitive interpretation and content tasks into controlled AI workflows, keeping human review where it matters. Solutions connect to existing tools through APIs and are designed around measurable business outcomes.",
    sections: [
      { title: "What is AI automation?", body: "AI automation combines language models with conventional software rules to process text, documents, and semi-structured data. AI is used only where flexibility creates clear value and the cost of errors can be controlled." },
      { title: "Business process automation", body: "Classification, summarization, enrichment, report preparation, and information transfer between systems can be automated when outputs can be reviewed and measured." },
      { title: "LLM integrations and AI agents", body: "Model providers, company data, and external tools are connected through controlled API layers. Permissions, validation, and human approval points are treated as part of the architecture." },
      { title: "API and AI architecture", body: "The AI feature is designed together with data sources, backend services, caching, observability, and user experience instead of being isolated as a prompt." },
      { title: "Realistic use cases", body: "Internal assistants, document processing, reporting, data analysis, request classification, and AI features for existing products can be evaluated according to project scope." },
    ],
    technologies: ["Python", "FastAPI", "Node.js", "LLM APIs", "Redis", "PostgreSQL", "Next.js"],
    relatedServices: ["ozel-yazilim-gelistirme", "api-gelistirme"],
    project: { title: "BIST AI", description: "See how data processing, backend services, and analytics layers come together in a real product.", href: "/en/projects/bist-ai", anchor: "Explore the BIST AI data and analytics architecture" },
  },
  {
    slug: "ozel-yazilim-gelistirme",
    shortTitle: "Custom Software",
    title: "Custom Software Development for Businesses",
    metadataTitle: "Custom Software Development",
    description: "Maintainable web applications, automation systems, APIs, and backend solutions for business needs that off-the-shelf tools cannot cover.",
    eyebrow: "Core service",
    intro: "When existing tools do not fit the workflow, I analyze the problem and surrounding systems to develop a tailored solution. The target is not just working code, but a maintainable product aligned with the actual operation.",
    sections: [
      { title: "What can be built?", body: "Depending on the need, the project can cover an end-to-end product or a focused layer connected to an existing system.", items: ["Web applications and SaaS products", "Management dashboards and backend systems", "APIs and system integrations", "Data collection and automation systems", "AI-assisted applications"] },
      { title: "Business problems addressed", body: "Manual workload, disconnected tools, repeated data entry, processes that cannot scale, and custom rules unsupported by standard products are translated into a technical solution." },
      { title: "Technical approach", body: "React and Next.js interfaces, Node.js or Python/FastAPI backends, and PostgreSQL, MongoDB, or Redis data layers are selected according to the project requirements." },
      { title: "Development process", body: "Analysis → architecture → development → testing → release → improvement. Scope, critical user flows, and success criteria are clarified before implementation." },
      { title: "Integration with existing systems", body: "Not every project needs to start from zero. Focused solutions can connect to existing APIs, data sources, or operational tools." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
    relatedServices: ["web-scraping", "yapay-zeka-otomasyon", "api-gelistirme", "nextjs-gelistirme"],
    project: { title: "Real project evidence", description: "Review the engineering approach used in data collection and financial analytics systems.", href: "/en/projects", anchor: "Explore selected custom software projects" },
  },
  {
    slug: "api-gelistirme",
    shortTitle: "API Development",
    title: "API Development and System Integration",
    metadataTitle: "API Development and Integration",
    description: "Reliable REST API development and third-party service, database, and existing-system integrations for web and data products.",
    eyebrow: "Backend and integration",
    intro: "I build API and backend layers that allow applications to exchange data reliably. Client requirements, data models, access rules, and expected load are evaluated together.",
    sections: [
      { title: "REST API development", body: "Custom APIs are built with clear resource models, consistent error responses, and maintainable endpoints for web or mobile clients." },
      { title: "Backend systems", body: "Business rules, validation, background tasks, and application services are separated from the interface in a testable backend layer." },
      { title: "Third-party integrations", body: "Payment, data, notification, and operational services are connected with controlled error handling and explicit contracts." },
      { title: "Data, access, and performance", body: "PostgreSQL, MongoDB, or Supabase integrations can be combined with authentication, authorization, and Redis caching where the use case requires them." },
      { title: "Documentation and maintainability", body: "Endpoint contracts and critical flows remain understandable so another team can maintain the integration without depending on one developer." },
    ],
    technologies: ["FastAPI", "Node.js", "REST", "PostgreSQL", "MongoDB", "Redis", "Supabase"],
    relatedServices: ["yapay-zeka-otomasyon", "ozel-yazilim-gelistirme"],
    project: { title: "BIST AI", description: "Explore how Python, FastAPI, Redis, and PostgreSQL support a data-oriented product.", href: "/en/projects/bist-ai", anchor: "Explore the BIST AI backend architecture" },
  },
  {
    slug: "nextjs-gelistirme",
    shortTitle: "Next.js Development",
    title: "Next.js Web Application Development",
    metadataTitle: "Next.js Development Services",
    description: "Fast, accessible, and search-friendly Next.js websites and modern web applications built with React and TypeScript.",
    eyebrow: "Modern web development",
    intro: "I build performant and maintainable Next.js interfaces ranging from marketing sites to data-rich web applications. Rendering strategy, SEO, and user experience are designed around the product.",
    sections: [
      { title: "What can be built with Next.js?", body: "Business and personal websites, SaaS interfaces, management dashboards, content platforms, and API-driven applications can be developed." },
      { title: "Server rendering and content discovery", body: "Server Components, static generation, and server-side rendering keep important content from depending solely on client-side JavaScript." },
      { title: "Performance and Core Web Vitals", body: "Image sizing, font loading, code splitting, and client boundaries are designed to reduce LCP, INP, and CLS risks." },
      { title: "SEO-ready Next.js development", body: "Unique metadata, canonical URLs, sitemap, robots, structured data, and correct HTTP status codes are built together with the route architecture." },
      { title: "API and backend integrations", body: "The Next.js interface connects to FastAPI, Node.js, or external services through secure and maintainable contracts." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "REST API"],
    relatedServices: ["ozel-yazilim-gelistirme", "api-gelistirme"],
    project: { title: "Next.js project examples", description: "Explore the product approach used in the News Portal and BIST AI interfaces.", href: "/en/projects", anchor: "Explore projects developed with Next.js" },
  },
];

const routeSlugToServiceSlug: Record<string, string> = {
  "custom-software-development": "ozel-yazilim-gelistirme",
  "web-scraping": "web-scraping",
  "ai-automation": "yapay-zeka-otomasyon",
  "api-development": "api-gelistirme",
  "nextjs-development": "nextjs-gelistirme",
};

export const englishServiceByRouteSlug = Object.fromEntries(
  Object.entries(routeSlugToServiceSlug).map(([routeSlug, serviceSlug]) => [
    routeSlug,
    servicesEn.find((service) => service.slug === serviceSlug)!,
  ]),
) as Record<string, Service>;

export const englishServiceRouteSlugs = Object.keys(routeSlugToServiceSlug);

export const englishServiceBySlug = Object.fromEntries(
  servicesEn.map((service) => [service.slug, service]),
) as Record<string, Service>;
