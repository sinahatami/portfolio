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
    ink: "#16203d",
    night: "#0d142b",
    muted: "#525d7c",
    rule: "#d7dcea",
    accent: "#c8102e",
    denim: "#1a2850",
    denimDeep: "#111a36",
    ecru: "#efe8d8",
  },
} as const;
