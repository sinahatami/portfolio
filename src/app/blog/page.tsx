import { getAllPosts } from "@/lib/blog";
import { SectionContainer } from "@/components/common";
import { BlogList } from "@/components/features/blog-list";

export const metadata = {
  title: "Blog | Sina Hatami",
  description: "Thoughts on software engineering, performance, and design.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <SectionContainer className="pt-32 pb-20">
      <div className="mb-16">
        <h1 className="mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-6xl dark:from-white dark:to-slate-400">
          Technical Writing
        </h1>
        <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed">
          Deep dives into web development patterns, performance optimization
          strategies, and modern software architecture.
        </p>
      </div>

      <BlogList posts={posts} />
    </SectionContainer>
  );
}
