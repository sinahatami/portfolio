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
    <SectionContainer className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <article className="relative">
          <header className="mb-10 text-center">
            <div className="text-muted-foreground mb-6 flex items-center justify-center gap-2 text-sm font-medium">
              <span className="bg-secondary/50 flex items-center gap-1.5 rounded-full px-3 py-1">
                <Calendar size={14} />
                <time dateTime={post.date}>{post.date}</time>
              </span>
            </div>

            <h1 className="text-foreground mb-8 text-4xl !leading-tight font-bold tracking-tight lg:text-6xl">
              {post.title}
            </h1>

            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {post.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-blue-500/10 px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-500/20 dark:text-blue-400"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="via-border h-px w-full bg-gradient-to-r from-transparent to-transparent" />
          </header>

          <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl prose-img:shadow-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-16 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
              <p className="text-muted-foreground text-sm">
                Thanks for reading! If you enjoyed this article, check out my
                other posts.
              </p>
              <Link href="/blog">
                <Badge
                  variant="outline"
                  className="hover:bg-secondary cursor-pointer gap-2 px-4 py-2 text-sm"
                >
                  More Articles <ArrowLeft className="rotate-180" size={14} />
                </Badge>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </SectionContainer>
  );
}
