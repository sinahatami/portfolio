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
    ink: "#1d2731",
    night: "#12181e",
    muted: "#56616c",
    rule: "#d8dce0",
    accent: "#c8102e",
  },
} as const;
