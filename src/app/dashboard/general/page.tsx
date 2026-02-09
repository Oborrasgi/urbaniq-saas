import { Metadata } from "next";
import { redirect } from "next/navigation";

import { GeneralSettingForm } from "@/components/forms/general-setting";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "General Settings | Next.js SaaS Starter Kit Boilerplate"
});

export default async function GeneralSettingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect(appConfig.auth.login);
  }

  return <GeneralSettingForm user={currentUser} />;
}
