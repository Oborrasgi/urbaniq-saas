import type { PropsWithChildren } from "react";

import { DashboardTitle } from "@/components/dashboard-title";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Account Settings"
        text="Manage your account settings and preferences"
      />

      {children}
    </div>
  );
}
