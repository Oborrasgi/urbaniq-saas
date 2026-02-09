"use server";

import { appConfig } from "@/config";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/zod-schemas";

type AuthRegisterResult =
  | { status: "success"; message: string }
  | { status: "error"; message?: string; errors?: Record<string, string[]> };

export async function authRegisterAction(data: RegisterSchema): Promise<AuthRegisterResult> {
  try {
    const validationResult = registerSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        status: "error",
        errors: validationResult.error.flatten().fieldErrors
      };
    }

    // Normalize email to lowercase to avoid duplicates due to case sensitivity
    const { email: rawEmail, password, name } = validationResult.data;
    const email = rawEmail.trim().toLowerCase();

    // Optional: Implement tenant or multi-tenant logic here
    // const tenantId = getCurrentTenantId();

    // Check for existing user explicitly without throwing
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (existingUser) {
      return {
        status: "error",
        message: "A user with this email already exists."
      };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        credits: appConfig.defaultCredits,
        // Optional: Add tenantId here if multi-tenant
        // tenantId,
        // Optional: Add email verification status or token here
        // isEmailVerified: false,
        // verificationToken: generateVerificationToken(),
      }
    });

    // Optional: Trigger post-registration hooks such as sending verification email
    // await sendVerificationEmail(email);

    return { status: "success", message: "User registered successfully" };
  } catch (error) {
    // Log error safely
    console.error("authRegisterAction error:", error);

    const message = error instanceof Error ? error.message : "Failed to register user";
    return { status: "error", message };
  }
}
