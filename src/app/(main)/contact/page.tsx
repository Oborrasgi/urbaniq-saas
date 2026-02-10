import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contacto | Urbaniq",
  description: "Contacta con el equipo de Urbaniq para consultas legales, inmobiliarias o sobre nuestra plataforma de IA.",
  canonicalUrlRelative: "/contact"
});

export default function ContactPage() {
  return (
    <main className="container py-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Hablemos</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            ¿Tienes una consulta legal, inmobiliaria o quieres saber cómo Urbaniq puede ayudarte con IA y análisis avanzado? Escríbenos y te responderemos personalmente.
          </p>
        </section>

        <section className="mx-auto max-w-3xl">
          <Card className="lg:col-span-2">
            <CardHeader className="mb-2">
              <CardTitle>Formulario de contacto</CardTitle>

              <CardDescription>
                Cuéntanos brevemente tu caso o necesidad. Nuestro equipo revisará tu mensaje y te responderá lo antes posible.
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
