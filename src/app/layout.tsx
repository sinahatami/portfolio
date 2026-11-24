import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import {
  Barlow,
  Barlow_Semi_Condensed,
  JetBrains_Mono,
} from "next/font/google";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/templates/site-shell";
import { siteEnv } from "@/config/env";
import { SITE } from "@/config/site";
import { PROFILE, SKILL_GROUPS } from "@/content";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: SITE.colors.paper },
    { media: "(prefers-color-scheme: dark)", color: SITE.colors.night },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateMetadata(): Metadata {
  const verification = siteEnv.googleVerificationId();
  return {
    metadataBase: new URL(SITE.baseUrl),
    title: { default: SITE.title, template: `%s | ${PROFILE.name}` },
    description: SITE.description,
    keywords: [
      "Software Engineer",
      "Data Scientist",
      "React",
      "Next.js",
      "Machine Learning",
      "Genoa",
    ],
    authors: [{ name: PROFILE.name, url: PROFILE.website }],
    appleWebApp: {
      capable: true,
      title: PROFILE.name,
      statusBarStyle: "default",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE.baseUrl,
      siteName: PROFILE.name,
      title: SITE.title,
      description: SITE.description,
      images: [{ url: "/og", width: 1200, height: 630, alt: SITE.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.title,
      description: SITE.description,
    },
    ...(verification ? { verification: { google: verification } } : {}),
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  url: PROFILE.website,
  image: `${PROFILE.website}${PROFILE.photo.src}`,
  jobTitle: PROFILE.role,
  address: {
    "@type": "PostalAddress",
    addressLocality: PROFILE.location.label,
  },
  knowsAbout: [...new Set(SKILL_GROUPS.flatMap((group) => group.skills))],
  sameAs: PROFILE.socials.map((social) => social.url),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          id="json-ld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell
          profile={PROFILE}
          version={siteEnv.appVersion()}
          year={new Date().getFullYear()}
        >
          {children}
        </SiteShell>
        {siteEnv.onVercel() ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
