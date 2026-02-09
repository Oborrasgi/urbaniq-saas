import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service | Next.js SaaS Starter Kit Boilerplate",
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
          {`Thank you for visiting SaasPilot ("we," "us," or "our"). This Terms of Service outlines how we collect, use, and protect your personal and non-personal information when you use our website located at https://saaspilot.com (the "Website").

By accessing or using the Website, you agree to these Terms of Service. If you do not agree, please do not use the Website.

1. Information We Collect

1.1 Personal Information
We collect the following types of personal data:

Name – Used to personalize your experience and for communication.
Email Address – Used for updates, order confirmations, and communication.
Payment Details – Collected to process your purchases securely. Note: We do not store payment data. All transactions are processed through secure third-party providers.

1.2 Non-Personal Information
We may collect non-personal data using cookies and similar technologies. This may include:
IP address
Browser type
Device data
Browsing behavior

This helps us improve site performance, analyze usage trends, and enhance user experience.

2. How We Use Your Data
We use your information strictly for the following purposes:

Fulfilling and managing your orders
Sending order confirmations and updates
Providing customer support
Improving our services and communication

3. Data Sharing Policy
We do not sell, rent, or trade your personal information.

Your data may be shared only with trusted third parties for the purpose of order processing (e.g., payment processors).

4. Children's Privacy
The Website is not intended for children under 13 years of age.

We do not knowingly collect personal data from children. If you believe your child has submitted information to us, please contact us immediately.

5. Changes to This Policy
We may update these Terms of Service periodically. Changes will be posted on this page. For significant updates, we may notify you by email.

6. Contact Us
For questions, concerns, or requests related to this Terms of Service:

Email: support@saaspilot.com
For other inquiries, please visit the Contact Us page on our Website.

By using SaasPilot acknowledge and agree to the terms outlined in this document.

`}
        </pre>
      </div>
    </main>
  );
}
