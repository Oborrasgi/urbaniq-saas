"use client";

import { ArrowUpRight, Brain, CircleGauge, CodeXml, Rocket, Sparkles } from "lucide-react";

import { MotionDiv } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";
import { Card, CardContent } from "@/components/ui/card";

const featureItemVariants = {
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.1 }
  }),
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export default function BentoGrid() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader>
        <SectionHeader.HeaderContent>
          <SectionHeader.Heading>UrbanIQ Intelligence Engine</SectionHeader.Heading>
          <SectionHeader.Text>
            Una arquitectura de IA diseñada específicamente para captación, valoración y análisis legal inmobiliario.
          </SectionHeader.Text>
        </SectionHeader.HeaderContent>

        <SectionHeader.Content>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 - Main Feature */}
            <MotionDiv
              custom={1}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
              className="col-span-1 lg:col-span-2"
            >
              <Card className="group border-primary/10 bg-background/60 hover:shadow-primary/5 h-full overflow-visible transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-primary text-primary-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <Rocket className="size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex flex-col pt-6">
                    <h3 className="group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                      Motor de detección de intención de venta
                    </h3>

                    <p className="text-muted-foreground mb-10">
                      Modelos predictivos entrenados con datos de mercado, comportamiento histórico y
                      señales digitales para identificar propietarios con alta probabilidad de venta
                      en ventanas de 30–180 días. Prioriza oportunidades antes que la competencia.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-muted-foreground text-sm font-medium">01</span>
                      <ArrowUpRight className="text-primary size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Feature 2 - Different from Feature 1 and Feature 3 */}
            <MotionDiv
              custom={2}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
            >
              <Card className="group from-primary/80 to-primary text-primary-foreground hover:shadow-primary/20 border-0 bg-linear-to-br transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-background text-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <Brain className="text-primary size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex h-full flex-col pt-6">
                    <h3 className="mb-3 text-2xl font-bold">Valoración AVM explicable</h3>
                    <p className="text-primary-foreground/90 mb-6">
                      Genera rangos de valor con nivel de confianza, factores de ajuste y contexto
                      comparativo real. No es un número opaco: es una valoración con explicación
                      técnica y trazabilidad.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-primary-foreground/70 text-sm font-medium">02</span>
                      <ArrowUpRight className="text-background size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Feature 3 */}
            <MotionDiv
              custom={3}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <Card className="group border-primary/10 bg-background/60 hover:shadow-primary/5 h-full overflow-visible transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-primary text-primary-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <Sparkles className="size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex flex-col pt-6">
                    <h3 className="group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                      Análisis legal y urbanístico automatizado
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      Detecta cargas registrales, riesgos urbanísticos y alertas documentales antes
                      de iniciar la comercialización. Reduce incidencias en notaría y mejora la
                      seguridad jurídica de cada operación.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-muted-foreground text-sm font-medium">03</span>
                      <ArrowUpRight className="text-primary size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Feature 4 - Different from Feature 3 */}
            <MotionDiv
              custom={4}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <Card className="group from-secondary/90 to-secondary text-secondary-foreground hover:shadow-secondary/20 h-full bg-linear-to-br transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-primary text-primary-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <CircleGauge className="size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex flex-col pt-6">
                    <h3 className="group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                      Next Best Action con IA
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      La plataforma recomienda automáticamente el siguiente paso óptimo para cada
                      lead según probabilidad de conversión, perfil del activo y momento de venta.
                      Automatiza decisiones estratégicas en captación.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-muted-foreground text-sm font-medium">04</span>
                      <ArrowUpRight className="text-primary size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Feature 5 */}
            <MotionDiv
              custom={5}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <Card className="group border-primary/10 bg-background/60 hover:shadow-primary/5 h-full overflow-visible transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-primary text-primary-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <CodeXml className="size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex flex-col pt-6">
                    <h3 className="group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                      Arquitectura segura y compliance integrado
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      Infraestructura preparada para RGPD, control de accesos por roles y
                      trazabilidad completa de datos. Diseñado para operar en entornos
                      profesionales y despachos jurídicos.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-muted-foreground text-sm font-medium">05</span>
                      <ArrowUpRight className="text-primary size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          </div>
        </SectionHeader.Content>
      </SectionHeader>
    </MotionDiv>
  );
}
