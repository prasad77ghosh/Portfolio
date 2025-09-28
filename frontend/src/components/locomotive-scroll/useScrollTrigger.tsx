"use client";

import { useEffect, useRef, useCallback } from "react";
import { useLocomotiveScroll } from "./LocomotiveScrollProvider";

// Types for scroll events
interface ScrollEventObject {
  scroll: { x: number; y: number };
  direction: string;
  speed: number;
  element?: HTMLElement;
  progress?: number;
  isInViewport?: boolean;
}

// Hook for scroll-triggered animations
export const useScrollTrigger = (
  callback: (obj: ScrollEventObject) => void,
  dependency: unknown[] = []
) => {
  const { scroll, isReady } = useLocomotiveScroll();
  const elementRef = useRef<HTMLElement>(null);

  const memoizedCallback = useCallback(callback, dependency);

  useEffect(() => {
    if (!scroll || !isReady || !elementRef.current) return;

    const element = elementRef.current;

    let scrollHandler: ((obj: any) => void) | null = null;

    const handleScroll = (obj: any) => {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = obj.scroll?.y || 0;

      // Check if element is in viewport
      const isInViewport =
        scrollY + windowHeight > elementTop &&
        scrollY < elementTop + elementHeight;

      if (isInViewport) {
        // Calculate progress (0 to 1)
        const progress = Math.max(0, Math.min(1,
          (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight)
        ));

        memoizedCallback({
          scroll: obj.scroll || { x: 0, y: scrollY },
          direction: obj.direction || '',
          speed: obj.speed || 0,
          element,
          progress,
          isInViewport,
        });
      }
    };

    scrollHandler = handleScroll;
    scroll.on("scroll", scrollHandler);

    return () => {
      if (scrollHandler) {
        // Remove event listener
        try {
          scroll.off("scroll", scrollHandler);
        } catch {
          // Fallback if off method doesn't exist
          console.warn("Could not remove scroll listener");
        }
      }
    };
  }, [scroll, isReady, memoizedCallback]);

  return elementRef;
};

// Hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  useScrollTrigger(
    ({ scroll }) => {
      if (elementRef.current) {
        const yPos = scroll.y * speed;
        elementRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    },
    [speed]
  );

  return elementRef;
};

// Hook for fade in animations
export const useFadeIn = (threshold: number = 0.1) => {
  const elementRef = useRef<HTMLElement>(null);

  useScrollTrigger(
    ({ progress, isInViewport }) => {
      if (elementRef.current && progress !== undefined && isInViewport !== undefined) {
        const opacity = isInViewport && progress > threshold ? 1 : 0;
        const translateY = isInViewport && progress > threshold ? 0 : 50;

        elementRef.current.style.opacity = opacity.toString();
        elementRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        elementRef.current.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      }
    },
    [threshold]
  );

  return elementRef;
};

// Hook for scale animations
export const useScaleIn = (threshold: number = 0.2) => {
  const elementRef = useRef<HTMLElement>(null);

  useScrollTrigger(
    ({ progress, isInViewport }) => {
      if (elementRef.current && progress !== undefined && isInViewport !== undefined) {
        const scale = isInViewport && progress > threshold ? 1 : 0.8;
        const opacity = isInViewport && progress > threshold ? 1 : 0;

        elementRef.current.style.transform = `scale(${scale})`;
        elementRef.current.style.opacity = opacity.toString();
        elementRef.current.style.transition = "transform 0.8s ease, opacity 0.8s ease";
      }
    },
    [threshold]
  );

  return elementRef;
};

// Hook for smooth scroll to element
export const useSmoothScrollTo = () => {
  const { scroll } = useLocomotiveScroll();

  const scrollToElement = useCallback(
    (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
      if (scroll) {
        scroll.scrollTo(target, {
          offset: options?.offset || 0,
          duration: options?.duration || 1000,
          easing: [0.25, 0.0, 0.35, 1.0],
        });
      }
    },
    [scroll]
  );

  return scrollToElement;
};