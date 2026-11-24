import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/organisms/article-body";
import { ArticleLayout } from "@/components/templates/article-layout";
import { getBlogRepository } from "@/server/container";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogRepository()
    .list()
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = getBlogRepository().findBySlug((await params).slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: { type: "article", publishedTime: post.date, tags: post.tags },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const repository = getBlogRepository();
  const post = repository.findBySlug((await params).slug);
  if (!post) notFound();

  const { content, ...summary } = post;
  const others = repository.list().filter((item) => item.slug !== post.slug);
  return (
    <ArticleLayout post={summary} others={others}>
      <ArticleBody markdown={content} />
    </ArticleLayout>
  );
}
