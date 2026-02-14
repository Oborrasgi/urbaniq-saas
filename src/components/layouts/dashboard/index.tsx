import type { PropsWithChildren } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

export default async function DashboardLayout({
  children
}: PropsWithChildren) {
  return (
    <SidebarProvider>
      {/* Sidebar (Server Component) */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <DashboardHeader />

          <main className="flex-1">
            <div className="container mx-auto py-8 flex flex-col gap-6">
              {children}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
