"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  blurDataURL?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
  quality = 80,
  blurDataURL,
}: OptimizedImageProps) => {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        className?.includes("rounded") ? "" : ""
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={className}
        {...(!fill && width ? { width } : {})}
        {...(!fill && height ? { height } : {})}
        {...(blurDataURL
          ? { placeholder: "blur", blurDataURL }
          : { placeholder: "empty" })}
      />
    </div>
  );
};
