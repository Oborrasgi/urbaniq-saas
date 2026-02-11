"use client";

import { SectionHeader } from "@/components/section-headers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import Link from "next/link";

const faqItems = [
  {
    id: "item-1",
    question: "¿Qué es UrbanIQ y a quién va dirigido?",
    answer:
      "UrbanIQ es una plataforma SaaS de inteligencia artificial especializada en el sector inmobiliario. Está diseñada para agentes, inversores, promotores y despachos que necesitan captar propietarios, valorar activos y analizar riesgos legales con mayor precisión."
  },
  {
    id: "item-2",
    question: "¿Cómo funciona la valoración automática (AVM)?",
    answer:
      "Nuestro modelo AVM combina datos de mercado, comparables reales y variables urbanísticas para ofrecer un rango de valoración con nivel de confianza. Además, incluye una explicación comprensible para justificar cada estimación."
  },
  {
    id: "item-3",
    question: "¿UrbanIQ analiza riesgos legales del inmueble?",
    answer:
      "Sí. La plataforma identifica posibles cargas registrales, riesgos urbanísticos y alertas jurídicas antes de captar o comercializar un activo, reduciendo incertidumbre y mejorando la toma de decisiones."
  },
  {
    id: "item-4",
    question: "¿Puedo usar UrbanIQ en varias zonas geográficas?",
    answer:
      "Depende del plan contratado. Desde el plan Starter con una zona hasta planes profesionales con múltiples áreas, puedes escalar según tu volumen de operaciones."
  },
  {
    id: "item-5",
    question: "¿Es compatible con mi CRM o herramientas actuales?",
    answer:
      "Los planes avanzados incluyen integraciones y API para conectar UrbanIQ con tu CRM, automatizaciones y herramientas internas, permitiendo flujos de trabajo más eficientes."
  }
];

export default function FAQsTwo() {
  return (
    <SectionHeader className="py-16 md:py-24">
      <SectionHeader.HeaderContent>
        <SectionHeader.Heading>Preguntas frecuentes sobre UrbanIQ</SectionHeader.Heading>
        <SectionHeader.Text>
          Respuestas claras sobre cómo UrbanIQ utiliza inteligencia artificial para mejorar la captación, valoración y análisis inmobiliario.
        </SectionHeader.Text>
      </SectionHeader.HeaderContent>

      <SectionHeader.Content className="mx-auto md:max-w-4xl">
        <Accordion
          type="single"
          collapsible
          className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
        >
          {faqItems.map((item) => (
            <div className="group" key={item.id}>
              <AccordionItem
                value={item.id}
                className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>

                <AccordionContent>
                  <p className="text-base">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>

              <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
            </div>
          ))}
        </Accordion>

        <p className="text-muted-foreground mt-6 px-8 text-center">
          ¿Necesitas más información? Contacta con nuestro{" "}
          <Link href="/contact" className="text-primary font-medium hover:underline">
            equipo de soporte
          </Link>
        </p>
      </SectionHeader.Content>
    </SectionHeader>
  );
}
