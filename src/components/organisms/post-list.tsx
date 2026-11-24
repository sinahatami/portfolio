import Link from "next/link";
import { TagList } from "@/components/molecules";
import type { PostSummary } from "@/domain/blog";
import { formatIsoDate } from "@/lib/dates";

interface PostListProps {
  posts: PostSummary[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <ol className="divide-border border-border divide-y border-y">
      {posts.map((post) => (
        <li key={post.slug}>
          <article className="group relative grid gap-2 py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
            <p className="text-muted-foreground tabular text-sm">
              <time dateTime={post.date}>{formatIsoDate(post.date)}</time>
              <span className="block text-xs">
                {post.readingMinutes} min read
              </span>
            </p>
            <div>
              <h2 className="type-title text-2xl leading-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group-hover:text-link transition-colors after:absolute after:inset-0"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mt-2 max-w-prose">
                {post.description}
              </p>
              <TagList items={post.tags} label="Topics" className="mt-4" />
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
