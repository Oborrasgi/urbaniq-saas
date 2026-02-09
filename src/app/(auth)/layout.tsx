import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { getCurrentUser } from "@/lib/auth";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
