import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isExternalUrl } from "@/lib/text";
import { Icon } from "./icon";

interface TextLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: string;
  children: ReactNode;
  /** Visual treatment: underlined inline link or quiet navigation link. */
  tone?: "inline" | "quiet";
  /** Show the outbound arrow on external links (default: true). */
  showExternalIcon?: boolean;
}

/**
 * One link component for internal and external targets: external links open
 * in a new tab with safe `rel` and announce it to screen readers.
 */
export function TextLink({
  href,
  children,
  className,
  tone = "inline",
  showExternalIcon = true,
  ...props
}: TextLinkProps) {
  const external = isExternalUrl(href);
  const classes = cn(
    "inline-flex items-baseline gap-0.5 transition-colors",
    tone === "inline"
      ? "text-link decoration-link/35 hover:decoration-link underline underline-offset-[0.2em]"
      : "text-foreground hover:text-link",
    className
  );

  if (href.startsWith("#")) {
    // Plain anchor: native hash navigation fires `hashchange`, which
    // in-page widgets (e.g. the project index) listen to.
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  if (!external) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<ComponentProps<typeof Link>, "href">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      {...props}
    >
      {children}
      {showExternalIcon ? (
        <Icon name="arrow-up-right" className="size-3.5 self-center" />
      ) : null}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
