import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/config/site";
import { PROFILE, RECOMMENDATIONS } from "@/content";
import { annotateHeadline, resolveProofNotes } from "@/lib/proof";

/** Rendered once at build: nothing in the card depends on the request. */
export const dynamic = "force-static";

const { colors } = SITE;

const fromRoot = (...parts: string[]) => join(process.cwd(), ...parts);

/** The headline as words, each carrying the note number that follows it. */
function headlineWords() {
  return annotateHeadline(PROFILE.headline, PROFILE.proof).flatMap(
    (segment) => {
      const words = segment.text.trim().split(/\s+/);
      return words.map((word, index) => ({
        word,
        note: index === words.length - 1 ? segment.note : undefined,
      }));
    }
  );
}

/**
 * Social card, the hero in miniature: the name, the headline with its note
 * markers, and the sources those markers point to.
 */
export async function GET() {
  try {
    const [regular, heavy, photo] = await Promise.all([
      readFile(fromRoot("src/assets/fonts/schibsted-grotesk-500.ttf")),
      readFile(fromRoot("src/assets/fonts/schibsted-grotesk-800.ttf")),
      readFile(fromRoot("public", PROFILE.photo.src)),
    ]);
    const photoUrl = `data:image/jpeg;base64,${photo.toString("base64")}`;
    const notes = resolveProofNotes(PROFILE.proof, RECOMMENDATIONS);
    const host = new URL(PROFILE.website).host;

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 80px 52px",
          background: colors.paper,
          color: colors.ink,
          fontFamily: "Schibsted Grotesk",
          fontWeight: 500,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", width: 800 }}>
            <div
              style={{
                fontSize: 132,
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.055em",
                marginLeft: -6,
              }}
            >
              {PROFILE.name}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                // The site hero's measure: the same three-line rag.
                width: 600,
                marginTop: 40,
                fontSize: 44,
                lineHeight: 1.16,
                letterSpacing: "-0.03em",
              }}
            >
              {headlineWords().map(({ word, note }, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginRight: 11,
                  }}
                >
                  <span>{word}</span>
                  {note ? (
                    <span
                      style={{
                        marginLeft: 2,
                        marginTop: 3,
                        fontSize: 20,
                        fontWeight: 800,
                        letterSpacing: 0,
                        color: colors.accent,
                      }}
                    >
                      {String(note)}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <img
            src={photoUrl}
            alt=""
            width={208}
            height={260}
            style={{ borderRadius: 8, objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 44,
            marginTop: "auto",
            paddingTop: 20,
            borderTop: `3px solid ${colors.ink}`,
            fontSize: 24,
          }}
        >
          {notes.map((note) => (
            <div key={note.number} style={{ display: "flex", gap: 10 }}>
              <span style={{ color: colors.accent, fontWeight: 800 }}>
                {String(note.number)}
              </span>
              <span>{note.cite}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 14,
            fontSize: 22,
            color: colors.muted,
          }}
        >
          <span>{`${PROFILE.role}, ${PROFILE.location.label}`}</span>
          <span>{host}</span>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: "Schibsted Grotesk", data: regular, weight: 500 },
          { name: "Schibsted Grotesk", data: heavy, weight: 800 },
        ],
      }
    );
  } catch (error) {
    console.error("OG image generation failed:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
