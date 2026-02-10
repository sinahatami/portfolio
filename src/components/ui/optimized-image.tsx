"use client";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "@/lib/icons";
import { cn } from "@/app/lib/utils";

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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        className?.includes("rounded") ? "" : ""
      )}
    >
      {isLoading && !blurDataURL && (
        <div className="bg-muted/10 absolute inset-0 z-10 flex items-center justify-center">
          <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        {...(!fill && width ? { width } : {})}
        {...(!fill && height ? { height } : {})}
        {...(blurDataURL
          ? { placeholder: "blur", blurDataURL }
          : { placeholder: "empty" })}
      />
    </div>
  );
};
