declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = "G-JLWJFQ732B";

export type AIPlatform =
  | "ChatGPT"
  | "Perplexity"
  | "Claude"
  | "Google Gemini"
  | "Microsoft Copilot"
  | "Meta AI"
  | "Poe"
  | "DuckDuckGo AI"
  | "Unknown AI";

export function detectAIReferrer(): { isAI: boolean; platform?: AIPlatform; source?: string } {
  if (typeof window === "undefined") return { isAI: false };

  const referrer = (document.referrer || "").toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const utmSource = (searchParams.get("utm_source") || "").toLowerCase();
  const utmMedium = (searchParams.get("utm_medium") || "").toLowerCase();

  // Check URL UTM tags
  if (utmSource.includes("chatgpt") || utmSource.includes("openai")) {
    return { isAI: true, platform: "ChatGPT", source: "utm" };
  }
  if (utmSource.includes("perplexity")) {
    return { isAI: true, platform: "Perplexity", source: "utm" };
  }
  if (utmSource.includes("claude") || utmSource.includes("anthropic")) {
    return { isAI: true, platform: "Claude", source: "utm" };
  }
  if (utmSource.includes("copilot")) {
    return { isAI: true, platform: "Microsoft Copilot", source: "utm" };
  }
  if (utmSource.includes("gemini")) {
    return { isAI: true, platform: "Google Gemini", source: "utm" };
  }
  if (utmMedium === "ai" || utmMedium === "llm") {
    return { isAI: true, platform: "Unknown AI", source: "utm" };
  }

  // Check document.referrer domain
  if (referrer.includes("chatgpt.com") || referrer.includes("chat.openai.com") || referrer.includes("openai.com")) {
    return { isAI: true, platform: "ChatGPT", source: "referrer" };
  }
  if (referrer.includes("perplexity.ai")) {
    return { isAI: true, platform: "Perplexity", source: "referrer" };
  }
  if (referrer.includes("claude.ai")) {
    return { isAI: true, platform: "Claude", source: "referrer" };
  }
  if (referrer.includes("gemini.google.com")) {
    return { isAI: true, platform: "Google Gemini", source: "referrer" };
  }
  if (referrer.includes("copilot.microsoft.com") || (referrer.includes("bing.com") && referrer.includes("chat"))) {
    return { isAI: true, platform: "Microsoft Copilot", source: "referrer" };
  }
  if (referrer.includes("meta.ai")) {
    return { isAI: true, platform: "Meta AI", source: "referrer" };
  }
  if (referrer.includes("poe.com")) {
    return { isAI: true, platform: "Poe", source: "referrer" };
  }
  if (referrer.includes("duckduckgo.com") && window.location.search.includes("ia=chat")) {
    return { isAI: true, platform: "DuckDuckGo AI", source: "referrer" };
  }

  return { isAI: false };
}

export function safeGtagEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", action, params);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", action, params]);
  }
}

export const trackEvent = (action: string, params?: Record<string, string | number | boolean>) => {
  if (typeof window === "undefined") return;

  let aiAttribution: { platform: string } | null = null;
  try {
    const stored = sessionStorage.getItem("geo_ai_attribution");
    if (stored) {
      aiAttribution = JSON.parse(stored);
    }
  } catch {
    // sessionStorage unavailable
  }

  const enrichedParams: Record<string, unknown> = {
    source_path: window.location.pathname,
    ...params,
  };

  if (aiAttribution?.platform) {
    enrichedParams.geo_ai_referral = true;
    enrichedParams.geo_ai_platform = aiAttribution.platform;
  }

  safeGtagEvent(action, enrichedParams);
};

