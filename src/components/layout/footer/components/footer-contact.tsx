import { RESUME_DATA } from "@/data/resume-data";

export function FooterContact() {
  return (
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
  );
}
