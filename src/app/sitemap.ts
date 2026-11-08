import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_CONFIG } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${SITE_CONFIG.baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${SITE_CONFIG.baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes, ...blogPosts];
}
