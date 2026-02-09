import { redirect } from "next/navigation";

import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";

import { ChangePasswordForm } from "@/components/forms/change-password";

export default async function PasswordSettingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect(appConfig.auth.login);
  }

  return <ChangePasswordForm />;
}
