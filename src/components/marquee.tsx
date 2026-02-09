"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useCallback, useState } from "react";

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  repeat?: number;
  reverse?: boolean;
  duration?: string;
  vertical?: boolean;
  pauseOnHover?: boolean;
}

export function Marquee({
  reverse,
  children,
  className,
  repeat = 4,
  duration = "80s",
  vertical = false,
  pauseOnHover = false,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  return (
    <div
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "flex gap-4 overflow-hidden p-2",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 justify-around gap-4", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical
          })}
          style={{
            animationDuration: duration,
            ...(reverse && { animationDirection: "reverse" }),
            ...(isPaused && { animationPlayState: "paused" })
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
