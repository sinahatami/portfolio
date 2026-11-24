import { ImageResponse } from "next/og";
import { SITE } from "@/config/site";
import { EDUCATION, EXPERIENCE, PROFILE } from "@/content";

export const runtime = "edge";

const { colors } = SITE;

const LINES = [
  {
    label: "Research",
    color: colors.research,
    items: EXPERIENCE.filter((r) => /research/i.test(r.role)),
  },
  {
    label: "Industry",
    color: colors.industry,
    items: EXPERIENCE.filter((r) => !/research/i.test(r.role)),
  },
  { label: "Study", color: colors.study, items: EDUCATION },
];

const START = 2017;
const END = 2027;
const year = (value: string) =>
  Number(value.slice(0, 4)) + (Number(value.slice(5, 7)) - 1) / 12;
const pct = (value: number) => ((value - START) / (END - START)) * 100;

/** Social card: a station board with the name, over a miniature line map. */
export async function GET() {
  try {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: colors.paper,
          color: colors.ink,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: colors.ink,
            color: "#ffffff",
            padding: "64px 80px 52px",
          }}
        >
          <div
            style={{ fontSize: 104, fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            {PROFILE.name}
          </div>
          <div style={{ fontSize: 34, opacity: 0.8, marginTop: 8 }}>
            {`${PROFILE.role}, ${PROFILE.location.label}`}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            padding: "56px 80px 0",
          }}
        >
          {LINES.map((line) => (
            <div
              key={line.label}
              style={{ display: "flex", alignItems: "center", height: 20 }}
            >
              <div
                style={{
                  width: 140,
                  fontSize: 24,
                  fontWeight: 700,
                  color: line.color,
                }}
              >
                {line.label}
              </div>
              <div style={{ position: "relative", display: "flex", flex: 1 }}>
                {line.items.map((item) => {
                  const start = pct(year(item.period.start));
                  const end = pct(year(item.period.end ?? "2026-12") + 1 / 12);
                  return (
                    <div
                      key={item.id}
                      style={{
                        position: "absolute",
                        top: -7,
                        left: `${start}%`,
                        width: `${end - start}%`,
                        height: 14,
                        background: line.color,
                      }}
                    />
                  );
                })}
                {line.items.map((item) => (
                  <div
                    key={`${item.id}-station`}
                    style={{
                      position: "absolute",
                      top: -12,
                      left: `${pct(year(item.period.start))}%`,
                      marginLeft: -12,
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      background: "#ffffff",
                      border: `5px solid ${colors.ink}`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>,
      { width: 1200, height: 630 }
    );
  } catch (error) {
    console.error("OG image generation failed:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
