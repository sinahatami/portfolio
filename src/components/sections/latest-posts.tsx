import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SectionContainer } from "@/components/common";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Button,
} from "@/components/ui";
import { Calendar, ChevronRight, ArrowUpRight } from "@/lib/icons";

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
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group h-full"
          >
            <Card className="flex h-full flex-col transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg dark:hover:shadow-blue-900/20">
              <CardHeader>
                <div className="text-muted-foreground mb-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                </div>
                <CardTitle className="mb-2 line-clamp-2 text-lg transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {post.tags?.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="h-5 px-1.5 text-[10px]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex -translate-x-2 items-center text-xs font-semibold text-blue-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 dark:text-blue-400">
                  Read Article <ArrowUpRight size={12} className="ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button variant="outline" asChild className="group">
          <Link href="/blog">
            View All Articles
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </SectionContainer>
  );
}
