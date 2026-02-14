import { CommandMenu } from "@/components/command-menu";
import { NavUser } from "@/components/layouts/dashboard/nav-user";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-4">
        
        {/* Left section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="size-8 text-muted-foreground [&_svg]:size-5" />
          
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              UrbanIQ
            </span>
            <span className="text-muted-foreground text-xs">
              AI Real Estate Intelligence
            </span>
          </div>

          <CommandMenu />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <NavUser />
        </div>
      </div>
    </header>
  );
}