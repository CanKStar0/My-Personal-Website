"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { detectAIReferrer } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const isInitialPageView = useRef(true);

  useEffect(() => {
    // Detect AI Generative Engine referrals (ChatGPT, Perplexity, Claude, etc.)
    const aiDetection = detectAIReferrer();
    if (aiDetection.isAI && aiDetection.platform) {
      try {
        const attribution = {
          platform: aiDetection.platform,
          landing_path: window.location.pathname,
          referrer: document.referrer,
          timestamp: Date.now(),
        };
        sessionStorage.setItem("geo_ai_attribution", JSON.stringify(attribution));

        if (
          typeof window.gtag === "function" &&
          window.location.hostname !== "localhost" &&
          window.location.hostname !== "127.0.0.1"
        ) {
          window.gtag("event", "ai_referral_visit", {
            ai_platform: aiDetection.platform,
            landing_path: window.location.pathname,
            referrer: document.referrer,
          });
        }
      } catch {
        // Ignore session storage limits or privacy modes
      }
    }
  }, []);

  useEffect(() => {
    if (isInitialPageView.current) {
      isInitialPageView.current = false;
      return;
    }

    if (
      process.env.NODE_ENV !== "production" ||
      typeof window.gtag !== "function" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
