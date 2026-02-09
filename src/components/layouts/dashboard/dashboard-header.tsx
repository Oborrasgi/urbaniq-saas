import { CommandMenu } from "@/components/command-menu";
import { NavUser } from "@/components/layouts/dashboard/nav-user";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="bg-background/40 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex grow items-center gap-4">
          <SidebarTrigger className="text-muted-foreground size-8 p-0! [&_svg]:size-5!" />
          <CommandMenu />
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <NavUser />
        </div>
      </div>
    </header>
  );
}
