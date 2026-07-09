import Link from "next/link";
import { Button } from "@/components/ui";
import { SearchX, Home } from "@/lib/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="bg-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-white/10">
        <SearchX className="text-muted-foreground h-10 w-10" />
      </div>
      <h2 className="mb-4 text-4xl font-extrabold tracking-tight">404</h2>
      <p className="text-muted-foreground mb-8 max-w-md text-xl">
        Oops! We couldn't find the page you're looking for. It might have been
        moved or deleted.
      </p>
      <Button
        asChild
        size="lg"
        className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
      >
        <Link href="/">
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
