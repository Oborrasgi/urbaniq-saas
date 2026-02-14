import type { PropsWithChildren } from "react";

import { DashboardTitle } from "@/components/dashboard-title";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Configuración de Cuenta"
        text="Gestiona tu perfil, preferencias y ajustes de UrbanIQ."
      />

      {children}
    </div>
  );
}
