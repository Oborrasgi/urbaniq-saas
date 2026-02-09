"use client";

import { motion } from "motion/react";
import type { PropsWithChildren } from "react";

export function Rotate({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ rotate: "6deg" }}
      whileInView={{ rotate: "0deg" }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
