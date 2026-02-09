import { Button, Section, Text } from "@react-email/components";

import { appConfig } from "@/config";
import { EmailLayout } from "./email-layout";

interface EmailVerificationProps {
  name?: string;
  verificationUrl: string;
}

export function EmailVerification({ name = "there", verificationUrl }: EmailVerificationProps) {
  return (
    <EmailLayout previewText="Verify your email address">
      <Section className="py-5">
        <Text className="text-lg font-semibold text-gray-900">Hi {name},</Text>

        <Text className="text-gray-700">
          Welcome to {appConfig.appName}! Please verify your email address to complete your
          registration and access your account.
        </Text>

        <Text className="text-gray-700">Click the button below to verify your email address:</Text>

        <Section className="py-5 text-center">
          <Button
            href={verificationUrl}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white no-underline"
          >
            Verify Email Address
          </Button>
        </Section>

        <Text className="text-sm text-gray-500">
          If the button doesn't work, you can copy and paste this link into your browser:
        </Text>

        <Text className="text-sm break-all text-blue-600">{verificationUrl}</Text>

        <Text className="text-sm text-gray-500">
          This verification link will expire in 24 hours. If you didn't create an account with{" "}
          {appConfig.appName}, you can safely ignore this email.
        </Text>
      </Section>
    </EmailLayout>
  );
}
