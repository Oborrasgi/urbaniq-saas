import { Section, Text } from "@react-email/components";

import { EmailLayout } from "./email-layout";

interface ContactSubmissionProps {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSubmission({
  firstName,
  lastName,
  email,
  subject,
  message
}: ContactSubmissionProps) {
  return (
    <EmailLayout previewText="Contact Form Submission">
      <Section className="py-5">
        <Text className="text-lg font-semibold text-gray-900">New Contact Form Submission</Text>

        <Text className="text-gray-700">
          You have received a new message from your contact form.
        </Text>

        <Section className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <Text className="m-0 mb-3 text-sm font-semibold text-gray-900">Contact Details</Text>

          <Section className="mb-2">
            <Text className="m-0 text-xs font-medium text-gray-500">Name</Text>
            <Text className="m-0 mt-1 text-sm text-gray-900">
              {firstName} {lastName}
            </Text>
          </Section>

          <Section className="mb-2">
            <Text className="m-0 text-xs font-medium text-gray-500">Email</Text>
            <Text className="m-0 mt-1 text-sm text-blue-600">{email}</Text>
          </Section>

          <Section className="mb-2">
            <Text className="m-0 text-xs font-medium text-gray-500">Subject</Text>
            <Text className="m-0 mt-1 text-sm text-gray-900">{subject}</Text>
          </Section>

          <Section>
            <Text className="m-0 text-xs font-medium text-gray-500">Message</Text>
            <Text className="m-0 mt-1 text-sm whitespace-pre-wrap text-gray-900">{message}</Text>
          </Section>
        </Section>

        <Text className="mt-4 text-sm text-gray-500">
          Please respond to this inquiry at your earliest convenience.
        </Text>
      </Section>
    </EmailLayout>
  );
}
