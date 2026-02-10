"use server";

import Stripe from "stripe";
import { getCurrentUser } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Crear sesión de Checkout (suscripción)
 */
export async function createCheckoutSessionAction(priceId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { status: "error", message: "No autenticado" };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.AUTH_URL}/dashboard`,
    cancel_url: `${process.env.AUTH_URL}/pricing`,
    customer_email: user.email ?? undefined,
  });

  return {
    status: "success",
    data: {
      url: session.url,
    },
  };
}

/**
 * Portal de cliente (gestión suscripción)
 */
export async function createCustomerPortalAction() {
  const user = await getCurrentUser();

  if (!user || !user.customerId) {
    return { status: "error", message: "Cliente no encontrado" };
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.customerId,
    return_url: `${process.env.AUTH_URL}/dashboard`,
  });

  return {
    status: "success",
    data: {
      url: session.url,
    },
  };
}