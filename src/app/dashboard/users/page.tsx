import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardTitle } from "@/components/dashboard-title";
import { UserActionTable } from "@/components/users";
import { appConfig } from "@/config";
import { users } from "@/data/users";
import { getCurrentUser } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Users | Next.js SaaS Starter Kit Boilerplate"
});

export default async function UsersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  // Only allow admin users to access this page
  //   if (!currentUser.isAdmin) {
  //     redirect("/dashboard");
  //   }

  // Fetch users from the database
  // const users = await getUsers();

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="User Management"
        text="View and manage all users in your application"
      />

      <UserActionTable users={users} />
    </div>
  );
}
