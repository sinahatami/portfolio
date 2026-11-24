import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Icon } from "@/components/atoms";
import { TagList } from "@/components/molecules";
import type { PostSummary } from "@/domain/blog";
import { formatIsoDate } from "@/lib/dates";

interface ArticleLayoutProps {
  post: PostSummary;
  children: ReactNode;
}

export function ArticleLayout({ post, children }: ArticleLayoutProps) {
  return (
    <Container className="py-12 md:py-16">
      <article className="mx-auto max-w-[68ch]">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
          data-print="hide"
        >
          <Icon name="arrow-left" className="size-4" />
          All articles
        </Link>
        <header className="mt-10 mb-10">
          <p className="text-muted-foreground tabular text-sm">
            <time dateTime={post.date}>{formatIsoDate(post.date)}</time>
            <span aria-hidden className="mx-2">
              /
            </span>
            {post.readingMinutes} min read
          </p>
          <h1 className="type-display mt-3 text-[1.75rem] leading-[1.08] text-balance hyphens-auto sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-5 text-xl leading-8">
            {post.description}
          </p>
          <TagList items={post.tags} label="Topics" className="mt-6" />
        </header>
        {children}
        <footer className="border-border mt-16 border-t pt-8" data-print="hide">
          <Link
            href="/blog"
            className="text-link inline-flex items-center gap-1.5 font-medium hover:underline"
          >
            <Icon name="arrow-left" className="size-4" />
            Back to all articles
          </Link>
        </footer>
      </article>
    </Container>
  );
}
