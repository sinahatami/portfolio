import Link from "next/link";
import { Button } from "@/components/atoms";
import { StatusLayout } from "@/components/templates/status-layout";

export default function NotFound() {
  return (
    <StatusLayout
      code="404"
      title="This page doesn't exist"
      description="The link may be out of date. The home page has everything: experience, projects and a way to contact me."
      actions={
        <>
          <Button asChild>
            <Link href="/">Go to the home page</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/blog">Read the blog</Link>
          </Button>
        </>
      }
    />
  );
}
