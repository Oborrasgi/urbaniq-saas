"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

/**
 * Generic Motion Component Factory
 * Allows scalable creation of motion-wrapped components
 */
function createMotionComponent<T extends keyof React.JSX.IntrinsicElements>(tag: T) {
  const Component = motion[tag];

  const MotionComponent = ({
    children,
    ...props
  }: HTMLMotionProps<T> & { children?: ReactNode }) => {
    return <Component {...props}>{children}</Component>;
  };

  MotionComponent.displayName = `Motion(${tag})`;

  return MotionComponent;
}

// Core Motion Elements
export const MotionDiv = createMotionComponent("div");
export const MotionLi = createMotionComponent("li");
export const MotionUl = createMotionComponent("ul");
export const MotionSpan = createMotionComponent("span");
export const MotionH1 = createMotionComponent("h1");
export const MotionParagraph = createMotionComponent("p");
export const MotionAnchor = createMotionComponent("a");

/**
 * Optional: export motion directly if needed elsewhere
 */
export { motion };
