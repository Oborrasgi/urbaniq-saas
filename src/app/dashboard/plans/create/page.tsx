import { type Metadata } from "next";

import { DashboardTitle } from "@/components/dashboard-title";
import { PlanForm } from "@/components/forms/plans";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Create Plan | Dashboard",
  description: "Create a new pricing plan for your system"
});

export default function CreatePlanPage() {
  return (
    <div className="space-y-6">
      <DashboardTitle heading="Create Pricing Plan" text="Add a new pricing plan to your system" />
      <PlanForm />
    </div>
  );
}
