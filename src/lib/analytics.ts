declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_TRACKING_ID = "G-JLWJFQ732B";

export const trackEvent = (action: string, params?: Record<string, string | number | boolean>) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      source_path: window.location.pathname,
      ...params,
    });
  }
};
