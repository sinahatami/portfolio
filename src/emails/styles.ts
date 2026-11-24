import type { CSSProperties } from "react";

/**
 * Email clients need inline styles. These follow the site: slate on white,
 * a heavy tight heading, a 2px slate rule under it, 1px rules after. No
 * cards or tinted boxes. Web fonts are unreliable in mail, so the system
 * face stands in for Schibsted Grotesk.
 */
const palette = {
  paper: "#ffffff",
  ink: "#1d2731",
  muted: "#56616c",
  rule: "#d8dce0",
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
  heading: {
    color: palette.ink,
    fontSize: "30px",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: "34px",
    margin: 0,
  },
  meta: {
    color: palette.muted,
    fontSize: "15px",
    lineHeight: "24px",
    margin: "6px 0 0",
  },
  /** Opens the content, as the 2px rule opens every list on the site. */
  ruleStrong: {
    border: "none",
    borderTop: `2px solid ${palette.ink}`,
    margin: "20px 0 24px",
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
    backgroundColor: palette.ink,
    borderRadius: "6px",
    color: "#ffffff",
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
  link: { color: palette.ink, textDecoration: "underline" },
  mutedLink: { color: palette.muted, textDecoration: "underline" },
} satisfies Record<string, CSSProperties>;
