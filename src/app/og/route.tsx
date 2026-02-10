import { ImageResponse } from "next/og";
import { RESUME_DATA } from "@/data/resume-data";

export const runtime = "edge";

export async function GET() {
  try {
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          color: "white",
          padding: "60px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              marginRight: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            {RESUME_DATA.initials}
          </div>
          <div>
            <h1 style={{ fontSize: "48px", margin: 0, fontWeight: "bold" }}>
              {RESUME_DATA.name}
            </h1>
            <p style={{ fontSize: "24px", margin: 0, color: "#9ca3af" }}>
              {RESUME_DATA.position}
            </p>
          </div>
        </div>

        <div
          style={{ fontSize: "28px", textAlign: "center", maxWidth: "800px" }}
        >
          {RESUME_DATA.summary.substring(0, 120)}...
        </div>

        <div style={{ display: "flex", marginTop: "40px", gap: "20px" }}>
          {RESUME_DATA.skills
            .flatMap((cat) => cat.items)
            .slice(0, 5)
            .map((skill, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 20px",
                  background: "rgba(59, 130, 246, 0.2)",
                  borderRadius: "20px",
                  fontSize: "16px",
                  color: "#93c5fd",
                }}
              >
                {skill}
              </div>
            ))}
        </div>

        <div style={{ marginTop: "40px", fontSize: "16px", color: "#6b7280" }}>
          sinahatami.dev
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error("OG image generation failed:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
