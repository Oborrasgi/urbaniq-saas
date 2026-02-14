import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
// import { isTrialPeriod } from "@/lib/utils";

export default async function DashboardPaidLayout({ children }: PropsWithChildren) {
  const currentUser = await getCurrentUser();
  if (
    currentUser &&
    !currentUser?.hasAccess
    // TODO: Uncomment this when we have a way to check if the user is in a trial period
    // && !isTrialPeriod(currentUser.createdAt)
  ) {
    redirect(appConfig.stripe.billingRoute);
  }

  return <>{children}</>;
}
