import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy | Urbaniq SaaS Platform",
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
          {`This Privacy Policy describes how Urbaniq ("we," "us," or "our") collects, uses, and safeguards your personal and non-personal information in connection with your use of our SaaS platform accessible via https://urbaniq.com (the “Platform”).

By accessing or using the Platform, you acknowledge and agree to the terms set forth in this Privacy Policy.

1. Information We Collect

1.1 Personal Information
When you register, subscribe, or interact with our Platform, we may collect:

Full Name – To personalize your experience and manage your account.
Email Address – For communications including service updates, billing, and support.
Payment Details – Processed securely through third-party payment gateways; we do not store your payment information on our servers.

1.2 Non-Personal Information
We gather non-identifiable data through cookies and similar technologies, such as:

Device and browser type
IP address
Usage analytics and interaction patterns

This data helps us optimize service delivery and enhance user experience.

2. Use of Information
Your information is utilized to:

Provide and maintain the Platform services
Process transactions and deliver billing information
Respond to customer inquiries and support requests
Improve Platform functionality and security
Notify users about updates, changes, or important notices

3. Disclosure to Third Parties
We do not sell or lease your personal data. Disclosure is limited to trusted service providers who assist in:

Payment processing
Service delivery and maintenance
Data analytics and platform improvement

All third-party partners are contractually obligated to maintain confidentiality and comply with applicable data protection regulations.

4. Data Security
We employ industry-standard security measures, including encryption and access controls, to protect your data against unauthorized access, alteration, or disclosure.

5. Your Rights
Depending on your jurisdiction, you may have rights including:

Accessing your personal data
Requesting correction or deletion
Restricting or objecting to processing
Withdrawing consent at any time

To exercise these rights, please contact us at privacy@urbaniq.com.

6. Cookies and Tracking
Cookies enhance your experience and allow us to collect anonymous usage data. You can manage cookie preferences via your browser settings.

7. Children's Privacy
Our Platform is not intended for individuals under 13 years of age. We do not knowingly collect personal data from children. If you believe we have collected such data, please contact us for removal.

8. Changes to This Privacy Policy
We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. Updates will be posted on this page, and significant changes may be communicated via email.

9. Contact Information
For questions or concerns regarding this Privacy Policy, please contact:

Email: privacy@urbaniq.com

By using Urbaniq, you consent to the terms outlined in this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
}
