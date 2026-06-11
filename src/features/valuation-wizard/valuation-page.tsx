import React from "react";
import { CheckCircle2, LockKeyhole, Sparkles } from "lucide-react";

import { cityNameFromSlug } from "./slug";
import { ValuationWizard } from "./valuation-wizard";

type ValuationPageProps = {
  citySlug: string;
  provinceSlug: string;
};

export function ValuationPage({ citySlug, provinceSlug }: ValuationPageProps) {
  const city = cityNameFromSlug(citySlug);
  const province = cityNameFromSlug(provinceSlug);

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <section className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_460px] lg:items-start">
        <div className="space-y-8 pt-4 lg:pt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2F80ED]/20 bg-[#2F80ED]/10 px-4 py-2 text-sm font-medium text-[#1E5FBF]">
            <Sparkles className="size-4" aria-hidden="true" />
            Valoración orientativa UrbanIQ en 24h
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Descubre el valor de tu vivienda en {city} sin llamadas comerciales.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Completa el wizard de 3 pasos y recibe una estimación orientativa con datos protegidos
              RGPD. Si autorizas contacto, un agente colegiado de la red UrbanIQ podrá ampliar
              datos.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Datos protegidos", "Tratamiento limitado a tu solicitud."],
              ["Respuesta en 24h", "Email automático con valoración orientativa."],
              ["Sin compromiso", "Puedes retirar tu consentimiento cuando quieras."]
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-3xl border bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <CheckCircle2 className="mb-3 size-5 text-[#2F80ED]" aria-hidden="true" />
                <h2 className="font-semibold text-slate-950 dark:text-white">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <LockKeyhole className="mb-2 size-5 text-[#7C3AED]" aria-hidden="true" />
            Por qué valorar: UrbanIQ combina señales inmobiliarias, contexto local y revisión de
            datos para orientar tu decisión antes de vender, heredar o planificar.
          </div>
        </div>

        <ValuationWizard city={city} province={province} />
      </section>
    </main>
  );
}
