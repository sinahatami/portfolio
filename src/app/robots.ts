import { MetadataRoute } from "next";
import { RESUME_DATA } from "@/data/resume-data";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = RESUME_DATA.personalWebsiteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
