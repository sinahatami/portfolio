import Image from "next/image";
import { cn } from "@/lib/utils";

interface OrgMarkProps {
  name: string;
  logo?: string | undefined;
  className?: string;
}

/** Organisation logo on a neutral tile, falling back to initials. */
export function OrgMark({ name, logo, className }: OrgMarkProps) {
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={cn(
        "border-border relative flex h-12 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white px-2 py-1.5",
        className
      )}
    >
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={64}
          height={36}
          className="h-full w-full object-contain"
        />
      ) : (
        <span aria-hidden className="text-sm font-semibold text-[#0f1e3d]">
          {initials}
        </span>
      )}
    </span>
  );
}
