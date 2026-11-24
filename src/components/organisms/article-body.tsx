import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface ArticleBodyProps {
  markdown: string;
}

/** Markdown set in the site's type: tight bold headings, slate code blocks. */
export function ArticleBody({ markdown }: ArticleBodyProps) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none",
        "prose-headings:font-bold prose-headings:tracking-[-0.02em]",
        "prose-h2:mt-14 prose-h2:mb-4 prose-h2:text-[1.75rem] prose-h2:leading-tight",
        "prose-h3:mt-10 prose-h3:text-[1.3125rem]",
        "prose-a:decoration-1 prose-a:underline-offset-[0.22em] hover:prose-a:text-accent",
        "prose-pre:rounded-md prose-pre:text-[0.875rem] prose-pre:leading-relaxed",
        "prose-code:before:content-none prose-code:after:content-none",
        "[&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:rounded-sm [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-[0.875em] [&_:not(pre)>code]:font-medium",
        "prose-li:marker:text-muted-foreground"
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
