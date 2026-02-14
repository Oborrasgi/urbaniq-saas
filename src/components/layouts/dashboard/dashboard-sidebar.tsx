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

export async function DashboardSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" {...props}>
      
      {/* ============================= */}
      {/* HEADER (UrbanIQ Branding) */}
      {/* ============================= */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard">
              <SidebarMenuButton size="lg" className="gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-primary/10">
                  <Image
                    width={28}
                    height={28}
                    src="/logo.png"
                    alt="UrbanIQ Logo"
                  />
                </div>

                <div className="flex flex-col text-left leading-tight">
                  <span className="truncate text-lg font-semibold tracking-tight">
                    UrbanIQ
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Real Estate Intelligence
                  </span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ============================= */}
      {/* NAVIGATION */}
      {/* ============================= */}
      <SidebarContent>
        <SidebarNavItems />
      </SidebarContent>

      {/* ============================= */}
      {/* FOOTER (Upgrade Area) */}
      {/* ============================= */}
      <SidebarFooter className="overflow-hidden p-3">
        {!currentUser?.hasAccess && <UpgradeCard />}
      </SidebarFooter>
    </Sidebar>
  );
}