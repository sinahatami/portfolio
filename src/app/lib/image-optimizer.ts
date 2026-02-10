export type ImageSize = "avatar" | "logo" | "project" | "hero" | "thumbnail";

export interface OptimizedImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality: number;
  priority: boolean;
  loading: "eager" | "lazy";
  sizes?: string;
}

export const getOptimizedImageProps = (
  src: string,
  alt: string,
  size: ImageSize = "logo"
): OptimizedImageConfig => {
  const configs: Record<ImageSize, Partial<OptimizedImageConfig>> = {
    avatar: {
      width: 500,
      height: 600,
      quality: 90,
      priority: true,
      loading: "eager" as const,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
    logo: {
      width: 56,
      height: 56,
      quality: 85,
      priority: false,
      loading: "lazy" as const,
    },
    project: {
      width: 400,
      height: 300,
      quality: 80,
      priority: false,
      loading: "lazy" as const,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
    hero: {
      width: 1200,
      height: 800,
      quality: 75,
      priority: true,
      loading: "eager" as const,
      sizes: "100vw",
    },
    thumbnail: {
      width: 100,
      height: 100,
      quality: 70,
      priority: false,
      loading: "lazy" as const,
    },
  };

  return {
    src,
    alt,
    ...configs[size],
  } as OptimizedImageConfig;
};

export const preloadCriticalImages = (imageUrls: string[]): void => {
  if (typeof window === "undefined") return;

  imageUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    link.fetchPriority = "high";
    document.head.appendChild(link);
  });
};
