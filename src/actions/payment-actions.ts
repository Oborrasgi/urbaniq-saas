"use server";

import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import {
  createStripeCheckoutSession,
  createStripeCustomerPortal
} from "@/lib/stripe";

/* ==========================================================================
 * Types
 * ========================================================================== */
type ActionResult<T = undefined> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

/* ==========================================================================
 * Create Stripe Checkout Session
 * ========================================================================== */
export async function createCheckoutSessionAction(
  priceId: string
): Promise<ActionResult<{ url: string }>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        status: "error",
        message: "UNAUTHORIZED"
      };
    }

    if (!priceId) {
      return {
        status: "error",
        message: "PRICE_ID_REQUIRED"
      };
    }

    const plan = appConfig.stripe.plans.find(
      (p) => p.priceId === priceId
    );

    if (!plan) {
      return {
        status: "error",
        message: "PLAN_NOT_FOUND"
      };
    }

    if (!currentUser.email) {
      return {
        status: "error",
        message: "USER_EMAIL_REQUIRED"
      };
    }

    const redirectUrl = `${appConfig.domainUrl}/dashboard`;

    const checkoutUrl = await createStripeCheckoutSession({
      priceId,
      mode: plan.mode,
      email: currentUser.email,
      userId: currentUser.id,
      customerId: currentUser.customerId ?? undefined,
      redirectUrl
      // 🔜 tenantId, planSlug, credits, etc.
    });

    if (!checkoutUrl) {
      return {
        status: "error",
        message: "STRIPE_CHECKOUT_FAILED"
      };
    }

    return {
      status: "success",
      data: { url: checkoutUrl }
    };
  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);

    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "STRIPE_CHECKOUT_ERROR"
    };
  }
}

/* ==========================================================================
 * Create Stripe Customer Portal Session
 * ========================================================================== */
export async function createCustomerPortalAction(): Promise<
  ActionResult<{ url: string }>
> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        status: "error",
        message: "UNAUTHORIZED"
      };
    }

    if (!currentUser.customerId) {
      return {
        status: "error",
        message: "NO_STRIPE_CUSTOMER"
      };
    }

    const returnUrl = `${appConfig.domainUrl}/dashboard`;

    const portalUrl = await createStripeCustomerPortal({
      customerId: currentUser.customerId,
      returnUrl
    });

    if (!portalUrl) {
      return {
        status: "error",
        message: "STRIPE_PORTAL_FAILED"
      };
    }

    return {
      status: "success",
      data: { url: portalUrl }
    };
  } catch (error) {
    console.error("[STRIPE_PORTAL_ERROR]", error);

    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "STRIPE_PORTAL_ERROR"
    };
  }
}