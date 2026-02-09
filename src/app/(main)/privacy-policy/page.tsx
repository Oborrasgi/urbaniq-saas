import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy | Next.js SaaS Starter Kit Boilerplate",
  canonicalUrlRelative: "/privacy-policy"
});

export default function PrivacyPolicy() {
  return (
    <main>
      <div className="relative overflow-hidden py-20 sm:py-32">
        <div className="bg-primary absolute top-0 left-1/4 z-10 h-1/3 w-1/3 scale-125 transform opacity-30 blur-[200px]" />
        <div className="bg-secondary absolute right-1/4 bottom-0 z-10 h-1/3 w-1/3 scale-125 transform opacity-30 blur-[200px]" />

        <div className="relative z-20 container max-w-3xl">
          <div className="text-balance">
            <h1 className="text-center text-4xl font-extrabold sm:text-5xl">Privacy Policy</h1>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-12">
        <p className="mb-4">
          Last Updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </p>

        <pre className="text-muted-foreground font-sans leading-relaxed whitespace-pre-wrap">
          {`This Privacy Policy explains how SaasPilot ("we," "us," or "our") collects, uses, and protects your personal and non-personal information when you use our website located at https://saaspilot.com (the “Website”).

By accessing or using the Website, you consent to the practices described in this Privacy Policy.

1. Information We Collect

1.1 Personal Information
When you use our Website or purchase our products, we may collect:

Name – Used to personalize communication and manage your account.
Email Address – Used for sending updates, order details, and customer support.
Payment Information – Collected through secure third-party payment processors. We do not store payment information on our servers.

1.2 Non-Personal Information
We collect non-personal data via cookies and similar technologies, including:

Browser type
Device information
IP address
Usage patterns

This helps us analyze trends, improve our services, and enhance user experience.

2. How We Use Your Information
We use the collected data for the following purposes:

Processing and fulfilling your orders
Sending confirmation emails and updates
Providing customer support
Improving website performance and service quality
Communicating important product or policy changes

3. Data Sharing and Third Parties
We do not sell, rent, or trade your personal information.

We may share your information only with trusted service providers necessary to:

Process payments
Deliver product updates
Improve user experience

All third-party partners are required to protect your information and comply with relevant data protection laws.

4. Data Security
We implement appropriate technical and organizational measures to protect your data. Sensitive information is transmitted over secure connections and stored with strong access controls.

5. Your Rights
If you are a resident of the EU or a region with similar data laws, you may:

Request access to your personal data
Request correction or deletion of your data
Object to or restrict our processing of your data
Withdraw consent at any time

To exercise these rights, contact us at support@saaspilot.com.

6. Cookies
Cookies help us personalize your experience and collect anonymous usage data. You can control or disable cookies through your browser settings.

7. Children's Privacy
The Website is not directed at children under 13. We do not knowingly collect data from children. If you believe your child has provided personal data, contact us to have it removed.

8. Changes to This Policy
We may update this Privacy Policy to reflect changes in our practices or legal requirements. Updates will be posted here, and users may be notified via email for significant changes.

9. Contact
If you have questions or requests related to this Privacy Policy, reach out at:

Email: support@saaspilot.com

By using SaasPilot, you agree to the terms outlined in this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
}
