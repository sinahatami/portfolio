"use client";

import { FooterBrand } from "./components/footer-brand";
import { FooterContact } from "./components/footer-contact";
import { FooterSocial } from "./components/footer-social";
import { FooterCopyright } from "./components/footer-copyright";

export const Footer = () => {
  const currentYear = 2026;
  const displayVersion = `v${process.env["NEXT_PUBLIC_APP_VERSION"] || "0.0.0"}`;

  return (
    <footer className="from-background via-background to-background/95 relative mt-32 overflow-hidden border-t bg-gradient-to-b pb-6">
      {/* Decorative background glow */}
      <div className="relative container mx-auto px-6 py-6 md:py-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <FooterBrand />

          {/* Contact & Social */}
          <div className="flex flex-col items-center gap-6">
            <FooterContact />
            <FooterSocial />
          </div>

          <FooterCopyright
            currentYear={currentYear}
            displayVersion={displayVersion}
          />
        </div>
      </div>
    </footer>
  );
};
