import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { Navbar } from "@/components/navbar";
import { CommandMenu } from "@/components/command-menu";
import { Toaster } from "sonner";

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
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="...">
        <Navbar />
        <main className="...">{children}</main>
        <CommandMenu />
        <Toaster />
      </body>
    </html>
  );
}
