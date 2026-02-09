import { Button, Heading, Section, Text } from "@react-email/components";

import { EmailLayout } from "@/components/mails/email-layout";
import { appConfig } from "@/config";

interface RetentionOfferEmailProps {
  name?: string;
  discountCode: string;
  discountOffer: string; // e.g., "20% off for 3 months"
  resubscribeUrl?: string; // Direct link to upgrade/resubscribe page
}

export function RetentionOfferEmail({
  name = "there",
  discountCode,
  discountOffer,
  resubscribeUrl = `${appConfig.domainUrl}/#pricing` // Default to pricing section
}: RetentionOfferEmailProps) {
  return (
    <EmailLayout previewText={`Regarding your ${appConfig.appName} subscription`}>
      <Section className="px-6">
        <Heading className="my-6 text-2xl font-bold text-gray-800">
          Following Up on Your {appConfig.appName} Subscription
        </Heading>

        <Text className="my-4 text-base text-gray-600">Hi {name},</Text>

        <Text className="my-4 text-base text-gray-600">
          We saw that you recently canceled your premium subscription for {appConfig.appName}. We
          hope everything was okay during your time with us.
        </Text>

        <Text className="my-4 text-base text-gray-600">
          We're always looking to improve. If you have a moment, we'd greatly appreciate any
          feedback on why you decided to cancel. Simply reply to this email – we read every
          response.
        </Text>

        <Text className="my-4 text-base text-gray-600">
          If you reconsider, we'd love to have you back. As a thank you for being a past customer,
          feel free to use the code <strong className="font-semibold">{discountCode}</strong> for{" "}
          {discountOffer} on any plan.
        </Text>

        <Section className="my-8 text-center">
          <Button
            href={resubscribeUrl} // Link to pricing or upgrade page
            className="rounded-md bg-blue-600 px-6 py-3 text-center font-medium text-white no-underline hover:bg-blue-700"
          >
            View Plans
          </Button>
        </Section>

        <Text className="my-4 text-base text-gray-600">
          Thanks,
          <br />
          The {appConfig.appName} Team
        </Text>
      </Section>

      <Section className="mt-8 mb-4 text-center">
        <Text className="text-xs text-gray-500">
          You received this email because you recently canceled your subscription.
        </Text>
      </Section>
    </EmailLayout>
  );
}
