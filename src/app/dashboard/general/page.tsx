import { Metadata } from "next";
import { redirect } from "next/navigation";

import { GeneralSettingForm } from "@/components/forms/general-setting";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Configuración general | UrbanIQ Dashboard",
  description: "Gestiona la información principal de tu cuenta en UrbanIQ."
});

export default async function GeneralSettingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect(appConfig.auth.login);
  }

  return <GeneralSettingForm user={currentUser} />;
}
