"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
} from "@/components/ui";
import { Calendar, ChevronRight } from "@/lib/icons";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

// Helper component for motion link
const MotionLink = motion(Link);

export function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <MotionLink
          key={post.slug}
          href={`/blog/${post.slug}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="group flex h-full flex-col border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/5">
            <CardHeader>
              <div className="text-muted-foreground/80 mb-3 flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </div>
              <CardTitle className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                {post.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <div className="mb-4 flex flex-wrap gap-1.5">
                {post.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center text-xs font-bold text-blue-600 opacity-60 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                READ ARTICLE{" "}
                <ChevronRight
                  size={12}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </div>
            </CardContent>
          </Card>
        </MotionLink>
      ))}
    </div>
  );
}
