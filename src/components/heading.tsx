import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const headingVariants = cva("font-mono", {
  variants: {
    size: {
      default: "text-lg md:text-xl font-semibold",
      lg: "text-xl font-bold md:text-2xl",
      xl: "text-4xl font-bold",
      "2xl": "text-3xl font-bold tracking-tight sm:text-5xl",
      "3xl": "font-extrabold tracking-tighter text-4xl lg:text-6xl/none"
    }
  },
  defaultVariants: { size: "default" }
});

export default function Heading({
  className,
  as = "h1",
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) {
  const HeadingElement = as;
  return <HeadingElement className={cn(headingVariants({ size, className }))} {...props} />;
}
