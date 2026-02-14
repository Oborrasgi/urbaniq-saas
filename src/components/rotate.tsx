"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

interface RotateProps extends HTMLMotionProps<"div"> {
  children?: ReactNode;
  from?: number;        // initial rotation in degrees
  to?: number;          // final rotation in degrees
  duration?: number;
  delay?: number;
  once?: boolean;
}

export function Rotate({
  children,
  from = 6,
  to = 0,
  duration = 0.3,
  delay = 0.2,
  once = true,
  ...props
}: RotateProps) {
  return (
    <motion.div
      initial={{ rotate: `${from}deg` }}
      whileInView={{ rotate: `${to}deg` }}
      viewport={{ once }}
      transition={{ duration, ease: "easeInOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
