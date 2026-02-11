"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { User } from "@/types/user";

/**
 * Obtener usuarios (preparado para admin / SaaS)
 */
export async function getUsers(): Promise<User[]> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  // 🔒 Activar cuando quieras control admin
  // if (currentUser.role !== "ADMIN") {
  //   throw new Error("Unauthorized");
  // }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        credits: true,
        role: true,
        hasAccess: true,
        createdAt: true
      }
    });

    return users as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

/**
 * Eliminar usuario (con protecciones SaaS)
 */
export async function deleteUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  // 🔒 Activar cuando quieras control admin
  // if (currentUser.role !== "ADMIN") {
  //   return { success: false, error: "Unauthorized" };
  // }

  if (currentUser.id === userId) {
    return {
      success: false,
      error: "You cannot delete your own account"
    };
  }

  try {
    await prisma.user.delete({
      where: { id: userId }
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}