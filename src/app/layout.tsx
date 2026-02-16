import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { RESUME_DATA } from "@/data/resume-data";
import LayoutClient from "@/components/layout-client";
import { GoogleAnalytics } from "@next/third-parties/google";

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

// Separate Viewport configuration (Next.js 15 requirement)
export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sinahatami.dev"),
  title: {
    default: "Sina Hatami | Software Engineer & Data Scientist",
    template: "%s | Sina Hatami",
  },
  description: RESUME_DATA.summary.substring(0, 160),
  keywords: ["Software Engineer", "React Developer", "Data Scientist", "Genoa"],
  authors: [{ name: "Sina Hatami" }],
  // PWA and Mobile configurations handled via Metadata API
  appleWebApp: {
    capable: true,
    title: "Sina Hatami",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sinahatami.dev",
    siteName: "Sina Hatami Portfolio",
    title: "Sina Hatami | Software Engineer & Data Scientist",
    description: RESUME_DATA.summary.substring(0, 160),
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sinahatami",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: RESUME_DATA.name,
    url: RESUME_DATA.personalWebsiteUrl,
    image: RESUME_DATA.avatarUrl,
    jobTitle: "Software Engineer | Data Scientist",
    knowsAbout: RESUME_DATA.skills.flatMap((category) => category.items),
    sameAs: Object.values<Record<string, any>>(RESUME_DATA.contact.social).map(
      (social: any) => social.url
    ),
  };

  const gaId = process.env["NEXT_PUBLIC_GA_ID"];

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Manual preloads and JSON-LD only. No spaces between tags! */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        <LayoutClient>{children}</LayoutClient>
        <SpeedInsights />
        <Analytics />

        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
