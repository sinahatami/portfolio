"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting: any = entry?.isIntersecting;

        if (freezeOnceVisible && isElementIntersecting) {
          observer.disconnect();
        }

        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting) {
          setHasRendered(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, freezeOnceVisible]);

  const setRef = (node: HTMLElement | null) => {
    elementRef.current = node;
  };

  return { setRef, isIntersecting, hasRendered };
}

export function useLazyImage(src: string, placeholder?: string) {
  const { setRef, isIntersecting, hasRendered } = useIntersectionObserver({
    threshold: 0,
    rootMargin: "200px",
  });

  const imageSrc = isIntersecting || hasRendered ? src : placeholder || src;

  return { setRef, src: imageSrc };
}
