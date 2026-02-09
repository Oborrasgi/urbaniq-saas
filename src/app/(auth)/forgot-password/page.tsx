import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthFooter, ForgotPasswordForm } from "@/components/forms/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Recuperar contraseña | Plataforma IA Inmobiliaria",
  canonicalUrlRelative: "/forgot-password"
});

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center py-6">
      <div>
        <div className="container flex justify-center">
          <div className="bg-card rounded-2xl border p-6 sm:w-lg lg:p-8">
            <Suspense>
              <ForgotPasswordForm />
            </Suspense>
          </div>
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}
