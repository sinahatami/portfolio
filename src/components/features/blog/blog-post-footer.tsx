import Link from "next/link";
import { Badge } from "@/components/ui";
import { ArrowLeft } from "@/lib/icons";

export const BlogPostFooter = () => {
  return (
    <div className="mt-16 border-t pt-8">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="text-muted-foreground text-sm">
          Thanks for reading! If you enjoyed this article, check out my other
          posts.
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
  );
};
