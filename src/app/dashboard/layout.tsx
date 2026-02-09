import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import DashboardLayout from "@/components/layouts/dashboard";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";

export default async function Layout({ children }: PropsWithChildren) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  return (
    <>
      {/* Only show the verify email topbar if the user is not verified */}
      {/* {!currentUser.emailVerified ? <VerifyEmailTopbar email={currentUser.email!} /> : null} */}

      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}
