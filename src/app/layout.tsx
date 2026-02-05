import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { Navbar } from "@/components/navbar";
import { CommandMenu } from "@/components/command-menu";
import { RESUME_DATA } from "@/data/resume-data";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";

// 1. Configure Fonts
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

export const metadata: Metadata = {
  title: "Sina Hatami | Senior Software Engineer",
  description: "Senior Front-End Engineer & Software Architect.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: RESUME_DATA.name,
    url: RESUME_DATA.personalWebsiteUrl,
    jobTitle: "Senior Front-End Engineer",
    alumniOf: RESUME_DATA.education.map((edu) => edu.school),
    sameAs: RESUME_DATA.contact.social.map((s) => s.url),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: RESUME_DATA.contact.tel,
      contactType: "professional",
      email: RESUME_DATA.contact.email,
    },
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        {/* Accessibility: Skip to content link */}
        <a
          href="#main-content"
          className="bg-accent text-accent-foreground fixed top-4 left-4 z-50 -translate-y-32 rounded-md px-4 py-2 font-medium transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>

        {/* SEO: JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>

          {/* Global UI Components */}
          <Toaster />
          <CommandMenu />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
