import { type Metadata } from "next";

import { DashboardTitle } from "@/components/dashboard-title";
import { PlanTable } from "@/components/plans";
import { createMetadata } from "@/lib/metadata";
import { getPlans } from "@/lib/plans";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = createMetadata({
  title: "Pricing Plans | Dashboard",
  description: "Manage your pricing plans for your system"
});

export default async function PlansPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const plans = await getPlans();

  return (
    <div className="space-y-6">
      <DashboardTitle heading="Pricing Plans" text="Manage your pricing plans for your system" />
      <PlanTable plans={plans} />
    </div>
  );
}
