"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { Prisma, Role } from "@prisma/client";

import { getCurrentUser, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type DeleteUserResult = {
  success: boolean;
  error?: string;
};

/**
 * Soft-delete a user for GDPR-style account removal.
 *
 * Admins may delete any account. Non-admin users may only delete themselves.
 * The user row is retained for auditability and linked records are preserved.
 */
export async function deleteUser(userId: string): Promise<DeleteUserResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  const isAdmin = currentUser.role === Role.ADMIN;
  const isSelfDelete = currentUser.id === userId;

  if (!isAdmin && !isSelfDelete) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const deletedAt = new Date();
    const metadata = JSON.stringify({
      deletedBy: currentUser.id,
      selfDelete: isSelfDelete
    });

    await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`
        UPDATE "users"
        SET "deletedAt" = ${deletedAt}, "isActive" = false
        WHERE "id" = ${userId}
      `;

      await tx.$executeRaw(Prisma.sql`
        INSERT INTO "access_logs" ("id", "action", "actorId", "userId", "metadata")
        VALUES (${randomUUID()}, 'USER_SOFT_DELETED', ${currentUser.id}, ${userId}, ${metadata}::jsonb)
      `);
    });

    revalidatePath("/dashboard/users");

    if (isSelfDelete) {
      await signOut({ redirect: false });
    }

    return { success: true };
  } catch (error) {
    console.error("Error soft deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
