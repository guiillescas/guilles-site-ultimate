import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Guilherme Illescas — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0b0c",
          color: "#e8e8e3",
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(197, 252, 77, 0.18), transparent 45%), radial-gradient(circle at 10% 90%, rgba(167, 139, 250, 0.12), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#8b8b90",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              background: "#c5fc4d",
              color: "#0b0b0c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 26,
            }}
          >
            G
          </div>
          <span>guilherme.illescas</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 86,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 500,
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
              gap: "0 18px",
            }}
          >
            <span>Engineering</span>
            <span style={{ color: "#c5fc4d" }}>high-performance</span>
            <span>web products for</span>
            <span style={{ color: "#c5fc4d" }}>millions</span>
            <span>of users.</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 22,
              color: "#8b8b90",
            }}
          >
            <span>Senior Software Engineer · São Paulo, Brazil</span>
            <span style={{ color: "#c5fc4d" }}>guilhermeillescas.dev</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
