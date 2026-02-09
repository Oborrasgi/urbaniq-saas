import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { appConfig } from "@/config";
import { prisma } from "@/lib/prisma";
import { stripeClient } from "@/lib/stripe";
import { User } from "@/types/user";

// import { sendEmail } from "@/lib/resend";
// import { renderEmail } from "@/lib/react-email";
// import { RetentionOfferEmail } from "@/components/mails/retention-offer-email";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;
  const webhookSecret = appConfig.stripe.webhookSecret;

  if (!webhookSecret) {
    const message =
      "Stripe webhook secret (STRIPE_WEBHOOK_SECRET) is missing from environment variables. Cannot verify incoming Stripe webhooks.";
    console.error(message);
    return NextResponse.json({ error: { message } }, { status: 500 });
  }

  let event: Stripe.Event;

  // Validate the Stripe webhook signature and parse the incoming event payload
  try {
    event = stripeClient.webhooks.constructEvent(body, signature, webhookSecret);
    console.log(`Stripe event: ${event.type}`);
  } catch (err) {
    const error = err as Error;
    const message = `Webhook signature verification failed: ${error.message}`;

    console.log(message);
    return NextResponse.json({ error: { message } }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // Handles both initial subscription payments and one-time purchases.
        console.log(`Handling "${event.type}" event...`);

        const stripeObject = event.data.object;
        const checkoutSession = await stripeClient.checkout.sessions.retrieve(stripeObject.id, {
          expand: ["line_items"]
        });

        // collect necessary info from the checkout session
        const userId = checkoutSession?.client_reference_id;
        const stripeCustomerId = checkoutSession?.customer as string;
        const customerEmail = checkoutSession?.customer_details?.email;
        const priceId = checkoutSession?.line_items?.data[0]?.price?.id;
        console.log(
          ` UserID: ${userId}, CustomerID: ${stripeCustomerId}, Email: ${customerEmail}, PriceID: ${priceId}`
        );

        let user: User | null = null;

        // Find the user associated with the order.
        if (userId) {
          user = await prisma.user.findUnique({ where: { id: userId } });
        } else if (customerEmail) {
          user = await prisma.user.findUnique({ where: { email: customerEmail } });
        }

        if (!user) {
          console.error(
            `Stripe Webhook Error: Unable to associate checkout session with userId: ${userId}, email: ${customerEmail}`
          );

          return NextResponse.json(
            {
              message:
                "No matching user found for this Stripe event. Webhook processed and acknowledged."
            },
            { status: 200 }
          );
        }

        // Verify the purchased plan/price exists in app config
        const plan = appConfig.stripe.plans.find((p) => p.priceId === priceId);
        if (!plan) {
          const message = `Plan configuration missing for priceId: ${priceId}`;
          console.error(message);
          throw new Error(message);
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            priceId, // Store purchased price ID
            hasAccess: true, // Grant access
            customerId: stripeCustomerId, // Store Stripe customer ID,
            subscribedAt: new Date(), // Store subscription start date
            credits: { increment: plan.credits } // Increment the credits based on the plan
          }
        });

        // // TODO: Send email to user
        // // Send order confirmation email
        // try {
        //   console.log(`Attempting to send order confirmation email to ${customerEmail}...`);

        //   const emailHtml = await renderEmail(OrderConfirmationEmail, {
        //     name: user.name!,
        //     planName: plan.title,
        //     planPrice: plan.price,
        //     orderId: checkoutSession.id,
        //     paymentDate: new Date().toISOString(),
        //     isSubscription: plan.mode === "subscription",
        //     dashboardUrl: `${appConfig.domainUrl}/dashboard`
        //   });

        //   await sendEmail({
        //     to: user.email!,
        //     html: emailHtml,
        //     subject: `Order Confirmation for ${plan.title}`
        //   });

        //   console.log(`Order confirmation email sent successfully to ${customerEmail}.`);
        // } catch (error) {
        //   const errorMessage = error instanceof Error ? error.message : "Unknown error";
        //   console.error(`Failed to send order confirmation email: ${errorMessage}`);
        // }

        break;
      }

      case "customer.subscription.updated": {
        // Handles subscription updates, such as plan changes (upgrades/downgrades) and renewals.
        // TODO: Optionally update user credits on a monthly basis if required.
        console.log(`Handling "${event.type}" event...`);
        const subscription = event.data.object;

        const status = subscription.status;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0]?.price.id;

        const user = await prisma.user.findFirst({
          where: { customerId },
          select: { id: true, priceId: true }
        });

        if (!user) {
          console.error(
            `Stripe Webhook Error: User not found for subscription update. customerId: ${customerId}`
          );

          return NextResponse.json(
            {
              message:
                "No matching user found for this Stripe event. Webhook processed and acknowledged."
            },
            { status: 200 }
          );
        }

        // Update user access based on subscription status
        const hasAccess = status === "active";

        // Verify the purchased plan/price exists in app config
        const plan = appConfig.stripe.plans.find((p) => p.priceId === priceId);
        if (!plan) {
          const message = `Plan configuration missing for priceId: ${priceId}`;
          console.error(message);
          throw new Error(message);
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            priceId, // Update price ID
            hasAccess,
            credits: { increment: plan.credits } // Increment the credits based on the plan
          }
        });

        break;
      }

      case "customer.subscription.deleted": {
        // Handles subscription cancellations or expirations by revoking user access.
        console.log(`Handling "${event.type}" event...`);
        const stripeObject = event.data.object;

        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        // Retrieving the subscription might not be necessary if we only care about the customerId from the event object
        // const subscription = await stripeClient.subscriptions.retrieve(stripeObject.id);
        const customerId = stripeObject.customer as string;

        const user = await prisma.user.findFirst({
          where: { customerId }, // Find by Stripe Customer ID
          select: { id: true }
        });

        if (!user) {
          console.error(
            `Stripe Webhook Error: User not found for subscription deletion. customerId: ${customerId}`
          );

          return NextResponse.json(
            {
              message:
                "No matching user found for this Stripe event. Webhook processed and acknowledged."
            },
            { status: 200 }
          );
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            hasAccess: false, // Revoke access
            priceId: null // Optionally clear price ID
          }
        });

        // // Send retention email offer
        // try {
        //   console.log(`Attempting to send retention email to ${userDeleted.email}...`);
        //   const emailHtml = await renderEmail(RetentionOfferEmail, {
        //     name: userDeleted.name ?? undefined, // Pass name if available
        //     discountCode: "COMEBACK20", // Placeholder discount code
        //     discountOffer: "20% off your next 3 months", // Example offer text
        //     resubscribeUrl: `${appConfig.domainUrl}/#pricing`,
        //   });

        //   await sendEmail({
        //     to: userDeleted.email!,
        //     subject: `Regarding your ${appConfig.appName} Subscription`,
        //     html: emailHtml,
        //   });
        //   console.log(`Retention email sent successfully to ${userDeleted.email}.`);
        // } catch (emailError: any) {
        //   console.error(`Failed to send retention email: ${emailError.message}`);
        //   // Do not fail the webhook response due to email error
        // }

        break;
      }

      default:
        console.warn(
          `Received unhandled Stripe event type: "${event.type}". Event ID: ${event.id}.`
        );
    }

    return NextResponse.json({ message: "Stripe webhook event handled successfully." });
  } catch (err) {
    const error = err as Error;
    const message = `Failed to process Stripe webhook: ${error.message}`;
    console.error(message);

    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
