import Link from "next/link";
import { Button } from "@/components/ui";
import { ChevronRight } from "@/lib/icons";

export function ViewAllButton() {
  return (
    <div className="mt-10 flex justify-center">
      <Button variant="outline" asChild className="group">
        <Link href="/blog">
          View All Articles
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}
