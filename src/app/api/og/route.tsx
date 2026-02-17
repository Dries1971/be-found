import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// Cache: 1 week edge, 1 day client
const CACHE_CONTROL = "public, max-age=86400, s-maxage=604800";

// Design tokens (match theme.css)
const NAVY = "#0F172A";
const MIDNIGHT = "#020617";
const GOLD = "#F59E0B";
const SNOW = "#F8FAFC";
const SLATE = "#94A3B8";

type OgType = "default" | "blog" | "pillar" | "service" | "report";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = searchParams.get("title") || "Be-Found.online";
  const type = (searchParams.get("type") || "default") as OgType;
  const subtitle = searchParams.get("subtitle") || "";
  const stat = searchParams.get("stat") || "";

  // Load Inter font (regular + bold)
  const [interRegular, interBold] = await Promise.all([
    fetch(new URL("https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap")).then(() =>
      fetch("https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff").then((res) =>
        res.arrayBuffer()
      )
    ),
    fetch("https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff").then((res) =>
      res.arrayBuffer()
    ),
  ]);

  return new ImageResponse(
    <OgTemplate title={title} type={type} subtitle={subtitle} stat={stat} />,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
      headers: {
        "Cache-Control": CACHE_CONTROL,
      },
    }
  );
}

interface OgTemplateProps {
  title: string;
  type: OgType;
  subtitle: string;
  stat: string;
}

function OgTemplate({ title, type, subtitle, stat }: OgTemplateProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        background: `linear-gradient(135deg, ${MIDNIGHT} 0%, ${NAVY} 50%, ${MIDNIGHT} 100%)`,
        fontFamily: "Inter",
      }}
    >
      {/* Top: Logo + type badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Gold dot as simple logo mark */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: GOLD,
            }}
          />
          <span style={{ color: SNOW, fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Be-Found.online
          </span>
        </div>
        {type !== "default" && (
          <span
            style={{
              color: GOLD,
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              border: `1px solid ${GOLD}`,
              padding: "6px 16px",
              borderRadius: "20px",
            }}
          >
            {type === "blog" ? "Article" : type === "pillar" ? "Guide" : type === "report" ? "Research" : "Service"}
          </span>
        )}
      </div>

      {/* Middle: Title + subtitle */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, justifyContent: "center" }}>
        <h1
          style={{
            color: SNOW,
            fontSize: title.length > 60 ? "42px" : title.length > 40 ? "52px" : "60px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: 0,
            maxWidth: stat ? "700px" : "100%",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: SLATE, fontSize: "22px", margin: 0, lineHeight: 1.4, maxWidth: "700px" }}>
            {subtitle}
          </p>
        )}

        {/* Stat highlight for pillar/report pages */}
        {stat && (
          <div
            style={{
              position: "absolute",
              right: "80px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: GOLD, fontSize: "96px", fontWeight: 700, lineHeight: 1 }}>{stat}</span>
          </div>
        )}
      </div>

      {/* Bottom: Gold accent line + URL */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: "60px", height: "4px", background: GOLD, borderRadius: "2px" }} />
        <span style={{ color: SLATE, fontSize: "16px" }}>be-found.online</span>
      </div>
    </div>
  );
}
