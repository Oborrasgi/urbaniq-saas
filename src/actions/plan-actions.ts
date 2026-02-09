"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { planFormSchema, type PlanFormSchema } from "@/lib/zod-schemas";

/* ==========================================================================
 * Types
 * ========================================================================== */
type ActionResult =
  | { status: "success"; message: string }
  | { status: "error"; message: string };

/* ==========================================================================
 * Create Plan
 * ========================================================================== */
export async function createPlanAction(
  data: PlanFormSchema
): Promise<ActionResult> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { status: "error", message: "UNAUTHORIZED" };
    }

    const validation = planFormSchema.safeParse(data);
    if (!validation.success) {
      return { status: "error", message: "INVALID_PLAN_DATA" };
    }

    const {
      title,
      description,
      mode,
      price,
      priceId,
      isActive,
      monthlyCredits,
      yearlyCredits,
      annualPrice,
      monthlyPrice,
      yearlyPriceId,
      monthlyPriceId
    } = validation.data;

    const slug = slugify(title);

    const existingPlan = await prisma.plan.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (existingPlan) {
      return {
        status: "error",
        message: "PLAN_ALREADY_EXISTS"
      };
    }

    await prisma.plan.create({
      data: {
        slug,
        title,
        description,
        mode,
        isActive,

        // ONE TIME PAYMENT
        ...(mode === "ONE_TIME_PAYMENT" && {
          priceId: priceId!,
          price: Number(price ?? 0),
          monthlyCredits: 0,
          yearlyCredits: 0
        }),

        // SUBSCRIPTION
        ...(mode === "SUBSCRIPTION" && {
          yearlyPriceId: yearlyPriceId!,
          monthlyPriceId: monthlyPriceId!,
          yearlyPrice: Number(annualPrice ?? 0),
          monthlyPrice: Number(monthlyPrice ?? 0),
          yearlyCredits: Number(yearlyCredits ?? 0),
          monthlyCredits: Number(monthlyCredits ?? 0),
          price: 0,
          priceId: null
        })
      }
    });

    return {
      status: "success",
      message: "PLAN_CREATED"
    };
  } catch (error) {
    console.error("[CREATE_PLAN_ERROR]", error);
    return {
      status: "error",
      message: "CREATE_PLAN_FAILED"
    };
  }
}

/* ==========================================================================
 * Update Plan
 * ========================================================================== */
export async function updatePlanAction(
  slug: string,
  data: PlanFormSchema
): Promise<ActionResult> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { status: "error", message: "UNAUTHORIZED" };
    }

    const validation = planFormSchema.safeParse(data);
    if (!validation.success) {
      return { status: "error", message: "INVALID_PLAN_DATA" };
    }

    const {
      title,
      description,
      mode,
      price,
      priceId,
      isActive,
      monthlyCredits,
      yearlyCredits,
      annualPrice,
      monthlyPrice,
      yearlyPriceId,
      monthlyPriceId
    } = validation.data;

    const existingPlan = await prisma.plan.findUnique({
      where: { slug },
      select: { id: true, mode: true }
    });

    if (!existingPlan) {
      return {
        status: "error",
        message: "PLAN_NOT_FOUND"
      };
    }

    await prisma.plan.update({
      where: { slug },
      data: {
        title,
        description,
        mode,
        isActive,

        // SWITCH TO ONE TIME PAYMENT
        ...(mode === "ONE_TIME_PAYMENT" && {
          priceId,
          price: Number(price ?? 0),
          yearlyPriceId: null,
          monthlyPriceId: null,
          yearlyPrice: 0,
          monthlyPrice: 0,
          yearlyCredits: 0,
          monthlyCredits: 0
        }),

        // SWITCH TO SUBSCRIPTION
        ...(mode === "SUBSCRIPTION" && {
          yearlyPriceId,
          monthlyPriceId,
          yearlyPrice: Number(annualPrice ?? 0),
          monthlyPrice: Number(monthlyPrice ?? 0),
          yearlyCredits: Number(yearlyCredits ?? 0),
          monthlyCredits: Number(monthlyCredits ?? 0),
          price: 0,
          priceId: null
        })
      }
    });

    return {
      status: "success",
      message: "PLAN_UPDATED"
    };
  } catch (error) {
    console.error("[UPDATE_PLAN_ERROR]", error);
    return {
      status: "error",
      message: "UPDATE_PLAN_FAILED"
    };
  }
}

/* ==========================================================================
 * Delete Plan
 * ========================================================================== */
export async function deletePlanAction(
  slug: string
): Promise<ActionResult> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { status: "error", message: "UNAUTHORIZED" };
    }

    const existingPlan = await prisma.plan.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (!existingPlan) {
      return {
        status: "error",
        message: "PLAN_NOT_FOUND"
      };
    }

    await prisma.plan.delete({
      where: { slug }
    });

    return {
      status: "success",
      message: "PLAN_DELETED"
    };
  } catch (error) {
    console.error("[DELETE_PLAN_ERROR]", error);
    return {
      status: "error",
      message: "DELETE_PLAN_FAILED"
    };
  }
}