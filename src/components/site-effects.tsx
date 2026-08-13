"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
});

export function SiteEffects() {
  const pathname = usePathname();

  if (pathname !== "/" && pathname !== "/en") return null;

  return (
    <SplashCursor
      DENSITY_DISSIPATION={1.5}
      PRESSURE={0.2}
      CURL={10}
      SPLAT_RADIUS={0.22}
      SPLAT_FORCE={5500}
      COLOR_UPDATE_SPEED={11}
      COLOR="#9e0a2b"
    />
  );
}
