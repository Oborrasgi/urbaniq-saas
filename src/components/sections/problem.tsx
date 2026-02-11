import { MotionDiv } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";
import { Accessibility, Lightbulb, Zap, ZoomIn } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "Captación ineficiente",
    description:
      "Muchos agentes dependen de portales o contactos reactivos. UrbanIQ identifica intención de venta antes de que el propietario publique."
  },
  {
    icon: Lightbulb,
    title: "Valoraciones poco precisas",
    description:
      "Los AVM tradicionales ofrecen cifras opacas. UrbanIQ genera rangos con nivel de confianza y explicación basada en datos reales."
  },
  {
    icon: ZoomIn,
    title: "Riesgo legal oculto",
    description:
      "Cargas, afecciones urbanísticas o documentación incompleta pueden frenar una operación. Detectamos alertas antes de captar o vender."
  },
  {
    icon: Accessibility,
    title: "Falta de priorización de leads",
    description:
      "No todos los propietarios están listos para vender. UrbanIQ predice probabilidad 30/60/90/180 días y recomienda la siguiente acción óptima."
  }
];

export default function Problem() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader>
        <SectionHeader.HeaderContent>
          <SectionHeader.Heading>Los problemas reales del sector inmobiliario</SectionHeader.Heading>
          <SectionHeader.Text>
            El mercado inmobiliario está lleno de fricciones: captación incierta, valoraciones imprecisas y riesgos legales ocultos. <br /> UrbanIQ transforma esos problemas en decisiones basadas en inteligencia artificial.
          </SectionHeader.Text>
        </SectionHeader.HeaderContent>

        <SectionHeader.Content>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {problems.map((feature, index) => (
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: true }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 * index }}
                key={index}
                className="relative flex items-center gap-4 rounded-lg border-dashed md:block md:border-l md:p-5"
              >
                <span className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-md md:mb-8 md:size-12">
                  <feature.icon className="text-primary size-5 md:size-6" />
                </span>

                <div>
                  <h3 className="text-lg font-semibold md:text-xl">
                    {feature.title}
                    <span className="bg-primary absolute -left-px hidden h-6 w-px md:inline-block" />
                  </h3>

                  <p className="text-muted-foreground mt-2 text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </SectionHeader.Content>
      </SectionHeader>
    </MotionDiv>
  );
}
