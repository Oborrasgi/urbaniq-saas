import * as React from "react";

import { cn } from "@/lib/utils";

// Main Section Header Root Component
interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function SectionHeader({ children, className, ...props }: SectionHeaderProps) {
  return (
    <section className={cn("container mx-auto max-w-7xl py-14 md:py-20", className)} {...props}>
      {children}
    </section>
  );
}

// Header Content Wrapper Component
interface SectionHeaderContentProps extends React.HTMLAttributes<HTMLDivElement> {}

SectionHeader.HeaderContent = function SectionHeaderContent({
  className,
  children,
  ...props
}: SectionHeaderContentProps) {
  return (
    <div
      className={cn("mx-auto max-w-4xl space-y-3 pb-12 text-center md:pb-16", className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Section Heading Component
interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {}

SectionHeader.Heading = function SectionHeading({
  className,
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <h2
      className={cn("mx-auto mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

// Section Text/Description Component
interface SectionTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

SectionHeader.Text = function SectionText({ className, children, ...props }: SectionTextProps) {
  return (
    <p className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
};

// Section Content Wrapper Component (for content below the header)
interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

SectionHeader.Content = function SectionContent({
  className,
  children,
  ...props
}: SectionContentProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};
