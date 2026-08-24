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
    faqs: [
      {
        question: "Can your web scraping systems handle Cloudflare or anti-bot protections?",
        answer: "Yes. Using stealth browser automation (Playwright/Puppeteer), residential proxy rotation, realistic browser fingerprint emulation, and human-like request patterns, systems are designed to bypass modern anti-bot hurdles sustainably.",
      },
      {
        question: "In what format and where is the collected data delivered?",
        answer: "Data can be stored directly in PostgreSQL, MongoDB, or MySQL databases, published to custom REST API endpoints or webhooks, or exported to scheduled JSON, CSV, and Excel reports.",
      },
      {
        question: "What happens if the target website updates its DOM or layout?",
        answer: "All scrapers are built with structured error handling, health checks, and alerting. When layout modifications occur, alerts are triggered immediately for quick selector adaptation.",
      },
      {
        question: "How frequently can data collection tasks run?",
        answer: "Using CRON schedulers and Redis-backed message queues, scrapers can execute on minutely, hourly, daily, or event-driven real-time intervals.",
      },
    ],
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
    faqs: [
      {
        question: "Which LLM models and API providers do you support?",
        answer: "I integrate OpenAI (GPT-4o), Anthropic (Claude 3.5), Google (Gemini 1.5/2.0), DeepSeek, as well as local open-weight models (Ollama, Llama 3, Mistral) based on client privacy and latency needs.",
      },
      {
        question: "How can our proprietary business documents be connected securely to AI?",
        answer: "Through RAG (Retrieval-Augmented Generation) architectures and vector embeddings (PGVector, Pinecone, Qdrant), allowing the AI to query company documents without data leaks or public exposure.",
      },
      {
        question: "How do you mitigate AI hallucinations and ensure output reliability?",
        answer: "By applying strict prompt engineering, schema validation (Zod / Pydantic), deterministic post-processing guardrails, and human-in-the-loop approval stages where critical.",
      },
    ],
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
    faqs: [
      {
        question: "How long does a typical custom software project take to deliver?",
        answer: "MVPs and focused automations are generally deployed within 2 to 4 weeks, while larger full-scale SaaS platforms are delivered in iterative milestone phases.",
      },
      {
        question: "Who owns the intellectual property and source code?",
        answer: "You retain 100% full ownership of all source code, architecture designs, and database schemas. The project is delivered clean and documented without vendor lock-in.",
      },
      {
        question: "Do you offer post-launch maintenance and technical support?",
        answer: "Yes, ongoing server monitoring, security patching, performance optimization, and incremental feature development agreements are available.",
      },
    ],
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
    faqs: [
      {
        question: "What security and authorization standards are implemented for APIs?",
        answer: "Standard implementations include JWT authentication, OAuth2, granular API key rate limiting, strict CORS policies, and compliance with OWASP API Security Top 10 guidelines.",
      },
      {
        question: "How is API documentation generated and maintained?",
        answer: "Interactive OpenAPI/Swagger documentation is automatically generated, accompanied by ready-to-test Postman collections and comprehensive schema models.",
      },
      {
        question: "How do you guarantee high throughput and low response times?",
        answer: "Through Redis caching layers, async I/O handlers, database index optimization, and connection pooling to achieve sub-50ms endpoint latencies.",
      },
    ],
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
    faqs: [
      {
        question: "What benefits does Next.js 16 App Router & React 19 provide?",
        answer: "React Server Components (RSC) drastically reduce client bundle sizes, improve first load speed (LCP), and allow search engine crawlers to immediately index fully-rendered HTML.",
      },
      {
        question: "Do you guarantee 90+ Core Web Vitals scores?",
        answer: "Yes, via modern Tailwind CSS v4 styling, optimized image pipelines, font display swap, and minimal client execution, pages achieve top Google PageSpeed ratings.",
      },
      {
        question: "How is multi-language (i18n) configured in Next.js?",
        answer: "Using clean URL routing (/en), hreflang alternate tags, metadata synchronization, and translation structures without messy client redirections.",
      },
    ],
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
