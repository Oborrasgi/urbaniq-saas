import { prisma } from "../prisma";
import { Role } from "@prisma/client";

export type Feature =
  | "hasAvm"
  | "hasLegalAI"
  | "hasLeadScoring"
  | "hasApiAccess";

/**
 * 🔐 Checks if a feature is allowed for the user's subscription plan
 * ADMIN users automatically bypass feature restrictions
 */
export async function requireFeature(
  userId: string,
  feature: Feature
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { plan: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 🔓 ADMIN bypass
  if (user.role === Role.ADMIN) {
    return true;
  }

  if (!user.plan) {
    throw new Error("No active subscription plan");
  }

  const allowed = user.plan[feature];

  if (!allowed) {
    throw new Error("Feature not available in your subscription plan");
  }

  return true;
}

/**
 * 💳 Consumes credits safely using a transaction
 * Prevents race conditions
 */
export async function consumeCredits(
  userId: string,
  amount: number
) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.credits < amount) {
      throw new Error("Not enough credits");
    }

    await tx.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: amount,
        },
      },
    });

    return true;
  });
}

/**
 * 🚀 Enterprise-safe validation
 * - Checks feature access
 * - Consumes credits
 * - Runs inside a single atomic transaction
 */
export async function requireFeatureWithCredits(
  userId: string,
  feature: Feature,
  creditCost: number
) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // 🔓 ADMIN bypass
    if (user.role !== Role.ADMIN) {
      if (!user.plan) {
        throw new Error("No active subscription plan");
      }

      const allowed = user.plan[feature];

      if (!allowed) {
        throw new Error("Feature not available in your subscription plan");
      }

      if (creditCost > 0) {
        if (user.credits < creditCost) {
          throw new Error("Not enough credits");
        }

        await tx.user.update({
          where: { id: userId },
          data: {
            credits: {
              decrement: creditCost,
            },
          },
        });
      }
    }

    return true;
  });
}