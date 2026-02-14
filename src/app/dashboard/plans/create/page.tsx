import { type Metadata } from "next";

import { DashboardTitle } from "@/components/dashboard-title";
import { PlanForm } from "@/components/forms/plans";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Crear Plan | UrbanIQ Dashboard",
  description:
    "Crea un nuevo plan de suscripción para UrbanIQ y define precios, funcionalidades y límites."
});

export default function CreatePlanPage() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Crear Plan de Suscripción"
        text="Añade un nuevo plan (Starter, Pro, Business o Agency) a la plataforma UrbanIQ."
      />
      <PlanForm />
    </div>
  );
}
