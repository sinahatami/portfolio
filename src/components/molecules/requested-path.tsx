"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";

/**
 * The address the visitor asked for. The 404 page is prerendered once for
 * every missing path, so the path appears after hydration; until then the
 * sentence reads "this address".
 */
export function RequestedPath() {
  const pathname = usePathname();
  const mounted = useMounted();
  if (!mounted || !pathname) return <>this address</>;
  return (
    <code className="bg-muted text-foreground rounded-sm px-1.5 py-0.5 font-mono text-[0.85em]">
      {/* Long paths may wrap, but only after a slash. */}
      {pathname.split("/").map((part, index) => (
        <Fragment key={index}>
          {index > 0 ? (
            <>
              /<wbr />
            </>
          ) : null}
          {part}
        </Fragment>
      ))}
    </code>
  );
}
