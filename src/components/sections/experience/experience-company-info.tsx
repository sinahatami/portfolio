import { OptimizedImage } from "@/components/ui";
import { ExternalLink, Calendar, Briefcase } from "@/lib/icons";
import { getOptimizedImageProps } from "@/lib/image-optimizer";

interface ExperienceCompanyInfoProps {
  start: string;
  end: string;
  company: string;
  logoUrl?: string | undefined;
  link?: string | undefined;
  summary?: string | undefined;
}

export const ExperienceCompanyInfo = ({
  start,
  end,
  company,
  logoUrl,
  link,
  summary,
}: ExperienceCompanyInfoProps) => {
  return (
    <div className="flex flex-col gap-4 md:w-1/3 lg:w-1/4">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Calendar className="h-4 w-4" />
        <span className="font-mono">
          {start} — {end}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 content-center items-center justify-center overflow-hidden rounded-xl border bg-white/50 p-2 align-middle dark:bg-gray-900/50">
          {logoUrl ? (
            <OptimizedImage
              {...getOptimizedImageProps(logoUrl, `${company} logo`, "logo")}
              className="object-contain"
            />
          ) : (
            <div className="bg-accent/10 flex h-full w-full items-center justify-center rounded-lg">
              <Briefcase className="text-accent h-6 w-6" />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="group-hover:text-accent text-lg font-bold transition-colors">
              {company}
            </h3>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label={`Visit ${company} website`}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      {summary && (
        <p className="text-muted-foreground text-sm italic">{summary}</p>
      )}
    </div>
  );
};
