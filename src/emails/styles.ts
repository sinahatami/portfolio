import type { CSSProperties } from "react";

/** Email clients need inline styles; these mirror the site's palette. */
const palette = {
  paper: "#f0f3f7",
  surface: "#ffffff",
  ink: "#0f1e3d",
  muted: "#586379",
  rule: "#dde2ea",
  link: "#0067bd",
  line: "#0072ce",
};

export const styles = {
  body: {
    backgroundColor: palette.paper,
    color: palette.ink,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: "32px 0",
  },
  container: {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.rule}`,
    borderTop: `8px solid ${palette.ink}`,
    borderRadius: "4px",
    margin: "0 auto",
    maxWidth: "560px",
    padding: "32px",
  },
  heading: {
    color: palette.ink,
    fontSize: "22px",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    margin: "0 0 4px",
  },
  subheading: { color: palette.muted, fontSize: "14px", margin: "0 0 24px" },
  text: { color: palette.ink, fontSize: "16px", lineHeight: "26px" },
  quote: {
    backgroundColor: palette.paper,
    borderLeft: `4px solid ${palette.line}`,
    borderRadius: "4px",
    color: palette.ink,
    fontSize: "15px",
    lineHeight: "24px",
    margin: "16px 0",
    padding: "12px 16px",
    whiteSpace: "pre-wrap",
  },
  button: {
    backgroundColor: palette.ink,
    borderRadius: "4px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: 600,
    padding: "12px 20px",
    textDecoration: "none",
  },
  rule: { borderColor: palette.rule, margin: "28px 0 16px" },
  footer: { color: palette.muted, fontSize: "12px", lineHeight: "20px" },
  link: { color: palette.link },
} satisfies Record<string, CSSProperties>;
