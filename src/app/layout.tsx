import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { RESUME_DATA } from "@/data/resume-data";
import { SITE_CONFIG } from "@/config/site";
import LayoutClient from "@/components-client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const getJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: RESUME_DATA.name,
  url: RESUME_DATA.personalWebsiteUrl,
  image: RESUME_DATA.avatarUrl,
  jobTitle: "Software Engineer | Data Scientist",
  knowsAbout: RESUME_DATA.skills.flatMap((category) => category.items),
  sameAs: Object.values(RESUME_DATA.contact.social).map((social) => social.url),
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  title: {
    default: "Sina Hatami | Software Engineer & Data Scientist",
    template: "%s | Sina Hatami",
  },
  description: RESUME_DATA.summary.substring(0, 160),
  keywords: ["Software Engineer", "React Developer", "Data Scientist", "Genoa"],
  authors: [{ name: "Sina Hatami" }],
  appleWebApp: {
    capable: true,
    title: "Sina Hatami",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.baseUrl,
    siteName: "Sina Hatami Portfolio",
    title: "Sina Hatami | Software Engineer & Data Scientist",
    description: RESUME_DATA.summary.substring(0, 160),
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  verification: {
    google: SITE_CONFIG.googleVerificationId,
  },
  other: {
    "Permissions-Policy": "microphone=*",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd()) }}
          id="json-ld"
        />
        <LayoutClient>{children}</LayoutClient>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
