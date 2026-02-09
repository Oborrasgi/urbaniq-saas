import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from "@react-email/components";
import type { PropsWithChildren } from "react";

import { appConfig } from "@/config";

interface EmailLayoutProps extends PropsWithChildren {
  previewText: string;
}

export function EmailLayout({ previewText, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 py-6 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-xl bg-white p-5">
            <Section className="py-5 text-center">
              <Text className="m-0 text-2xl font-bold text-blue-600">{appConfig.appName}</Text>
            </Section>

            {children}

            <Hr className="my-5 border-gray-200" />

            <Section className="text-xs leading-4 text-gray-500">
              <Text className="text-center">
                &copy; {new Date().getFullYear()} {appConfig.appName}. All rights reserved.
              </Text>

              <Text className="text-center">
                If you have any questions, please contact us at{" "}
                <Link
                  href={`mailto:${appConfig.resend.supportEmail}`}
                  className="text-blue-600 underline"
                >
                  {appConfig.resend.supportEmail}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
