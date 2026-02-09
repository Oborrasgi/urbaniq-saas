"use client";

import { useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { MotionDiv } from "@/components/motion-elements";

import firstPreview from "@/public/images/demo-1.svg";
import secondPreview from "@/public/images/demo-2.svg";
import thirdPreview from "@/public/images/demo-3.svg";

const processSteps = [
  {
    number: "01",
    title: "Captación inteligente",
    description: "El propietario o inversor interactúa con UrbanIQ. La IA recopila datos del inmueble, contexto legal y señales de intención."
  },
  {
    number: "02",
    title: "Valoración y análisis legal",
    description: "Generamos una valoración con rango y confianza, junto con un primer análisis jurídico y urbanístico automatizado."
  },
  {
    number: "03",
    title: "Scoring y priorización",
    description: "UrbanIQ calcula el Property Health Score y la probabilidad de venta para priorizar oportunidades reales."
  },
  {
    number: "04",
    title: "Activación y distribución",
    description: "El lead se activa con acciones recomendadas o se distribuye a partners verificados bajo SLA y exclusividad."
  }
];

export default function Process() {
  const listContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listContainerRef,
    offset: ["start 0.9", "end 0.6"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <MotionDiv
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl space-y-3 pb-12 text-center md:pb-16"
        >
          <h3 className="text-3xl font-bold sm:text-4xl">Cómo funciona UrbanIQ</h3>
          <p className="text-muted-foreground">
            Un flujo claro para captar, analizar y decidir con inteligencia artificial inmobiliaria.
          </p>
        </MotionDiv>

        <div className="dark:bg-muted/20 bg-muted relative overflow-hidden rounded-3xl p-8 md:p-12 lg:p-14">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-[140px]">
            <div ref={listContainerRef} className="relative flex flex-col gap-8">
              <MotionDiv
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-6 left-6 h-[calc(100%-125px)] w-1 -translate-x-1/2"
              >
                <div className="h-full w-full rounded-full bg-black/10 dark:bg-white/10" />

                <MotionDiv
                  style={{ height: lineHeight }}
                  className="bg-primary absolute inset-x-0 top-0 origin-top rounded-full"
                />
              </MotionDiv>

              {processSteps.map((step, index) => (
                <MotionDiv
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 }}
                  key={step.number}
                  className="flex items-start gap-6"
                >
                  <div className="bg-primary z-10 flex size-12 shrink-0 items-center justify-center rounded-full text-xl font-bold tracking-tight text-white">
                    {step.number}
                  </div>

                  <div className="flex max-w-[390px] flex-col gap-1">
                    <h5 className="text-xl leading-loose font-medium">{step.title}</h5>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            <div className="space-y-1">
              <div className="flex h-min w-full items-end gap-1">
                <MotionDiv
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -20, scale: 1.05 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                  className="relative size-full"
                >
                  <Image
                    src={firstPreview}
                    alt="UrbanIQ dashboard overview"
                    className="size-full object-cover"
                  />
                </MotionDiv>

                <MotionDiv
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: 20, scale: 1.05 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                  className="relative size-full"
                >
                  <Image
                    src={secondPreview}
                    alt="UrbanIQ valuation and legal analysis"
                    className="size-full object-cover"
                  />
                </MotionDiv>
              </div>

              <MotionDiv
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 30, scale: 1.05 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeInOut" }}
                className="flex items-center ps-10"
              >
                <Image
                  src={thirdPreview}
                  alt="UrbanIQ lead scoring and activation"
                  className="h-full w-full object-cover"
                />
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
