import { Button, Heading, Section, Text } from "@react-email/components";

import { EmailLayout } from "@/components/mails/email-layout";
import { appConfig } from "@/config";

interface OrderConfirmationEmailProps {
  name?: string;
  planName: string;
  planPrice: number;
  orderId: string;
  paymentDate: string;
  isSubscription: boolean;
  dashboardUrl?: string;
}

export function OrderConfirmationEmail({
  name = "there",
  planName,
  planPrice,
  orderId,
  paymentDate,
  isSubscription,
  dashboardUrl = `${appConfig.domainUrl}/dashboard`
}: OrderConfirmationEmailProps) {
  return (
    <EmailLayout previewText={`Your ${appConfig.appName} order confirmation`}>
      <Section className="px-6">
        <Heading className="my-6 text-2xl font-bold text-gray-800">🎉 Order Confirmed!</Heading>

        <Text className="my-4 text-base text-gray-600">Hi {name},</Text>

        <Text className="my-4 text-base text-gray-600">
          Thank you for your {isSubscription ? "subscription" : "purchase"}! Your order has been
          successfully processed and your account has been upgraded.
        </Text>

        <Section className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <Text className="my-2 text-sm font-semibold text-gray-700">Order Details:</Text>
          <Text className="my-1 text-sm text-gray-600">
            <strong>Plan:</strong> {planName}
          </Text>
          <Text className="my-1 text-sm text-gray-600">
            <strong>Amount:</strong> ${planPrice}
          </Text>
          <Text className="my-1 text-sm text-gray-600">
            <strong>Order ID:</strong> {orderId}
          </Text>
          <Text className="my-1 text-sm text-gray-600">
            <strong>Date:</strong> {paymentDate}
          </Text>
          <Text className="my-1 text-sm text-gray-600">
            <strong>Type:</strong> {isSubscription ? "Subscription" : "One-time Payment"}
          </Text>
        </Section>

        <Text className="my-4 text-base text-gray-600">
          Your account has been automatically upgraded with access to all premium features. You can
          start using them right away!
        </Text>

        <Section className="my-8 text-center">
          <Button
            href={dashboardUrl}
            className="rounded-md bg-blue-600 px-6 py-3 text-center font-medium text-white no-underline hover:bg-blue-700"
          >
            Go to Dashboard
          </Button>
        </Section>

        <Text className="my-4 text-base text-gray-600">
          If you have any questions or need assistance, please don't hesitate to reach out to our
          support team.
        </Text>

        <Text className="my-4 text-base text-gray-600">
          Thanks for choosing {appConfig.appName}!
          <br />
          The {appConfig.appName} Team
        </Text>
      </Section>

      <Section className="mt-8 mb-4 text-center">
        <Text className="text-xs text-gray-500">
          This email confirms your recent {isSubscription ? "subscription" : "purchase"}. You can
          manage your account settings in your dashboard.
        </Text>
      </Section>
    </EmailLayout>
  );
}
