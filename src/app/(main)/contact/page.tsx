import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact | Next.js SaaS Starter Kit Boilerplate",
  canonicalUrlRelative: "/contact"
});

export default function ContactPage() {
  return (
    <main className="container py-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Get in Touch</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </section>

        <section className="mx-auto max-w-3xl">
          <Card className="lg:col-span-2">
            <CardHeader className="mb-2">
              <CardTitle>Send us a message</CardTitle>

              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
