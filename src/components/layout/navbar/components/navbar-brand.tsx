import Link from "next/link";
import { Sparkles } from "@/lib/icons";
import { RESUME_DATA } from "@/data/resume-data";

export function NavbarBrand() {
  return (
    <Link href="/" className="group relative flex items-center gap-3">
      <div className="from-accent flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br to-blue-500 transition-transform duration-500 group-hover:rotate-180">
        <span className="text-lg font-bold text-white">
          {RESUME_DATA.initials}
        </span>
      </div>
      <div className="hidden md:block">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{RESUME_DATA.name}</span>
          <Sparkles className="text-accent h-4 w-4 animate-pulse" />
        </div>
        <div className="text-muted-foreground text-xs">
          {RESUME_DATA.position}
        </div>
      </div>
    </Link>
  );
}
