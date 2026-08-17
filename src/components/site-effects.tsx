"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
});

export function SiteEffects() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(true);
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleId = idleWindow.requestIdleCallback?.(enable, { timeout: 1500 });
    const timeoutId = idleId === undefined ? window.setTimeout(enable, 1500) : undefined;

    window.addEventListener("pointermove", enable, { once: true, passive: true });
    window.addEventListener("touchstart", enable, { once: true, passive: true });

    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      window.removeEventListener("pointermove", enable);
      window.removeEventListener("touchstart", enable);
    };
  }, []);

  if (!enabled) return null;

  return (
    <SplashCursor
      DENSITY_DISSIPATION={1.5}
      PRESSURE={0.2}
      PRESSURE_ITERATIONS={14}
      CURL={10}
      SPLAT_RADIUS={0.22}
      SPLAT_FORCE={5500}
      COLOR_UPDATE_SPEED={11}
      DYE_RESOLUTION={1024}
      MAX_DEVICE_PIXEL_RATIO={1.5}
      IDLE_FPS={30}
      COLOR="#9e0a2b"
    />
  );
}
