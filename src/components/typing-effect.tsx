"use client";

import { motion } from "motion/react";

export function TypingEffect({ text = "Typing Effect" }: { text: string }) {
  return (
    <>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </>
  );
}
