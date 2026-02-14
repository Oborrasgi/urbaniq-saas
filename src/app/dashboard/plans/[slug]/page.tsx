import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { DashboardTitle } from "@/components/dashboard-title";
import { PlanForm } from "@/components/forms/plans";
import { createMetadata } from "@/lib/metadata";
import { getPlanBySlug } from "@/lib/plans";

export const metadata: Metadata = createMetadata({
  title: "Editar Plan | UrbanIQ Dashboard",
  description: "Editar un plan de suscripción en UrbanIQ"
});

interface PlanEditPageProps {
  params: { slug: string };
}

export default async function PlanEditPage({ params }: PlanEditPageProps) {
  const { slug } = params;

  // 🚫 Only allow editing of the "pro" plan for now
  if (slug !== "pro") {
    notFound();
  }

  const plan = await getPlanBySlug(slug);

  if (!plan) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading={`UrbanIQ Professional Plan`}
        text="Configura todas las funcionalidades y condiciones del único plan activo actualmente (100€/mes)."
      />

      <PlanForm plan={plan} />
    </div>
  );
}
