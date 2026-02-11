"use client";

import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from "lucide-react";
import { useId } from "react";

import { MotionDiv } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";

const features = [
  {
    icon: Zap,
    title: "Captación Inteligente",
    description:
      "Detecta propietarios con intención de venta mediante modelos predictivos y señales digitales avanzadas."
  },
  {
    icon: Cpu,
    title: "AVM Explicable",
    description:
      "Obtén rangos de valoración con nivel de confianza, comparables y factores de mercado en segundos."
  },
  {
    icon: Fingerprint,
    title: "Análisis Legal Automatizado",
    description:
      "Identifica riesgos urbanísticos, cargas registrales y alertas documentales antes de captar o vender."
  },
  {
    icon: Pencil,
    title: "Perfilado de Activos",
    description:
      "Genera un Property Health Score con diagnóstico técnico, jurídico y comercial del inmueble."
  },
  {
    icon: Settings2,
    title: "Next Best Action",
    description:
      "La plataforma recomienda el siguiente paso óptimo según probabilidad de conversión y momento de venta."
  },
  {
    icon: Sparkles,
    title: "Distribución de Leads",
    description:
      "Entrega leads cualificados con exclusividad a partners verificados bajo modelos CPL, CPA o híbridos."
  }
];

export default function FeaturesGrid() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader id="features">
        <SectionHeader.HeaderContent>
          <SectionHeader.Heading>UrbanIQ Intelligence Engine</SectionHeader.Heading>
          <SectionHeader.Text>
            Tecnología diseñada para captar, cualificar y maximizar el valor de cada oportunidad inmobiliaria.
          </SectionHeader.Text>
        </SectionHeader.HeaderContent>

        <SectionHeader.Content>
          <div className="bg-background text-foreground mx-auto grid max-w-6xl grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature, i) => (
              <div className="group relative overflow-hidden p-8" key={i}>
                <div className="pointer-events-none absolute top-0 left-1/2 -ms-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                  <div className="from-muted-foreground/5 to-muted-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                    <GridPattern
                      y="4"
                      x="-12"
                      width={20}
                      height={20}
                      className="fill-muted-foreground/5 stroke-muted-foreground/10 absolute inset-0 h-full w-full mix-blend-overlay"
                    />
                  </div>
                </div>

                <div className="bg-primary/10 flex size-11 flex-col items-center justify-center rounded-md">
                  <feature.icon className="text-primary size-6" strokeWidth={1} aria-hidden />
                </div>

                <h2 className="mt-7 text-xl font-bold">{feature.title}</h2>
                <p className="text-muted-foreground relative z-20 mt-2 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </SectionHeader.Content>
      </SectionHeader>
    </MotionDiv>
  );
}

interface GridPatternProps extends React.ComponentProps<"svg"> {
  width: number;
  height: number;
  x: string;
  y: string;
}

const patterns = [
  [9, 3],
  [7, 4],
  [9, 3],
  [7, 2],
  [10, 2]
];

function GridPattern({ width, height, x, y, ...props }: GridPatternProps) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          x={x}
          y={y}
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />

      {patterns && (
        <svg x={x} y={y} className="overflow-visible">
          {patterns.map(([x, y], index) => (
            <rect
              key={index}
              x={x * width}
              y={y * height}
              strokeWidth="0"
              width={width + 1}
              height={height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
