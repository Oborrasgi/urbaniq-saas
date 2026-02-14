interface DashboardTitleProps {
  heading: string;
  text?: string;
  badge?: string;
  actions?: React.ReactNode;
}

export function DashboardTitle({
  heading,
  text,
  badge,
  actions
}: DashboardTitleProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            {heading}
          </h1>

          {badge && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {badge}
            </span>
          )}
        </div>

        {text && (
          <p className="text-muted-foreground max-w-2xl text-sm">
            {text}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
