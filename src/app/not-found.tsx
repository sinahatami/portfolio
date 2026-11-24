import Link from "next/link";
import { Button } from "@/components/atoms";
import { RequestedPath } from "@/components/molecules";
import { SiteSearchButton } from "@/components/organisms/site-search-button";
import { StatusLayout } from "@/components/templates/status-layout";
import { PRIMARY_NAV } from "@/config/navigation";

export default function NotFound() {
  return (
    <StatusLayout
      title="This page doesn't exist"
      description={
        <>
          Nothing lives at <RequestedPath /> (error 404). The link may be out of
          date, or the address mistyped.
        </>
      }
      actions={
        <>
          <Button asChild size="lg">
            <Link href="/">Go to the home page</Link>
          </Button>
          <SiteSearchButton />
        </>
      }
    >
      <section aria-labelledby="destinations-title">
        <h2 id="destinations-title" className="type-title text-2xl">
          Where to go instead
        </h2>
        <ul className="border-foreground mt-4 border-t-2">
          {PRIMARY_NAV.map((item) => (
            <li key={item.href} className="border-border border-b">
              <Link
                href={item.href}
                className="group grid gap-x-8 gap-y-0.5 py-4 md:grid-cols-[10rem_minmax(0,1fr)] md:items-baseline"
              >
                <span className="type-title group-hover:text-accent text-xl transition-colors">
                  {item.label}
                </span>
                <span className="text-muted-foreground">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </StatusLayout>
  );
}
