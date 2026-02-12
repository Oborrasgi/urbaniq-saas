import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { DashboardTitle } from "@/components/dashboard-title";
import { PlanForm } from "@/components/forms/plans";
import { createMetadata } from "@/lib/metadata";
import { getPlanBySlug } from "@/lib/plans";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = createMetadata({
  title: "Edit Plan | Dashboard",
  description: "Edit a pricing plan for your system"
});

interface PlanEditPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PlanEditPage({ params }: PlanEditPageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const { slug } = await params;
  const plan = await getPlanBySlug(slug);

  if (!plan) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading={`${plan.title} Plan`}
        text={`Edit the details for the ${plan.title.toLowerCase()} plan`}
      />

      <PlanForm plan={plan} />
    </div>
  );
}
