import { Code2, Palette, Sparkles, Zap } from "lucide-react";
import Image from "next/image";

import { MotionDiv } from "@/components/motion-elements";

export default function Features() {
  return (
    <section id="features" className="container mx-auto max-w-7xl py-14 md:py-20">
      <MotionDiv
        viewport={{ once: true }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto max-w-4xl space-y-3 pb-12 text-center md:pb-16"
      >
        <h3 className="text-3xl font-bold sm:text-4xl">AI Intelligence for Real Estate Decisions</h3>

        <p className="text-muted-foreground">
          Captación, valoración y análisis legal automatizado para tomar mejores decisiones inmobiliarias con IA.
        </p>
      </MotionDiv>

      <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <MotionDiv
          viewport={{ once: true }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="bg-primary absolute top-1/2 left-1/2 aspect-square h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 filter-[blur(100px)]"
        />

        <div className="space-y-6 self-center md:space-y-8">
          <FeatureCard
            icon={<Sparkles className="text-primary size-6" />}
            title="Captación Inteligente de Propietarios"
            description="Detecta intención de venta, perfila propietarios y prioriza leads mediante modelos de IA entrenados en datos inmobiliarios reales."
          />

          <FeatureCard
            icon={<Code2 className="text-primary size-6" />}
            title="Valoración Automática Explicable (AVM)"
            description="Obtén rangos de valor con nivel de confianza y explicación clara basada en mercado, comparables y contexto legal."
          />
        </div>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative h-[500px] w-full">
            <Image
              fill
              priority
              src="/app-1.png"
              alt="AI Image Generation Interface"
              className="relative z-10 object-contain drop-shadow-2xl"
            />
          </div>
        </MotionDiv>

        <div className="space-y-6 self-center md:space-y-8">
          <FeatureCard
            icon={<Palette className="text-primary size-6" />}
            title="Análisis Legal del Inmueble"
            description="Identifica riesgos urbanísticos, cargas registrales y alertas legales antes de captar o vender un activo."
          />

          <FeatureCard
            icon={<Zap className="text-primary size-6" />}
            title="Next Best Action con IA"
            description="La plataforma recomienda el siguiente paso óptimo para cada lead según probabilidad de conversión y momento de venta."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 1.1, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="relative mx-auto h-full max-w-80 p-2 text-center lg:p-6">
        <div className="bg-primary/10 mb-4 inline-flex rounded-lg p-3">{icon}</div>
        <h4 className="mb-2 text-xl font-semibold">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </MotionDiv>
  );
}
