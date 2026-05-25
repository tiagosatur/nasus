import { ImageResponse } from "next/og";

export const alt = "Nasus Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY = {
  pt: {
    wordmark: "Nasus Digital",
    sub: "Sites que ranqueiam, convertem e trazem clientes reais.",
    domain: "nasus.digital",
  },
  en: {
    wordmark: "Nasus Digital",
    sub: "Websites that rank, convert, and bring real clients.",
    domain: "nasus.digital",
  },
} as const;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = COPY[locale === "en" ? "en" : "pt"];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#1C0F14",
          padding: "72px 80px",
          justifyContent: "space-between",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#A47880",
            fontSize: 28,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          {copy.domain}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              width: 140,
              height: 2,
              background:
                "linear-gradient(90deg, #BE405F 0%, rgba(190, 64, 95, 0) 100%)",
            }}
          />
          <div
            style={{
              fontSize: 132,
              color: "#FAF0F2",
              lineHeight: 1.05,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
            }}
          >
            {copy.wordmark}
          </div>
          <div
            style={{
              fontSize: 38,
              color: "#FAF0F2",
              lineHeight: 1.35,
              maxWidth: 940,
              fontFamily: "sans-serif",
              opacity: 0.78,
            }}
          >
            {copy.sub}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
