export interface StripeCheckoutSessionParams {
  priceId: string;
  redirectUrl?: string; // Base URL for success/cancel
  email: string;
  userId?: string;
  mode: "payment" | "subscription"; // You might need a 'mode' (payment, subscription) depending on your pricing
  customerId?: string;
  // discountCode: string; // Stripe handles discounts via Promotion Codes applied on the session
  // couponId?: string; // couponId: These will be used if you want to prefill the coupon code.
}

export interface StripeCustomerPortalParams {
  customerId: string;
  returnUrl: string; // URL to return to after portal session
}
