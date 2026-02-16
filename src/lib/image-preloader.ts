export class ImagePreloader {
  private static instance: ImagePreloader;
  private preloaded = new Set<string>();

  static getInstance(): ImagePreloader {
    if (!ImagePreloader.instance) {
      ImagePreloader.instance = new ImagePreloader();
    }
    return ImagePreloader.instance;
  }

  preload(url: string): Promise<void> {
    if (this.preloaded.has(url) || !url) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloaded.add(url);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  preloadMultiple(urls: string[]): Promise<void[]> {
    return Promise.all(
      urls
        .filter((url) => url && !this.preloaded.has(url))
        .map((url) => this.preload(url))
    );
  }
}

// Helper function to preload critical images
export async function preloadCriticalImages() {
  if (typeof window === "undefined") return;

  const preloader = ImagePreloader.getInstance();

  // Get all image URLs from the page
  const imageUrls = Array.from(document.querySelectorAll("img[src]"))
    .map((img) => img.getAttribute("src"))
    .filter(Boolean) as string[];

  // Preload next few images (lazy loading)
  await preloader.preloadMultiple(imageUrls.slice(0, 5));
}
