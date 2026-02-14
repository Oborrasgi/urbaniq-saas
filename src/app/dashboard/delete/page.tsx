import { Metadata } from "next";

import { DeleteAccountForm } from "@/components/forms/delete-account";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Eliminar cuenta | UrbanIQ Dashboard"
});

export default function DangerSettingsPage() {
  return <DeleteAccountForm />;
}
