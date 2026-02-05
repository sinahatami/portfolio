import { RESUME_DATA } from "@/data/resume-data";
import { Heart, Coffee, Sparkles } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="from-background via-background to-background/95 relative mt-32 overflow-hidden border-t bg-gradient-to-b">
      {/* Decorative elements */}
      <div className="from-accent/10 absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-r via-blue-500/10 to-transparent blur-3xl" />

      <div className="relative container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo/Brand */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="from-accent h-8 w-8 rounded-lg bg-gradient-to-br to-blue-500" />
              <span className="text-xl font-bold tracking-tight">
                {RESUME_DATA.initials}
                <span className="text-accent">.</span>
              </span>
            </div>

            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Senior Software Engineer specializing in React, Next.js, and
              modern web technologies. Passionate about building performant,
              accessible, and user-centric applications.
            </p>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={`mailto:${RESUME_DATA.contact.email}`}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors hover:underline"
              >
                {RESUME_DATA.contact.email}
              </a>
              <a
                href={RESUME_DATA.locationLink}
                target="_blank"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors hover:underline"
              >
                {RESUME_DATA.location}
              </a>
            </div>

            <div className="flex gap-6">
              {RESUME_DATA.contact.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="hover:underline">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright & Credits */}
          <div className="border-border/50 flex w-full flex-col items-center gap-4 border-t pt-8">
            <p className="text-muted-foreground text-sm">
              © {currentYear} {RESUME_DATA.name}. All rights reserved.
            </p>

            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Built with
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                and
              </span>
              <span className="flex items-center gap-1">
                <Coffee className="h-3 w-3" />
              </span>
            </div>

            <p className="text-muted-foreground text-xs">
              Designed and developed with Next.js 14, TypeScript, and Tailwind
              CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
