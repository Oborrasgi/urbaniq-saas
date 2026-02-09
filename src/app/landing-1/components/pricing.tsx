"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { MotionDiv, MotionSpan } from "@/components/motion-elements";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Para explorar UrbanIQ y entender el valor de la IA inmobiliaria.",
    features: [
      "Acceso limitado a IA de captación",
      "Valoración orientativa (AVM básico)",
      "Análisis legal simplificado",
      "1 zona geográfica",
      "Soporte comunitario"
    ],
    highlighted: false,
    cta: "Empezar gratis"
  },
  {
    name: "Pro",
    monthlyPrice: 59,
    yearlyPrice: 590,
    description: "Para agentes e inversores que necesitan decisiones fiables.",
    features: [
      "IA avanzada de captación de propietarios",
      "Valoración AVM con rango y confianza",
      "Análisis legal automatizado",
      "Historial y scoring de leads",
      "Hasta 5 zonas geográficas"
    ],
    highlighted: true,
    cta: "Probar UrbanIQ Pro"
  },
  {
    name: "Business",
    monthlyPrice: 129,
    yearlyPrice: 1290,
    description: "Para equipos inmobiliarios y despachos profesionales.",
    features: [
      "Todo lo incluido en Pro",
      "Predicción de intención de venta",
      "Distribución de leads con exclusividad",
      "Panel multiusuario",
      "Integraciones y API"
    ],
    highlighted: false,
    cta: "Hablar con ventas"
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <MotionDiv
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl space-y-3 pb-12 text-center md:pb-16"
        >
          <h3 className="text-3xl font-bold sm:text-4xl">
            Planes diseñados para el sector inmobiliario
          </h3>
          <p className="text-muted-foreground">
            Escala desde validación inicial hasta operaciones profesionales con IA.
          </p>

          <div className="flex items-center justify-center gap-3 pt-6">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !isYearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Mensual
            </span>

            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="h-5 w-9 **:data-[slot=switch-thumb]:data-[state=checked]:translate-x-[calc(100%+1px)] **:data-[slot=switch-thumb]:data-[state=unchecked]:translate-x-0.5"
            />

            <span
              className={cn(
                "text-sm font-medium transition-colors",
                isYearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Anual <span className="text-primary">(–2 meses)</span>
            </span>
          </div>
        </MotionDiv>

        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <MotionDiv
              key={plan.name}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1
              }}
              className={cn(
                "relative rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md",
                plan.highlighted
                  ? "border-primary from-primary/10 to-primary/5 bg-linear-to-br"
                  : "bg-card"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium">
                    Más elegido
                  </span>
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold">{plan.name}</h4>

                  <div className="flex items-baseline gap-1">
                    <MotionSpan
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="text-4xl font-bold"
                    >
                      €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </MotionSpan>

                    <MotionSpan
                      key={isYearly ? "year" : "month"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
                      className="text-muted-foreground text-base"
                    >
                      /{isYearly ? "año" : "mes"}
                    </MotionSpan>
                  </div>

                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <Button
                  className={cn(
                    "w-full",
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-5 pt-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="text-primary mt-0.5 size-4 shrink-0" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
