"use client";

import { motion } from "motion/react";

interface TypingEffectProps {
  text?: string;
  speed?: number; // delay per character
  showCursor?: boolean;
  className?: string;
}

export function TypingEffect({
  text = "Typing Effect",
  speed = 0.05,
  showCursor = true,
  className
}: TypingEffectProps) {
  const letters = Array.from(text);

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: index * speed,
            ease: "easeOut"
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {letter}
        </motion.span>
      ))}

      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="ml-1 inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  );
}
