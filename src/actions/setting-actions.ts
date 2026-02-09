"use server";

import { revalidatePath } from "next/cache";

import { removeFileFromStorage } from "@/actions/file-actions";
import { getCurrentUser } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import {
  changePasswordSchema,
  ChangePasswordSchema,
  GeneralSettingsSchema,
  generalSettingsSchema
} from "@/lib/zod-schemas";

export async function updateUserProfile(data: GeneralSettingsSchema) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized Access!");
    }

    const validationResult = generalSettingsSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        status: "error",
        errors: validationResult.error.flatten()
      };
    }

    // Extract the validated data
    const { name, image } = validationResult.data;
    const previousImage = currentUser.image;

    // Update the user profile with validated data inside a transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: currentUser.id },
        data: { name, image }
      });

      if (previousImage && previousImage !== image) {
        await removeFileFromStorage(previousImage);
      }
    });

    revalidatePath("/dashboard/profile");
    return { status: "success" };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function changeUserPassword(data: ChangePasswordSchema) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized Access!");
    }

    // Get the user with password from database
    const userWithPassword = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { id: true, password: true }
    });

    if (!userWithPassword || !userWithPassword.password) {
      return {
        status: "error",
        message: "User does not have a password set. Please use social login or contact support."
      };
    }

    const validationResult = changePasswordSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        status: "error",
        errors: validationResult.error.flatten()
      };
    }

    const { currentPassword, newPassword } = validationResult.data;

    // Verify the current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, userWithPassword.password);
    if (!isCurrentPasswordValid) {
      return {
        status: "error",
        message: "Current password is incorrect"
      };
    }

    // Hash the new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update the user's password
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { password: hashedNewPassword }
    });

    revalidatePath("/dashboard/password");
    return {
      status: "success",
      message: "Password updated successfully"
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
