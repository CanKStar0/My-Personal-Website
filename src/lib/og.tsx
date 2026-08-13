import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function createOgImage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#09090b", color: "#fafafa", padding: "72px 78px", fontFamily: "Arial, sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: 999, background: "rgba(225,29,72,0.17)", filter: "blur(80px)", right: -120, top: -170, display: "flex" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, fontWeight: 700 }}>
        <div style={{ display: "flex" }}>Canpolat Kaya <span style={{ color: "#71717a", marginLeft: 10 }}>/ Dev</span></div>
        <div style={{ display: "flex", color: "#e11d48", letterSpacing: 4, fontSize: 18, textTransform: "uppercase" }}>{eyebrow}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div style={{ display: "flex", width: 72, height: 5, background: "#e11d48", borderRadius: 999, marginBottom: 30 }} />
        <div style={{ display: "flex", fontSize: title.length > 52 ? 55 : 64, lineHeight: 1.08, fontWeight: 800, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", marginTop: 26, maxWidth: 900, color: "#a1a1aa", fontSize: 25, lineHeight: 1.45 }}>{description}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#71717a", fontSize: 18 }}><span>canpolatkaya.com</span><span>Custom Software · Automation · Backend</span></div>
    </div>,
    ogSize,
  );
}

