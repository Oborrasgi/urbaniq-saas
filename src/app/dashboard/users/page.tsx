import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardTitle } from "@/components/dashboard-title";
import { UserActionTable } from "@/components/users";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Usuarios | UrbanIQ Dashboard",
  description: "Gestión avanzada de usuarios, partners y administradores en UrbanIQ."
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
  // TODO: Replace mock data with real Prisma query
  // const users = await prisma.user.findMany();
  const users: any[] = [];

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Gestión de Usuarios"
        text="Administra propietarios, agencias, partners y administradores dentro de UrbanIQ."
      />

      <UserActionTable users={users} />
    </div>
  );
}
