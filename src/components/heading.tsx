import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const headingVariants = cva("font-heading tracking-tight", {
  variants: {
    size: {
      default: "text-xl md:text-2xl font-semibold",
      lg: "text-2xl md:text-3xl font-bold",
      xl: "text-3xl md:text-4xl font-bold",
      "2xl": "text-4xl md:text-5xl font-extrabold",
      "3xl": "text-5xl md:text-6xl font-extrabold"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    },
    gradient: {
      true: "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent",
      false: ""
    }
  },
  defaultVariants: {
    size: "default",
    align: "left",
    gradient: false
  }
});

export default function Heading({
  className,
  as = "h1",
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }) {
  const HeadingElement = as;
  return <HeadingElement className={cn(headingVariants({ size, className }))} {...props} />;
}
