import { type Metadata } from "next";

import { DashboardTitle } from "@/components/dashboard-title";
import { PlanTable } from "@/components/plans";
import { createMetadata } from "@/lib/metadata";
import { getPlans } from "@/lib/plans";

export const metadata: Metadata = createMetadata({
  title: "Subscription Plans | UrbanIQ Dashboard",
  description: "Manage subscription plans, pricing tiers and access levels for UrbanIQ."
});

export default async function PlansPage() {
  const plans = await getPlans();

  // Only allow UrbanIQ Professional to be actively sold
  // Starter & Business remain visible but marked as coming soon
  const sortedPlans = plans.sort((a: any, b: any) => {
    if (a.slug === "pro") return -1;
    if (b.slug === "pro") return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="UrbanIQ Subscription Plans"
        text="Manage UrbanIQ Professional (active) and upcoming tiers (Starter & Business - coming soon)."
      />

      <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
        <strong>Current Sales Model:</strong> Only <span className="text-primary font-medium">UrbanIQ Professional (€100/month)</span> is available for subscription. 
        Starter (Broker Hipotecario) and Business (Enterprise Teams) are marked as coming soon.
      </div>

      <PlanTable plans={sortedPlans} />
    </div>
  );
}
