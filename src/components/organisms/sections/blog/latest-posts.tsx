import { getAllPosts } from "@/lib/blog";
import { SectionContainer } from "@/components";
import { BlogPostCard } from "./components/blog-post-card";
import { ViewAllButton } from "./components/view-all-button";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3); // Get top 3 latest posts

  if (posts.length === 0) return null;

  return (
    <SectionContainer
      id="latest-posts"
      title="Latest Articles"
      subtitle="Thoughts on software engineering and performance"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      <ViewAllButton />
    </SectionContainer>
  );
}
