import { Calendar } from "@/lib/icons";
import { Badge } from "@/components/ui";

interface BlogPostHeaderProps {
  title: string;
  date: string;
  tags?: string[];
}

export const BlogPostHeader = ({ title, date, tags }: BlogPostHeaderProps) => {
  return (
    <header className="mb-10 text-center">
      <div className="text-muted-foreground mb-6 flex items-center justify-center gap-2 text-sm font-medium">
        <span className="bg-secondary/50 flex items-center gap-1.5 rounded-full px-3 py-1">
          <Calendar size={14} />
          <time dateTime={date}>{date}</time>
        </span>
      </div>

      <h1 className="text-foreground mb-8 text-4xl !leading-tight font-bold tracking-tight lg:text-6xl">
        {title}
      </h1>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tags?.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-blue-500/10 px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-500/20 dark:text-blue-400"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="via-border h-px w-full bg-gradient-to-r from-transparent to-transparent" />
    </header>
  );
};
