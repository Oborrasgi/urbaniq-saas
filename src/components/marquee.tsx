"use client";

import { cn } from "@/lib/utils";
import {
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  repeat?: number;
  reverse?: boolean;
  duration?: string;
  vertical?: boolean;
  pauseOnHover?: boolean;
  fade?: boolean; // 🔥 New: edge fade effect
}

export function Marquee({
  reverse,
  children,
  className,
  repeat = 2, // 🔥 Reduced for performance (true infinite effect)
  duration = "40s",
  vertical = false,
  pauseOnHover = false,
  fade = true,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 🔥 Auto pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  // 🔥 Auto pause when not visible (performance boost)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        fade &&
          "mask-gradient-horizontal before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 before:bg-gradient-to-r before:from-background before:to-transparent after:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 after:bg-gradient-to-l after:from-background after:to-transparent",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 gap-6", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical
          })}
          style={{
            animationDuration: duration,
            animationDirection: reverse ? "reverse" : "normal",
            animationPlayState:
              isPaused || !isInView ? "paused" : "running"
          }}
        >
          {children as ReactNode}
        </div>
      ))}
    </div>
  );
}
