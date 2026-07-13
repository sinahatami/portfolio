import { RESUME_DATA } from "@/data/resume-data";
import { Heart, Coffee, Sparkles } from "@/lib/icons";

interface FooterCopyrightProps {
  currentYear: number;
  displayVersion: string;
}

export function FooterCopyright({
  currentYear,
  displayVersion,
}: FooterCopyrightProps) {
  return (
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
        Designed and developed with Next.js 16, TypeScript, and Tailwind CSS.
        Deployed on Vercel.
      </p>

      <div className="flex items-center gap-2">
        <span
          suppressHydrationWarning
          className="bg-accent/10 text-accent rounded-full px-2 py-0.5 font-mono text-[10px] font-medium"
        >
          {displayVersion}
        </span>
      </div>
    </div>
  );
}
