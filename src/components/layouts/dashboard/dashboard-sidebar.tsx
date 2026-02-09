import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";

import { SidebarNavItems } from "./sidebar-nav-items";
import { UpgradeCard } from "./upgrade-card";

export async function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton size="lg">
                <div className="flex aspect-square size-7 items-center justify-center rounded-lg">
                  <Image
                    width={32}
                    height={32}
                    src="/logo.png"
                    alt="SaasPilot - Next.js saas starter kit"
                  />
                </div>

                <span className="truncate text-xl font-extrabold">{appConfig.appName}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavItems />
      </SidebarContent>

      <SidebarFooter className="overflow-hidden">
        {!currentUser?.hasAccess && <UpgradeCard />}
      </SidebarFooter>
    </Sidebar>
  );
}
