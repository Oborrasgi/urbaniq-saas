"use client";

import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Home, MapPin, Send } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { StickySubmitCta } from "./sticky-submit-cta";
import { TrustReminderBadge } from "./trust-reminder-badge";
import { WhatHappensNext } from "./what-happens-next";

type ValuationWizardProps = {
  city: string;
  province: string;
};

type FormState = {
  address: string;
  propertyType: string;
  urgency: string;
  reason: string;
  name: string;
  phone: string;
  email: string;
  contactConsent: boolean;
  privacyConsent: boolean;
};

const initialFormState: FormState = {
  address: "",
  propertyType: "piso",
  urgency: "30-90",
  reason: "venta",
  name: "",
  phone: "",
  email: "",
  contactConsent: false,
  privacyConsent: false
};

const totalSteps = 3;

export function ValuationWizard({ city, province }: ValuationWizardProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const submitEnabled = Boolean(
    form.privacyConsent && form.name.trim().length >= 2 && form.phone.trim().length >= 6
  );

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submitValuation() {
    if (!submitEnabled || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitValuation();
  }

  return (
    <Card className="relative overflow-hidden border-slate-200/80 bg-white/90 shadow-2xl shadow-slate-950/10 backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
      <CardHeader className="gap-4 border-b border-slate-100 dark:border-white/10">
        <TrustReminderBadge />

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4 text-sm font-medium text-slate-500">
            <span>Paso {step}/3</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#2F80ED] to-violet-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <CardTitle className="text-2xl tracking-tight text-slate-950 dark:text-white">
            Valora tu vivienda en {city}
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            Wizard de 3 pasos para recibir una valoración orientativa sin compromiso.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {submitted ? (
          <div className="space-y-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100">
            <CheckCircle2 className="size-10" aria-hidden="true" />
            <h2 className="text-xl font-semibold">Solicitud recibida</h2>
            <p className="text-sm leading-6">
              Te enviaremos la valoración orientativa de UrbanIQ para {city} en 24h. Solo se
              activará contacto telefónico si has autorizado ese canal.
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-5" data-testid="valuation-step-1">
                <div className="rounded-2xl bg-[#2F80ED]/10 p-4 text-sm text-slate-700 dark:text-slate-200">
                  <MapPin className="mb-2 size-5 text-[#2F80ED]" aria-hidden="true" />
                  Estás valorando en {city}, {province}. Puedes indicar calle o zona aproximada.
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección o zona</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(event) => updateForm("address", event.target.value)}
                    placeholder={`Ej. Calle principal, ${city}`}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Tipo de inmueble</Label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["piso", "Piso"],
                      ["casa", "Casa"],
                      ["atico", "Ático"]
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateForm("propertyType", value)}
                        className={cn(
                          "rounded-2xl border p-4 text-left text-sm font-medium transition-colors",
                          form.propertyType === value
                            ? "border-[#2F80ED] bg-[#2F80ED]/10 text-[#1E5FBF]"
                            : "border-slate-200 hover:border-[#2F80ED]/60 dark:border-white/10"
                        )}
                      >
                        <Home className="mb-2 size-5" aria-hidden="true" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5" data-testid="valuation-step-2">
                <div className="space-y-3">
                  <Label>Motivo de la valoración</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {["Venta", "Herencia", "Separación", "Curiosidad"].map((reason) => (
                      <button
                        key={reason}
                        type="button"
                        onClick={() => updateForm("reason", reason.toLowerCase())}
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                          form.reason === reason.toLowerCase()
                            ? "border-[#2F80ED] bg-[#2F80ED]/10 text-[#1E5FBF]"
                            : "border-slate-200 hover:border-[#2F80ED]/60 dark:border-white/10"
                        )}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Urgencia estimada</Label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["0-30", "0-30 días", "border-red-200 bg-red-50 text-red-700"],
                      ["30-90", "30-90 días", "border-amber-200 bg-amber-50 text-amber-700"],
                      [
                        "sin-prisa",
                        "Sin prisa",
                        "border-emerald-200 bg-emerald-50 text-emerald-700"
                      ]
                    ].map(([value, label, color]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateForm("urgency", value)}
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-transform hover:scale-[1.01]",
                          color,
                          form.urgency === value ? "ring-2 ring-[#2F80ED]/30" : "opacity-80"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5" data-testid="valuation-step-3">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(event) => updateForm("name", event.target.value)}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(event) => updateForm("phone", event.target.value)}
                      placeholder="600 000 000"
                      inputMode="tel"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-200 p-4 text-sm leading-6 dark:border-white/10">
                  <label className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={form.privacyConsent}
                      onChange={(event) => updateForm("privacyConsent", event.target.checked)}
                      className="mt-1 size-4 accent-[#2F80ED]"
                    />
                    <span>
                      Acepto que UrbanIQ trate mis datos para gestionar esta solicitud de valoración
                      conforme al RGPD art. 6.1.a.
                    </span>
                  </label>
                  <label className="flex gap-3 text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={form.contactConsent}
                      onChange={(event) => updateForm("contactConsent", event.target.checked)}
                      className="mt-1 size-4 accent-[#2F80ED]"
                    />
                    <span>
                      Autorizo contacto telefónico para confirmar y ampliar datos de la valoración.
                    </span>
                  </label>
                </div>

                <WhatHappensNext city={city} />

                <Button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={!submitEnabled || isSubmitting}
                  className="w-full rounded-2xl bg-linear-to-r from-[#2F80ED] to-violet-600 py-6 text-base font-semibold shadow-lg"
                >
                  <Send className="size-4" aria-hidden="true" />
                  {isSubmitting ? "Enviando valoración..." : "Enviar y recibir valoración en 24h"}
                </Button>

                <StickySubmitCta
                  enabled={submitEnabled}
                  isSubmitting={isSubmitting}
                  submitRef={submitButtonRef}
                  onSubmit={submitValuation}
                />
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
              <Button
                type="button"
                variant="outline"
                disabled={step === 1}
                onClick={() => setStep((current) => Math.max(1, current - 1))}
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Atrás
              </Button>

              {step < totalSteps && (
                <Button
                  type="button"
                  onClick={() => setStep((current) => Math.min(totalSteps, current + 1))}
                  className="bg-[#2F80ED] hover:bg-[#256ed0]"
                >
                  Continuar
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
