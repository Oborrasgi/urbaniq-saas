import { redirect } from "next/navigation";
import { Suspense, type PropsWithChildren } from "react";

import { getCurrentUser } from "@/lib/auth";

export default async function VerifyEmailLayout({ children }: PropsWithChildren) {
  const currentUser = await getCurrentUser();

  // If the user is already verified, redirect to the home page.
  // This is to prevent users from verifying their email multiple times.
  if (currentUser && currentUser.emailVerified) {
    return redirect("/");
  }

  return <Suspense>{children}</Suspense>;
}
