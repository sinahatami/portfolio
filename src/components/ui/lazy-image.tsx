"use client";

import { useLazyImage } from "@/hooks/use-intersection-observer";
import { OptimizedImage, OptimizedImageProps } from "./optimized-image";
import { cn } from "@/lib/utils";

interface LazyImageProps extends OptimizedImageProps {
  placeholderSrc?: string;
  className?: string;
}

export function LazyImage({
  src,
  placeholderSrc,
  className,
  ...props
}: LazyImageProps) {
  const { setRef, src: imageSrc } = useLazyImage(src, placeholderSrc);

  return (
    <div
      ref={(node) => {
        if (node) setRef(node);
      }}
      className={cn("relative", className)}
    >
      <OptimizedImage
        src={imageSrc}
        {...props}
        className={cn(
          "transition-opacity duration-300",
          imageSrc === placeholderSrc ? "opacity-50" : "opacity-100"
        )}
      />
    </div>
  );
}
