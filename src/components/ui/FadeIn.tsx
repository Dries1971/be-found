"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Animation =
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "scale-in"
  | "slide-in-left"
  | "slide-in-right";

interface FadeInProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer";
}

const animationClass: Record<Animation, string> = {
  "fade-in": "animate-fade-in",
  "fade-in-up": "animate-fade-in-up",
  "fade-in-down": "animate-fade-in-down",
  "scale-in": "animate-scale-in",
  "slide-in-left": "animate-slide-in-left",
  "slide-in-right": "animate-slide-in-right",
};

/**
 * Scroll-triggered entrance animation using Intersection Observer.
 * GPU-accelerated (transform + opacity only). Respects prefers-reduced-motion.
 */
export function FadeIn({
  children,
  animation = "fade-in-up",
  delay = 0,
  className,
  as: Tag = "div",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        isVisible ? animationClass[animation] : "opacity-0",
        className,
      )}
      style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
