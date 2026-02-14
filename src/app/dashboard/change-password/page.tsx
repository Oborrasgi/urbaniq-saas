import { redirect } from "next/navigation";

import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/forms/change-password";
import { Card, CardContent } from "@/components/ui/card";

export default async function PasswordSettingsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  return (
    <Card className="max-w-2xl shadow-none">
      <CardContent className="pt-6">
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
}
