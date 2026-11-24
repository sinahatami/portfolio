import type { ReactNode } from "react";
import { Container, TextLink } from "@/components/atoms";
import { PostList } from "@/components/organisms/post-list";
import type { PostSummary } from "@/domain/blog";
import { formatIsoDate } from "@/lib/dates";

interface ArticleLayoutProps {
  post: PostSummary;
  /** Other articles, listed after this one. */
  others?: PostSummary[];
  children: ReactNode;
}

/**
 * An article on the same grid as the home page rows: a narrow left column
 * for when and what (sticky while reading), the text on the right.
 */
export function ArticleLayout({
  post,
  others = [],
  children,
}: ArticleLayoutProps) {
  return (
    <Container className="pt-10 md:pt-16">
      <article>
        <div className="grid gap-x-8 gap-y-5 md:grid-cols-[10rem_minmax(0,1fr)]">
          <p className="text-[0.9375rem] md:pt-[0.6em]" data-print="hide">
            <TextLink
              href="/blog"
              tone="quiet"
              className="text-muted-foreground"
            >
              All articles
            </TextLink>
          </p>
          <header>
            <h1 className="type-display max-w-[22ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.045em] text-balance">
              {post.title}
            </h1>
            <p className="text-muted-foreground mt-5 max-w-[52ch] text-xl leading-8">
              {post.description}
            </p>
          </header>
        </div>

        <div className="border-foreground mt-10 grid gap-x-8 gap-y-6 border-t-2 pt-6 md:mt-14 md:grid-cols-[10rem_minmax(0,1fr)] md:pt-9">
          <aside className="text-[0.9375rem] md:sticky md:top-24 md:self-start">
            <p>
              <time dateTime={post.date} className="tabular font-semibold">
                {formatIsoDate(post.date)}
              </time>
            </p>
            <p className="text-muted-foreground">
              {post.readingMinutes} min read
            </p>
            {post.tags.length > 0 ? (
              <p className="text-muted-foreground mt-3">
                <span className="sr-only">Topics: </span>
                {post.tags.join(", ")}
              </p>
            ) : null}
          </aside>
          <div className="max-w-[68ch] min-w-0">{children}</div>
        </div>
      </article>

      {others.length > 0 ? (
        <section
          aria-labelledby="more-writing"
          className="mt-24 md:mt-32"
          data-print="hide"
        >
          <h2
            id="more-writing"
            className="type-display mb-7 text-[2.5rem] leading-none md:mb-9 md:text-[3.25rem]"
          >
            More writing
          </h2>
          <PostList posts={others} headingLevel={3} />
        </section>
      ) : null}
    </Container>
  );
}
