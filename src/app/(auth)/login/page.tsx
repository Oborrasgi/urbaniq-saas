import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthFooter, LoginForm } from "@/components/forms/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Acceso | Plataforma IA Inmobiliaria",
  canonicalUrlRelative: "/login"
});

export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center py-6">
      <div>
        <div className="container flex justify-center">
          <div className="bg-card rounded-2xl border p-6 sm:w-lg lg:p-8">
            <div>
              <h1 className="text-center text-xl font-bold md:text-2xl">Accede a tu cuenta</h1>

              <p className="text-muted-foreground mt-1 mb-6 text-center">
                Introduce tus credenciales para acceder a la plataforma.
              </p>

              <Suspense>
                <LoginForm />
              </Suspense>

              <p className="text-muted-foreground mt-6 px-8 text-center text-sm">
                ¿Aún no tienes cuenta?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-brand underline underline-offset-4"
                >
                  Crear cuenta
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
