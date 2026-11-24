import type { Metadata } from "next";
import { Container } from "@/components/atoms";
import { EmptyState } from "@/components/molecules";
import { PostList } from "@/components/organisms/post-list";
import { PageIntro } from "@/components/templates/page-intro";
import { getBlogRepository } from "@/server/container";

const DESCRIPTION =
  "Notes on web performance, React architecture and applied machine learning.";

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
};

export default function BlogPage() {
  const posts = getBlogRepository().list();

  return (
    <>
      <PageIntro title="Writing" description={DESCRIPTION} />
      <Container className="mt-10 md:mt-14">
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
