import Stripe from "stripe";

import { appConfig } from "@/config";
import { StripeCheckoutSessionParams, StripeCustomerPortalParams } from "@/types/stripe";

if (!appConfig.stripe.secretKey) {
  console.error("STRIPE_SECRET_KEY is not set");
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripeClient = new Stripe(appConfig.stripe.secretKey, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2025-08-27.basil", // Use the latest API version
  typescript: true
});

/**
 * This is used to create a Stripe Checkout Session for one-time payments or subscriptions.
 * It's usually triggered with a <PurchaseButton /> component.
 * Webhooks are used to update the user's state in the database.
 */
export async function createStripeCheckoutSession({
  mode,
  email,
  userId,
  priceId,
  customerId,
  // couponId,
  redirectUrl = appConfig.domainUrl
}: StripeCheckoutSessionParams): Promise<string | undefined> {
  try {
    // make success and cancel URLs
    const success_url = `${redirectUrl}?session_id={CHECKOUT_SESSION_ID}&status=success`;
    const cancel_url = `${redirectUrl}?session_id={CHECKOUT_SESSION_ID}&status=failed`;

    const session = await stripeClient.checkout.sessions.create({
      // payment_method_types: ["card"], //specify payment methods like ["card", "paypal", "alipay", "cashapp"] and list goes on
      line_items: [{ price: priceId, quantity: 1 }],
      mode: mode,
      success_url,
      cancel_url,
      ...(customerId
        ? { customer: customerId }
        : {
            customer_email: email,
            /**
             * For subscription mode, Stripe automatically creates a customer
             * Create a customer for one-time payments
             */
            ...(mode === "payment" && { customer_creation: "always" })
          }),

      // Set client_reference_id or metadata to link the checkout session to your user
      ...(userId && { client_reference_id: userId }),

      // To apply promotions/discounts: https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-allow_promotion_codes
      allow_promotion_codes: true

      // if need to apply discounts uncomment it and also the couponId parameter
      // discounts: couponId
      //   ? [
      //       {
      //         coupon: couponId,
      //       },
      //     ]
      //   : [],
    });

    return session.url ?? undefined;
  } catch (error) {
    console.error("Failed to create Stripe checkout session:", error);
    return undefined;
  }
}

/**
 * This is used to create Customer Portal sessions, so users can manage their subscriptions
 * (payment methods, cancel, etc.)
 */
export async function createStripeCustomerPortal({
  customerId,
  returnUrl
}: StripeCustomerPortalParams): Promise<string | undefined> {
  try {
    const portalSession = await stripeClient.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    });

    return portalSession.url;
  } catch (error) {
    console.error("Failed to create Stripe customer portal session:", error);
    return undefined;
  }
}
