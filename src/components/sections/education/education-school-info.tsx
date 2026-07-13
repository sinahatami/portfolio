import { GraduationCap, ExternalLink, Calendar } from "@/lib/icons";
import { OptimizedImage } from "@/components/ui";
import { getOptimizedImageProps } from "@/lib/image-optimizer";

interface EducationSchoolInfoProps {
  start: string;
  end: string;
  school: string;
  logoUrl?: string | undefined;
  link?: string | undefined;
}

export const EducationSchoolInfo = ({
  start,
  end,
  school,
  logoUrl,
  link,
}: EducationSchoolInfoProps) => {
  return (
    <div className="flex flex-col gap-3 md:w-60 md:shrink-0">
      {/* Date */}
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Calendar className="h-4 w-4" />
        <span className="font-mono">
          {start} — {end}
        </span>
      </div>

      {/* Logo & School Name Block */}
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 flex-shrink-0 content-center items-center justify-center overflow-hidden rounded-xl border bg-white/50 p-2 align-middle dark:bg-gray-900/50">
          {logoUrl ? (
            <OptimizedImage
              {...getOptimizedImageProps(logoUrl, `${school} logo`, "logo")}
              className="object-contain"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center">
              <GraduationCap className="text-accent h-5 w-5" />
            </div>
          )}
        </div>

        {/* School Name with Link - Pushing icon to the right */}
        <div className="flex-1 text-sm leading-tight font-semibold">
          {link ? (
            <a
              href={link}
              target="_blank"
              className="hover:text-accent group/link flex items-start justify-between gap-2 transition-colors"
            >
              <span>{school}</span>
              <ExternalLink
                size={14}
                className="shrink-0 opacity-50 transition-all group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100"
              />
            </a>
          ) : (
            school
          )}
        </div>
      </div>
    </div>
  );
};
