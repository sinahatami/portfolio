import { PROFILE } from "@/content/profile";
import { siteEnv } from "./env";

export const SITE = {
  name: PROFILE.name,
  title: `${PROFILE.name} | Software Engineer & Data Scientist`,
  description: PROFILE.description,
  get baseUrl() {
    return siteEnv.baseUrl();
  },
  githubUsername:
    PROFILE.socials.find((social) => social.id === "github")?.handle ??
    "sinahatami",
  /** Brand colours shared by metadata, the manifest and the OG image. */
  colors: {
    paper: "#ffffff",
    ink: "#0f1e3d",
    night: "#0a1226",
    muted: "#586379",
    rule: "#dde2ea",
    signal: "#ffcd00",
    industry: "#0072ce",
    research: "#c8007a",
    study: "#00855a",
  },
} as const;
