import type { PropsWithChildren } from "react";

import { DashboardTitle } from "@/components/dashboard-title";

export default function DeleteAccountLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Eliminar cuenta"
        text="Esta acción eliminará permanentemente tu cuenta de UrbanIQ y todos los datos asociados. Esta operación no se puede deshacer."
      />

      {children}
    </div>
  );
}
