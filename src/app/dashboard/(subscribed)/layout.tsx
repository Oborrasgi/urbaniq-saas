import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPaidLayout({ children }: PropsWithChildren) {
  const currentUser = await getCurrentUser();

  // 🔒 Si no está logado → login
  if (!currentUser) {
    redirect("/login");
  }

  // 💳 Si está logado pero no tiene acceso → billing
  if (!currentUser.hasAccess) {
    redirect(appConfig.stripe.billingRoute);
  }

  return <>{children}</>;
}