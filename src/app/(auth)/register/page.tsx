import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthFooter, RegisterForm } from "@/components/forms/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Register | Next.js SaaS Starter Kit Boilerplate",
  canonicalUrlRelative: "/register"
});

export default function Register() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center py-6">
      <div>
        <div className="container flex justify-center">
          <div className="bg-card w-full rounded-2xl border p-6 sm:w-lg lg:p-8">
            <div>
              <h1 className="text-center text-xl font-bold md:text-2xl">Create an account</h1>

              <p className="text-muted-foreground mt-1 mb-6 text-center">
                Enter your email below to create your account
              </p>

              <Suspense>
                <RegisterForm />
              </Suspense>

              <p className="text-muted-foreground mt-6 px-8 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-brand underline underline-offset-4"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}
