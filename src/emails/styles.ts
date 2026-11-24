import type { CSSProperties } from "react";

/**
 * Email clients need inline styles. These follow the site: a denim block
 * with the heading in ecru, a selvedge line (ecru, red, ecru) under it, then
 * indigo ink on white with 1px rules. No cards or tinted boxes in the text.
 * Web fonts are unreliable in mail, so the system face stands in for
 * Schibsted Grotesk.
 */
const palette = {
  paper: "#ffffff",
  ink: "#16203d",
  muted: "#525d7c",
  rule: "#d7dcea",
  denim: "#1a2850",
  ecru: "#efe8d8",
  onDenim: "#aab3d0",
  selvedge: "#c8102e",
};

const font =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const styles = {
  body: {
    backgroundColor: palette.paper,
    color: palette.ink,
    fontFamily: font,
    margin: 0,
    padding: "40px 0",
  },
  container: {
    margin: "0 auto",
    maxWidth: "560px",
    padding: "0 24px",
  },
  /** The cloth: the heading and its meta line on denim. */
  band: {
    backgroundColor: palette.denim,
    padding: "28px 28px 26px",
  },
  heading: {
    color: palette.ecru,
    fontSize: "30px",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: "34px",
    margin: 0,
  },
  meta: {
    color: palette.onDenim,
    fontSize: "15px",
    lineHeight: "24px",
    margin: "6px 0 0",
  },
  metaLink: { color: palette.ecru, textDecoration: "underline" },
  /** The cloth's finished edge: ecru, a red line, ecru. */
  selvedge: {
    backgroundColor: palette.selvedge,
    borderTop: `3px solid ${palette.ecru}`,
    borderBottom: `4px solid ${palette.ecru}`,
    fontSize: 0,
    height: "3px",
    lineHeight: "3px",
    margin: "0 0 28px",
  },
  text: {
    color: palette.ink,
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 16px",
  },
  /** The visitor's message, as they wrote it. */
  message: {
    color: palette.ink,
    fontSize: "17px",
    lineHeight: "28px",
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  button: {
    backgroundColor: palette.denim,
    borderRadius: "6px",
    color: palette.ecru,
    display: "inline-block",
    fontSize: "15px",
    fontWeight: 600,
    padding: "12px 20px",
    textDecoration: "none",
  },
  rule: {
    border: "none",
    borderTop: `1px solid ${palette.rule}`,
    margin: "28px 0 16px",
  },
  footer: {
    color: palette.muted,
    fontSize: "13px",
    lineHeight: "20px",
    margin: 0,
  },
  mutedLink: { color: palette.muted, textDecoration: "underline" },
} satisfies Record<string, CSSProperties>;
