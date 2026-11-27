// Bilingual blog slug mapping for zero-bundle-overhead i18n.
// Only pairs that exist in BOTH src/lib/blog.ts and src/lib/blog-en.ts should be listed here
// so hreflang alternates and language-switcher links never point to 404 pages.
export const blogSlugPairs: [string, string][] = [
  ["e-ticaret-rakip-fiyat-takip-sistemi-rehberi", "ecommerce-competitor-price-tracking-system-guide"],
  ["isletmeler-icin-ai-otomasyon-ve-maliyet-rehberi", "ai-automation-and-roi-guide-for-businesses"],
  ["uretken-motor-optimizasyonu-geo-rehberi", "generative-engine-optimization-geo-guide"],
  ["gpt-6-astra-ve-responses-api-rehberi", "gpt-6-astra-and-responses-api-guide"],
  ["gemini-3-8-flash-ve-project-astra-live-api", "gemini-3-8-flash-and-project-astra-live-api"],
  ["claude-fable-5-1-ve-opus-5-kurumsal-ajan-rehberi", "claude-fable-5-1-and-opus-5-enterprise-agent-guide"],
  ["llama-4-moe-ve-deepseek-r1-yerel-gpu-dagitim", "llama-4-moe-and-deepseek-r1-local-gpu-deployment"],
  ["2026-frontier-agent-stack-mem0-langgraph-caching", "2026-frontier-agent-stack-mem0-langgraph-caching"],
  ["claude-code-cli-rehberi", "claude-code-cli-guide"],
  ["claude-code-vs-cursor-karsilastirma", "claude-code-vs-cursor-comparison"],
  ["gemini-api-ve-fastapi-ile-gercek-zamanli-streaming", "gemini-api-fastapi-realtime-streaming"],
  ["agentic-coding-nedir-ve-nasil-calisir", "what-is-agentic-coding-and-how-it-works"],
  ["openai-o3-mini-ve-codex-ajan-mimarisi", "openai-o3-mini-and-reasoning-agent-architecture"],
  ["playwright-ve-ai-ile-akilli-web-kazima", "playwright-and-ai-smart-web-scraping"],
  ["nextjs-15-ai-sdk-ile-agentic-ui", "nextjs-15-ai-sdk-agentic-ui"],
  ["crewai-ve-langgraph-ile-multi-agent-sistemleri", "crewai-and-langgraph-multi-agent-systems"],
  ["gemini-thinking-mode-ve-akil-yurutme", "gemini-thinking-mode-and-reasoning"],
  ["claude-sonnet-5-ve-claude-opus-5-rehberi", "claude-sonnet-5-and-claude-opus-5-guide"],
  ["deepseek-r1-ve-acik-kaynak-reasoning", "deepseek-r1-open-source-reasoning"],
  ["llm-structured-outputs-pydantic-v2", "llm-structured-outputs-pydantic-v2"],
  ["prompt-caching-ile-maliyet-dusurme", "prompt-caching-cost-optimization"],
];
