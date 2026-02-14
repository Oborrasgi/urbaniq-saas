import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ROOT WRAPPER                                */
/* -------------------------------------------------------------------------- */

interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const sectionVariants = cva("container mx-auto max-w-7xl", {
  variants: {
    spacing: {
      default: "py-14 md:py-20",
      sm: "py-10 md:py-14",
      lg: "py-20 md:py-28"
    }
  },
  defaultVariants: {
    spacing: "default"
  }
});

export function SectionHeader({
  children,
  className,
  spacing,
  ...props
}: SectionHeaderProps) {
  return (
    <section className={cn(sectionVariants({ spacing }), className)} {...props}>
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              HEADER CONTENT                                */
/* -------------------------------------------------------------------------- */

interface SectionHeaderContentProps extends React.HTMLAttributes<HTMLDivElement> {}

SectionHeader.HeaderContent = function SectionHeaderContent({
  className,
  children,
  ...props
}: SectionHeaderContentProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-4xl space-y-4 pb-12 text-center md:pb-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               EYEBROW LABEL                                */
/* -------------------------------------------------------------------------- */

interface SectionEyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {}

SectionHeader.Eyebrow = function SectionEyebrow({
  className,
  children,
  ...props
}: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        "text-primary text-sm font-semibold uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  HEADING                                   */
/* -------------------------------------------------------------------------- */

interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const headingVariants = cva("mx-auto font-extrabold tracking-tight", {
  variants: {
    size: {
      default: "text-3xl sm:text-4xl",
      lg: "text-4xl sm:text-5xl",
      xl: "text-5xl sm:text-6xl"
    }
  },
  defaultVariants: {
    size: "default"
  }
});

SectionHeader.Heading = function SectionHeading({
  className,
  children,
  size,
  ...props
}: SectionHeadingProps) {
  return (
    <h2 className={cn(headingVariants({ size }), className)} {...props}>
      {children}
    </h2>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  TEXT                                      */
/* -------------------------------------------------------------------------- */

interface SectionTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

SectionHeader.Text = function SectionText({
  className,
  children,
  ...props
}: SectionTextProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

/* -------------------------------------------------------------------------- */
/*                              CONTENT WRAPPER                               */
/* -------------------------------------------------------------------------- */

interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

SectionHeader.Content = function SectionContent({
  className,
  children,
  ...props
}: SectionContentProps) {
  return (
    <div className={cn("mt-10", className)} {...props}>
      {children}
    </div>
  );
};
