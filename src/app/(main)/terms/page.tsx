import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service | Urbaniq SaaS Platform",
  canonicalUrlRelative: "/terms"
});

export default function Terms() {
  return (
    <main>
      <div className="relative overflow-hidden py-20 sm:py-32">
        <div className="bg-primary absolute top-0 left-1/4 z-10 h-1/3 w-1/3 scale-125 transform opacity-30 blur-[200px]" />
        <div className="bg-secondary absolute right-1/4 bottom-0 z-10 h-1/3 w-1/3 scale-125 transform opacity-30 blur-[200px]" />

        <div className="relative z-20 container max-w-3xl">
          <div className="text-balance">
            <h1 className="text-center text-4xl font-extrabold sm:text-5xl">Terms of Service</h1>
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
          {`Welcome to Urbaniq ("we," "us," or "our"). These Terms of Service govern your use of our SaaS platform, accessible via https://urbaniq.com (the "Platform"). By accessing or using the Platform, you agree to these Terms. Please read them carefully.

1. Acceptance of Terms
By registering for or using the Platform, you agree to comply with and be bound by these Terms, as well as any additional guidelines or rules posted on the Platform.

2. Description of Service
Urbaniq provides a cloud-based software solution designed to assist real estate and legal professionals in managing transactions, documentation, and compliance processes efficiently.

3. User Accounts
To access certain features, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.

4. Subscriptions & Payments
Access to the Platform may require a subscription. Payment terms, billing cycles, and refund policies are detailed in your subscription agreement. Failure to pay may result in suspension or termination of your access.

5. Use of the Platform
You agree to use the Platform only for lawful purposes and in accordance with these Terms. Prohibited activities include unauthorized access, data mining, reverse engineering, or any action that disrupts the Platform’s operation.

6. Intellectual Property
All content, software, trademarks, and technology on the Platform are the property of Urbaniq or its licensors. You are granted a limited, non-exclusive license to use the Platform in accordance with these Terms.

7. Limitation of Liability
To the maximum extent permitted by law, Urbaniq shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the Platform. Our total liability is limited to the amount paid by you for the subscription during the twelve months preceding the claim.

8. Termination
We may suspend or terminate your access at any time for violations of these Terms or for other legitimate reasons. Upon termination, your right to use the Platform ceases immediately.

9. Governing Law
These Terms shall be governed by and construed in accordance with the laws of the European Union and Spain, without regard to conflict of law principles.

10. Changes to Terms
We reserve the right to update these Terms periodically. Changes will be posted on this page with an updated effective date. Continued use of the Platform after changes constitutes acceptance.

11. Contact
For any questions or concerns regarding these Terms, please contact us at:

Email: legal@urbaniq.com

Thank you for choosing Urbaniq. We are committed to providing you with a secure and efficient platform to support your real estate and legal technology needs.
`}
        </pre>
      </div>
    </main>
  );
}
