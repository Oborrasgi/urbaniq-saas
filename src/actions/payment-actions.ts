"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function createCheckoutSessionAction(priceId: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.AUTH_URL}/success`,
      cancel_url: `${process.env.AUTH_URL}/pricing`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe error:", error);
    throw new Error("No se pudo crear la sesión de pago");
  }
}

/* ⬇️ puedes dejar esto también si lo usas */
export async function uploadFileToStorage(file: File) {
  if (!file) return { estado: "error" };

  return {
    estado: "exito",
    fileUrl: `/uploads/${file.name}`,
  };
}
"use server";

import Stripe from "stripe";
import { getCurrentUser } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

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

    if (!currentUser || !currentUser.email) {
      return { status: "error", message: "UNAUTHORIZED" };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: currentUser.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.AUTH_URL}/dashboard`,
      cancel_url: `${process.env.AUTH_URL}/pricing`,
    });

    if (!session.url) {
      return { status: "error", message: "STRIPE_CHECKOUT_FAILED" };
    }

    return {
      status: "success",
      data: { url: session.url },
    };
  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);
    return {
      status: "error",
      message: "STRIPE_CHECKOUT_ERROR",
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

    if (!currentUser || !currentUser.customerId) {
      return { status: "error", message: "NO_STRIPE_CUSTOMER" };
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: currentUser.customerId,
      return_url: `${process.env.AUTH_URL}/dashboard`,
    });

    return {
      status: "success",
      data: { url: portalSession.url },
    };
  } catch (error) {
    console.error("[STRIPE_PORTAL_ERROR]", error);
    return {
      status: "error",
      message: "STRIPE_PORTAL_ERROR",
    };
  }
}