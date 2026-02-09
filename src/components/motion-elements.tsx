"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children?: ReactNode;
}

export function MotionDiv({ children, ...props }: MotionDivProps) {
  return <motion.div {...props}>{children}</motion.div>;
}

interface MotionLiProps extends HTMLMotionProps<"li"> {
  children?: ReactNode;
}

export function MotionLi({ children, ...props }: MotionLiProps) {
  return <motion.li {...props}>{children}</motion.li>;
}

interface MotionUlProps extends HTMLMotionProps<"ul"> {
  children?: ReactNode;
}

export function MotionUl({ children, ...props }: MotionUlProps) {
  return <motion.ul {...props}>{children}</motion.ul>;
}

interface MotionSpanProps extends HTMLMotionProps<"span"> {
  children?: ReactNode;
}

export function MotionSpan({ children, ...props }: MotionSpanProps) {
  return <motion.span {...props}>{children}</motion.span>;
}

interface MotionH1Props extends HTMLMotionProps<"h1"> {
  children?: ReactNode;
}

export function MotionH1({ children, ...props }: MotionH1Props) {
  return <motion.h1 {...props}>{children}</motion.h1>;
}

interface MotionParagraphProps extends HTMLMotionProps<"p"> {
  children?: ReactNode;
}

export function MotionParagraph({ children, ...props }: MotionParagraphProps) {
  return <motion.p {...props}>{children}</motion.p>;
}

interface MotionAnchorProps extends HTMLMotionProps<"a"> {
  children?: ReactNode;
}

export function MotionAnchor({ children, ...props }: MotionAnchorProps) {
  return <motion.a {...props}>{children}</motion.a>;
}
