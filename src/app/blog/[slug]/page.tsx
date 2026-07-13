import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { SectionContainer } from "@/components/common";
import { ArrowLeft } from "@/lib/icons";
import Link from "next/link";
import {
  BlogPostHeader,
  BlogPostContent,
  BlogPostFooter,
} from "@/components/features";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Sina Hatami`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SectionContainer className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <article className="relative">
          <BlogPostHeader
            title={post.title}
            date={post.date}
            tags={post.tags}
          />
          <BlogPostContent content={post.content} />
          <BlogPostFooter />
        </article>
      </div>
    </SectionContainer>
  );
}
