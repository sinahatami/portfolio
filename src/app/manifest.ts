import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sina Hatami | Senior Software Engineer",
    short_name: "Sina Hatami",
    description:
      "Interactive 3D portfolio showcasing software engineering and data science expertise.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "Desktop view of the portfolio",
      },
      {
        src: "/screenshots/mobile.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "Mobile view of the portfolio",
      },
    ],
    categories: ["productivity", "utilities", "education"],
    shortcuts: [
      {
        name: "View Projects",
        short_name: "Projects",
        description: "Browse my software projects",
        url: "/#projects",
        icons: [{ src: "/icons/projects.png", sizes: "96x96" }],
      },
      {
        name: "Contact Me",
        short_name: "Contact",
        description: "Get in touch with me",
        url: "/#contact",
        icons: [{ src: "/icons/contact.png", sizes: "96x96" }],
      },
    ],
  };
}
