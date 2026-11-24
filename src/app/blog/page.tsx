import type { Metadata } from "next";
import { Container } from "@/components/atoms";
import { EmptyState } from "@/components/molecules";
import { PostList } from "@/components/organisms/post-list";
import { getBlogRepository } from "@/server/container";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on web performance, React architecture and applied machine learning.",
};

export default function BlogPage() {
  const posts = getBlogRepository().list();

  return (
    <>
      <div className="board">
        <Container className="py-12 md:py-16">
          <h1 className="type-display text-6xl leading-none md:text-7xl">
            Writing
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-xl leading-8">
            Notes on web performance, React architecture and applied machine
            learning.
          </p>
        </Container>
      </div>
      <Container className="py-12 md:py-16">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <EmptyState
            title="No articles yet"
            description="New writing will appear here."
          />
        )}
      </Container>
    </>
  );
}
