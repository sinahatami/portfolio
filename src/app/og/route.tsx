import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/config/site";
import { PROFILE, RECOMMENDATIONS } from "@/content";
import { annotateHeadline, resolveProofNotes } from "@/lib/proof";
import { cellCoverage, wovenSvg } from "@/lib/weave";
import { decodePng } from "@/server/og/png";

/** Rendered once at build: nothing in the card depends on the request. */
export const dynamic = "force-static";

const { colors } = SITE;

const CARD = { width: 1200, height: 630 };
/** The woven band: 34 warp threads at 7px, coarse enough to survive a thumbnail. */
const BAND = { height: 238, pitch: 7 };
const NAME = { size: 184, left: 73, top: 16 };

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
 * The name woven into twill, as an SVG data URL. The name is set once in
 * white on black at its final size, read back, and reduced to one cell per
 * thread; the same weave as the home page then turns that into cloth.
 */
async function wovenBand(heavy: Buffer) {
  const lettering = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#000",
        color: "#fff",
        paddingLeft: NAME.left,
        paddingTop: NAME.top,
        fontFamily: "Schibsted Grotesk",
        fontSize: NAME.size,
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: "-0.055em",
      }}
    >
      {PROFILE.name}
    </div>,
    {
      width: CARD.width,
      height: BAND.height,
      fonts: [{ name: "Schibsted Grotesk", data: heavy, weight: 800 }],
    }
  );
  const { width, height, rgba } = decodePng(
    new Uint8Array(await lettering.arrayBuffer())
  );
  const svg = wovenSvg({
    ...cellCoverage(rgba, width, height, BAND.pitch),
    pitch: BAND.pitch,
  });
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/**
 * Social card, the hero in miniature: the name woven into a band of twill
 * over a selvedge, the photo pinned over the cloth, the headline with its
 * note markers, and the sources those markers point to.
 */
export async function GET() {
  try {
    const [regular, heavy, photo] = await Promise.all([
      readFile(fromRoot("src/assets/fonts/schibsted-grotesk-500.ttf")),
      readFile(fromRoot("src/assets/fonts/schibsted-grotesk-800.ttf")),
      readFile(fromRoot("public", PROFILE.photo.src)),
    ]);
    const photoUrl = `data:image/jpeg;base64,${photo.toString("base64")}`;
    const bandUrl = await wovenBand(heavy);
    const notes = resolveProofNotes(PROFILE.proof, RECOMMENDATIONS);
    const host = new URL(PROFILE.website).host;

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: colors.paper,
          color: colors.ink,
          fontFamily: "Schibsted Grotesk",
          fontWeight: 500,
        }}
      >
        <img src={bandUrl} alt="" width={CARD.width} height={BAND.height} />
        {/* Selvedge: ecru, a red line, ecru. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 3, background: colors.ecru }} />
          <div style={{ height: 3, background: colors.accent }} />
          <div style={{ height: 4, background: colors.ecru }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            padding: "38px 80px 46px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              // The site hero's measure: the same three-line rag.
              width: 600,
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

          <div
            style={{
              display: "flex",
              gap: 44,
              marginTop: "auto",
              paddingTop: 18,
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
              marginTop: 12,
              fontSize: 22,
              color: colors.muted,
            }}
          >
            <span>{`${PROFILE.role}, ${PROFILE.location.label}`}</span>
            <span>{host}</span>
          </div>
        </div>

        {/* The photo, pinned over the cloth as on the home page. */}
        <img
          src={photoUrl}
          alt=""
          width={208}
          height={260}
          style={{
            position: "absolute",
            left: 912,
            top: 184,
            borderRadius: 4,
            border: `6px solid ${colors.paper}`,
            objectFit: "cover",
            boxShadow: "0 22px 44px -16px rgba(17, 26, 54, 0.55)",
          }}
        />
      </div>,
      {
        ...CARD,
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
