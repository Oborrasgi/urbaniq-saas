import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "premium";
  actions?: React.ReactNode;
}

export function EmptyPlaceholder({
  className,
  children,
  variant = "default",
  actions,
  ...props
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        "animate-in fade-in-50 flex flex-1 items-center justify-center rounded-xl border border-dashed p-10 text-center transition-all",
        variant === "premium" &&
          "bg-gradient-to-br from-muted/40 to-background shadow-sm",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[460px] flex-col items-center justify-center text-center">
        {children}
        {actions && <div className="mt-4 flex gap-3">{actions}</div>}
      </div>
    </div>
  );
}

interface EmptyPlaceholderIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  icon: any;
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  icon,
  className,
  ...props
}: EmptyPlaceholderIconProps) {
  const Icon = icon;
  if (!Icon) return null;

  return (
    <div className="bg-primary/10 text-primary flex size-20 items-center justify-center rounded-2xl">
      <Icon className={cn("size-10", className)} {...props} />
    </div>
  );
};

interface EmptyPlaceholderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: EmptyPlaceholderTitleProps) {
  return (
    <h2
      className={cn(
        "mt-6 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

interface EmptyPlaceholderDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

EmptyPlaceholder.Description =
  function EmptyPlaceholderDescription({
    className,
    ...props
  }: EmptyPlaceholderDescriptionProps) {
    return (
      <p
        className={cn(
          "text-muted-foreground mt-2 text-sm leading-6",
          className
        )}
        {...props}
      />
    );
  };
