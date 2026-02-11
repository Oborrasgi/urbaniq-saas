import { Marquee } from "@/components/marquee";
import { MotionDiv } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";

const sponsors = [
  { name: "Agencias inmobiliarias", label: "Agencias" },
  { name: "Fondos de inversión", label: "Fondos" },
  { name: "Servicers", label: "Servicers" },
  { name: "Brokers hipotecarios", label: "Brokers" },
  { name: "Despachos legales", label: "Legal" },
  { name: "Promotoras", label: "Promotoras" }
];

export default function TrustedBy() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader>
        <SectionHeader.HeaderContent className="pb-12">
          <SectionHeader.Heading>Con la confianza del sector inmobiliario</SectionHeader.Heading>
          <SectionHeader.Text>
            UrbanIQ es utilizado por agencias, inversores y profesionales que toman decisiones basadas en datos.
          </SectionHeader.Text>
        </SectionHeader.HeaderContent>

        <SectionHeader.Content>
          <div className="bg-background relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
            <Marquee duration="40s" className="ms-2 flex shrink-0 flex-row justify-around gap-2">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex h-16 min-w-[180px] items-center justify-center rounded-md border border-dashed px-6 text-sm font-medium text-muted-foreground"
                >
                  {sponsor.name}
                </div>
              ))}
            </Marquee>

            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l" />
          </div>
        </SectionHeader.Content>
      </SectionHeader>
    </MotionDiv>
  );
}
