import type { PropsWithChildren } from "react";

import { DashboardTitle } from "@/components/dashboard-title";

export default function PasswordSettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Seguridad de la Cuenta"
        text="Actualiza tu contraseña para mantener tu cuenta de UrbanIQ protegida."
      />

      {children}
    </div>
  );
}
