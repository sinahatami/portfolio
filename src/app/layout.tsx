import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RESUME_DATA } from "@/data/resume-data";
import LayoutClient from "@/components/layout-client";

// Optimized font loading with subset and display swap
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Sina Hatami | Senior Software Engineer & AI Specialist",
  description: RESUME_DATA.summary,
  keywords: [
    "Senior Software Engineer",
    "React Developer",
    "Next.js Expert",
    "TypeScript",
    "AI/ML Engineer",
    "Full Stack Developer",
    "Frontend Architect",
  ],
  authors: [{ name: "Sina Hatami" }],
  creator: "Sina Hatami",
  publisher: "Sina Hatami",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sinahatami.dev",
    title: "Sina Hatami | Senior Software Engineer",
    description: RESUME_DATA.summary,
    siteName: "Sina Hatami Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sina Hatami Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sina Hatami | Senior Software Engineer",
    description: RESUME_DATA.summary,
    images: ["/og-image.png"],
    creator: "@sinahatami",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://sinahatami.dev",
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
    jobTitle: "Senior Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Independent Consultant",
    },
    alumniOf: RESUME_DATA.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
    })),
    knowsAbout: RESUME_DATA.skills.flatMap((category) => category.items),
    sameAs: RESUME_DATA.contact.social.map((social) => social.url),
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href={RESUME_DATA.avatarUrl}
          type="image/jpeg"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <meta name="application-name" content="Sina Hatami Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Sina Hatami" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3b82f6" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
