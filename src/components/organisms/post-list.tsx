import Link from "next/link";
import type { PostSummary } from "@/domain/blog";
import { formatIsoDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

interface PostListProps {
  posts: PostSummary[];
  /** Heading level for the titles: 2 on the index, 3 under another heading. */
  headingLevel?: 2 | 3;
  className?: string;
}

/**
 * Articles as rows, newest first: the date column, then the title, what the
 * piece covers and its topics. The whole row is the link.
 */
export function PostList({
  posts,
  headingLevel = 2,
  className,
}: PostListProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ol className={cn("border-foreground border-t-2", className)}>
      {posts.map((post) => (
        <li key={post.slug} className="border-border border-b">
          <article className="group relative grid gap-x-8 gap-y-2 py-6 md:grid-cols-[10rem_minmax(0,1fr)] md:py-8">
            <p className="text-[0.9375rem]">
              <time dateTime={post.date} className="tabular font-semibold">
                {formatIsoDate(post.date)}
              </time>
              <span className="text-muted-foreground block">
                {post.readingMinutes} min read
              </span>
            </p>
            <div className="max-w-[62ch]">
              <Heading className="type-title text-2xl leading-tight text-balance md:text-[1.75rem]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group-hover:text-accent transition-colors after:absolute after:inset-0"
                >
                  {post.title}
                </Link>
              </Heading>
              <p className="mt-2">{post.description}</p>
              {post.tags.length > 0 ? (
                <p className="text-muted-foreground mt-3 text-sm">
                  <span className="sr-only">Topics: </span>
                  {post.tags.join(", ")}
                </p>
              ) : null}
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
