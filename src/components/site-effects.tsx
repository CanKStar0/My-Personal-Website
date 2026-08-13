"use client";

import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
});

export function SiteEffects() {
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
