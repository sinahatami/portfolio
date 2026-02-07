"use client";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface OptimizedImageProps {
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
  const [hasError, setHasError] = useState(false);

  // Fallback for missing images
  if (hasError) {
    return (
      <div
        className={cn(
          "bg-muted flex items-center justify-center",
          className,
          !fill && width && height
            ? `w-[${width}px] h-[${height}px]`
            : "h-full w-full"
        )}
      >
        <span className="text-muted-foreground text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {isLoading && !blurDataURL && (
        <div className="from-muted/50 to-muted/30 absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br">
          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
        </div>
      )}

      {blurDataURL && (
        <Image
          src={blurDataURL}
          alt=""
          fill={fill}
          sizes={sizes}
          className="absolute inset-0 scale-110 blur-2xl filter"
          unoptimized
          aria-hidden="true"
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
};
