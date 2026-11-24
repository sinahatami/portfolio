import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { getBlogRepository } from "@/server/container";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogRepository()
    .list()
    .map((post) => ({
      url: `${SITE.baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));

  return [
    {
      url: SITE.baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts,
  ];
}
