import { Metadata } from "next";
import { redirect } from "next/navigation";

import { BillingDetails } from "@/components/billing";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Billing Settings | Next.js SaaS Starter Kit Boilerplate"
});

export default async function BillingSettingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect(appConfig.auth.login);
  }

  return <BillingDetails user={currentUser} />;
}
