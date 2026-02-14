import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import DashboardLayout from "@/components/layouts/dashboard";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";

export default async function Layout({ children }: PropsWithChildren) {
  const currentUser = await getCurrentUser();

  // Protect dashboard routes
  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
