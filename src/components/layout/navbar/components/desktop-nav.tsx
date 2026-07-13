import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "@/lib/icons";

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; icon: React.ReactNode }>;
  activeSection: string;
  onLinkClick: () => void;
}

export const DesktopNav = ({
  navLinks,
  activeSection,
  onLinkClick,
}: DesktopNavProps) => {
  const isLinkActive = (href: string) => {
    if (href === "/blog") return activeSection === "blog";
    return activeSection === href.substring(2);
  };

  return (
    <nav className="hidden items-center gap-1 rounded-2xl bg-white/5 px-2 py-2 backdrop-blur-md md:flex">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            "group relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
            isLinkActive(link.href)
              ? "text-accent bg-accent/10"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          )}
          onClick={onLinkClick}
        >
          <span className="text-lg">{link.icon}</span>
          <span>{link.name}</span>
          {isLinkActive(link.href) && (
            <div className="from-accent/20 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r to-blue-500/20" />
          )}
          <ChevronRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
        </Link>
      ))}
    </nav>
  );
};
