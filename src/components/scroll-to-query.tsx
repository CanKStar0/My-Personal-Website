"use client";

import { useEffect } from "react";

export function ScrollToQuery() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get("scrollTo");
    if (!scrollTo) return;

    window.history.replaceState(null, "", window.location.pathname);

    let timeoutId: number;

    const tryScroll = (attempts = 0) => {
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "auto" });
      } else if (attempts < 10) {
        timeoutId = window.setTimeout(() => tryScroll(attempts + 1), 100);
      }
    };

    timeoutId = window.setTimeout(() => tryScroll(), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
