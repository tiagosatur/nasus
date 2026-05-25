import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

async function loadInstrumentSerifItalic(): Promise<ArrayBuffer> {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((r) => r.text());

  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('?(?:opentype|truetype|woff2?)'?\)/);
  if (!match) throw new Error("Could not parse Instrument Serif italic font URL");

  return await fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function Icon() {
  const fontData = await loadInstrumentSerifItalic();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EDEAE5",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: 30,
            lineHeight: 1,
            color: "#7B1F3A",
            position: "relative",
            top: -2,
          }}
        >
          n
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#7B1F3A",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: fontData,
          style: "italic",
          weight: 400,
        },
      ],
    }
  );
}
