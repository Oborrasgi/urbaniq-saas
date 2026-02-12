import { prisma } from "../prisma";

export type Feature =
  | "hasAvm"
  | "hasLegalAI"
  | "hasLeadScoring"
  | "hasApiAccess";

/**
 * 🔐 Checks if a feature is allowed for the user's subscription plan
 */
export async function requireFeature(
  userId: string,
  feature: Feature
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      plan: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
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
 * 🚀 Validates feature access and consumes credits in one secure flow
 */
export async function requireFeatureWithCredits(
  userId: string,
  feature: Feature,
  creditCost: number
) {
  await requireFeature(userId, feature);

  if (creditCost > 0) {
    await consumeCredits(userId, creditCost);
  }

  return true;
}