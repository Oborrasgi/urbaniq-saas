interface DashboardTitleProps {
  heading: string;
  text?: string;
}

export function DashboardTitle({ heading, text }: DashboardTitleProps) {
  return (
    <div className="mb-6">
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl font-extrabold">{heading}</h1>
        {text && <p className="text-muted-foreground text-base">{text}</p>}
      </div>
    </div>
  );
}
