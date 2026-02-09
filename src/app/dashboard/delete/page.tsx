import { Metadata } from "next";

import { DeleteAccountForm } from "@/components/forms/delete-account";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Delete Account | Next.js SaaS Starter Kit Boilerplate"
});

export default function DangerSettingsPage() {
  return <DeleteAccountForm />;
}
