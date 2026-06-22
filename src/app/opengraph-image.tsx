import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #050810 0%, #0a1a2e 50%, #050810 100%)",
        }}
      >
        <div
          style={{
            fontSize: 140,
            color: "#e8f4f8",
            fontWeight: 700,
            textShadow: "0 0 40px rgba(77,217,232,0.6)",
          }}
        >
          鲸落
        </div>
        <div
          style={{
            fontSize: 56,
            color: "#4dd9e8",
            letterSpacing: 12,
            marginTop: 10,
          }}
        >
          WHALEFALL
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#9ca3af",
            letterSpacing: 4,
            marginTop: 28,
          }}
        >
          TOP 60 SEA GUILD · WHERE WINDS MEET
        </div>
      </div>
    ),
    { ...size }
  );
}
