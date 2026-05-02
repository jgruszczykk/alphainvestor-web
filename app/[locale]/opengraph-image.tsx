import { ImageResponse } from "next/og";

export const alt = "Alpha Investor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const isPl = locale === "pl";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 45%, #0a84ff33 100%)",
          color: "#f5f5f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#0a84ff",
            marginBottom: 16,
          }}
        >
          ALPHA INVESTOR
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          {isPl
            ? "Twoje portfele w jednym, klarownym widoku."
            : "Your portfolios, one clear view."}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#9ca3af",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {isPl
            ? "Wczesny dostęp - zapisz się na listę."
            : "Early access - join the waitlist."}
        </div>
      </div>
    ),
    { ...size },
  );
}
