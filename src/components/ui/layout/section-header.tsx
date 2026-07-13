import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader = ({
  title,
  subtitle,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        <span className="bg-border h-px flex-1"></span>
      </div>
      {subtitle && (
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
