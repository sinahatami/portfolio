import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://sinahatami.dev";

  const routes = [
    "",
    "/#about",
    "/#experience",
    "/#projects",
    "/#education",
    "/#skills",
    "/#contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("monthly" as const) : ("weekly" as const),
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
