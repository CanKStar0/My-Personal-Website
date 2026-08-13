import type { BlogPost } from "@/lib/blog";

export const blogPostsEn: BlogPost[] = [
  {
    slug: "what-is-web-scraping",
    title: "What Is Web Scraping and How Does It Work?",
    description: "Learn what web scraping is, when automated data collection is useful, and which layers make a scraping system maintainable.",
    publishedAt: "2026-08-13",
    modifiedAt: "2026-08-13",
    category: "Web Scraping",
    readingTime: "6 min",
    serviceHref: "/en/services/web-scraping",
    serviceAnchor: "Explore web scraping and data collection services",
    sections: [
      { title: "What does web scraping mean?", paragraphs: ["Web scraping is the process of collecting publicly available information from web pages with software and transforming it into structured data. It automates work such as copying product names, prices, or article titles.", "The main value is not simply reading a page. A production system must collect data consistently, remove duplicates, standardize fields, and deliver records in a format another system can use."] },
      { title: "The basic workflow", paragraphs: ["The system requests the target page, selects the required fields, validates records, and transfers the output to a defined destination. Pages that render content through JavaScript may require browser automation tools such as Playwright."], items: ["Analyze the source and access conditions", "Extract the required fields", "Clean and standardize the records", "Deliver through an API or database", "Monitor errors and source changes"] },
      { title: "Web scraping versus an API", paragraphs: ["An API is an official, structured access method defined by the data owner and is usually the first choice when it covers the requirement. Web scraping becomes relevant when no suitable API exists for publicly accessible information.", "The choice should consider terms of use, freshness, maintenance cost, and error tolerance rather than relying on one tool by default."] },
      { title: "Why maintainability matters", paragraphs: ["Page structures change, network failures happen, and duplicate records can appear. Scheduling, retries, logging, caching, and validation are what separate a production data pipeline from a one-off script."] },
    ],
  },
  {
    slug: "what-is-ai-automation",
    title: "What Is AI Automation and How Is It Used in Business?",
    description: "Understand how AI automation differs from classic automation and what makes an LLM integration reliable in a real workflow.",
    publishedAt: "2026-08-13",
    modifiedAt: "2026-08-13",
    category: "AI Automation",
    readingTime: "7 min",
    serviceHref: "/en/services/ai-automation",
    serviceAnchor: "Explore AI automation and integration services",
    sections: [
      { title: "What changes with AI automation?", paragraphs: ["Classic automation follows explicit rules. AI automation adds an interpretation layer for text, documents, and free-form requests that are difficult to express through deterministic conditions.", "A reliable system does not remove conventional software rules. It constrains model flexibility with validation, permissions, and observable business logic."] },
      { title: "Suitable use cases", paragraphs: ["The strongest candidates are repetitive workflows where the output can be reviewed and quality can be measured."], items: ["Request and document classification", "Summaries and report drafts", "Data enrichment", "Knowledge-base question answering", "Controlled assistants for operational teams"] },
      { title: "AI agents versus classic workflows", paragraphs: ["A classic workflow has predefined steps. An AI agent may select tools and plan multiple actions around a goal, which also requires stricter permission boundaries and observability.", "Not every automation needs an agent. A simpler deterministic workflow is often safer for predictable tasks."] },
      { title: "Layers of a reliable integration", paragraphs: ["Data access, privacy policies, fallbacks, cost monitoring, and human approval matter as much as the selected model. The AI feature should be designed together with the product backend and user experience."] },
    ],
  },
  {
    slug: "what-is-rest-api",
    title: "What Is a REST API and How Does a Backend Use It?",
    description: "A practical introduction to REST APIs, client-backend communication, and the contracts that make an API reliable.",
    publishedAt: "2026-08-13",
    modifiedAt: "2026-08-13",
    category: "API & Backend",
    readingTime: "6 min",
    serviceHref: "/en/services/api-development",
    serviceAnchor: "Explore API development and system integration services",
    sections: [
      { title: "What does an API do?", paragraphs: ["An API defines how two software components exchange requests and responses. A web interface, mobile application, payment provider, or data service can communicate through this contract."] },
      { title: "The REST approach", paragraphs: ["REST APIs model data as resources and use HTTP methods to read or modify them. Consistent URLs, status codes, and response formats make integrations easier to maintain."], items: ["GET: read a resource", "POST: create a resource or operation", "PUT/PATCH: update", "DELETE: remove a resource", "HTTP status codes: communicate the result"] },
      { title: "What happens in the backend?", paragraphs: ["When a request arrives, input is validated, access permissions are checked, business rules run, and the service communicates with databases or external systems. The result is returned in a stable format the client understands."] },
      { title: "Qualities of a good API", paragraphs: ["Security, performance, and documentation are not finishing touches. Error handling, authorization, rate limits, caching, and observability should be evaluated according to the way the system will be used."] },
    ],
  },
];

export const blogPostEnBySlug = Object.fromEntries(
  blogPostsEn.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;
