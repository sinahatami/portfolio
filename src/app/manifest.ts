import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sina Hatami | Software Engineer & Data Scientist",
    short_name: "Sina Hatami",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: SITE.colors.paper,
    theme_color: SITE.colors.ink,
    // The mark on its rounded tile, and full-bleed versions that Android
    // crops to its own shape (the mark stays inside the safe circle).
    icons: [
      ...[192, 512].map((size) => ({
        src: `/icons/icon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        purpose: "any" as const,
      })),
      ...[192, 512].map((size) => ({
        src: `/icons/icon-maskable-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        purpose: "maskable" as const,
      })),
    ],
    categories: ["productivity", "utilities", "education"],
  };
}
