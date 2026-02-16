import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { SectionContainer } from "@/components/common";
import { Badge } from "@/components/ui";
import { Calendar, ArrowLeft } from "@/lib/icons";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    <SectionContainer className="max-w-3xl pt-32 pb-20">
      <Link
        href="/blog"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
      >
        <ArrowLeft size={14} /> Back to Blog
      </Link>

      <article>
        <header className="mb-10">
          <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
            <Calendar size={14} />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </SectionContainer>
  );
}
