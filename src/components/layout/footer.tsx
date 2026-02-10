import { RESUME_DATA } from "@/data/resume-data";
import { Heart, Coffee, Sparkles } from "@/lib/icons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="from-background via-background to-background/95 relative mt-32 overflow-hidden border-t bg-gradient-to-b pb-6">
      {/* Decorative background glow */}
      <div className="relative container mx-auto px-6 py-6 md:py-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Logo/Brand */}
          <div className="group flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-110">
              <div className="from-accent shadow-accent/20 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br to-blue-600 shadow-lg">
                <span className="text-lg font-bold text-white">
                  {RESUME_DATA.initials || "SH"}
                </span>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                {RESUME_DATA.name}
              </span>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a
                href={`mailto:${RESUME_DATA.contact.email}`}
                className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
              >
                <span className="decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                  {RESUME_DATA.contact.email}
                </span>
              </a>
              {RESUME_DATA.locationLink && (
                <a
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                >
                  <span className="decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                    {RESUME_DATA.location}
                  </span>
                </a>
              )}
            </div>

            <div className="flex gap-6">
              {Object.entries(RESUME_DATA.contact.social).map(
                ([name, platform]) => (
                  <a
                    key={name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="group text-muted-foreground hover:bg-accent/10 hover:text-accent flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:-translate-y-1"
                  >
                    <platform.icon className="h-5 w-5" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Copyright & Credits */}
          <div className="border-border/40 flex w-full flex-col items-center gap-6 border-t pt-6">
            <div className="flex flex-col items-center gap-2">
              <p className="text-muted-foreground text-sm">
                © {currentYear} {RESUME_DATA.name}. All rights reserved.
              </p>

              <div className="text-muted-foreground/80 flex items-center gap-1.5 text-xs">
                <span className="flex items-center gap-1">
                  Built with <Sparkles className="h-3 w-3 text-yellow-500" />
                </span>
                <span className="mx-1">•</span>
                <span className="flex items-center gap-1">
                  Fueled by{" "}
                  <Coffee className="h-3 w-3 text-amber-700 dark:text-amber-500" />
                </span>
                <span className="mx-1">•</span>
                <span className="group flex items-center gap-1">
                  Loved by
                  <Heart className="h-3 w-3 fill-red-500 text-red-500 transition-transform group-hover:animate-pulse" />
                </span>
              </div>
            </div>

            <p className="text-muted-foreground/60 max-w-md text-center text-[10px]">
              Designed and developed with Next.js 16, TypeScript, and Tailwind
              CSS. Deployed on Vercel.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
