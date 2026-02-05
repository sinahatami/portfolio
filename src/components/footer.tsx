import { RESUME_DATA } from "@/data/resume-data";

export const Footer = () => {
  return (
    <footer className="bg-card/30 text-muted-foreground mt-24 border-t py-12 text-center text-sm backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center gap-4 px-6">
        <p>
          Designed & Architected by{" "}
          <span className="text-foreground font-semibold">
            {RESUME_DATA.name}
          </span>
        </p>
        <p className="font-mono text-xs opacity-70">
          Built with Next.js 15, React Server Components, and Tailwind v4.
        </p>
        <div className="mt-2 flex gap-4">
          {/* Simple text links for the footer */}
          {RESUME_DATA.contact.social.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              className="hover:text-accent underline-offset-4 transition-colors hover:underline"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
