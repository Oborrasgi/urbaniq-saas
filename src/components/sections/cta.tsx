import { Rocket } from "lucide-react";
import Link from "next/link";

import { MotionDiv } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <SectionHeader className="md:py-24">
      <SectionHeader.HeaderContent className="pb-0">
        <MotionDiv
          className="block"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <SectionHeader.Heading className="font-extrabold md:text-6xl/none">
            Toma decisiones inmobiliarias con ventaja competitiva
          </SectionHeader.Heading>
        </MotionDiv>

        <MotionDiv
          className="block"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        >
          <SectionHeader.Text className="md:text-lg">
            UrbanIQ combina inteligencia artificial, análisis legal y datos de mercado para ayudarte
            a captar mejores propietarios, valorar activos con precisión y reducir riesgos antes de
            cerrar una operación.
          </SectionHeader.Text>
        </MotionDiv>

        <MotionDiv
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
          className="mt-6 flex w-full items-center justify-center md:mt-10"
        >
          <Link href="/register">
            <Button className="h-auto !px-12 !py-4 text-base font-semibold">
              <Rocket className="mr-2 size-4" />
              Solicitar acceso a UrbanIQ
            </Button>
          </Link>
        </MotionDiv>
      </SectionHeader.HeaderContent>
    </SectionHeader>
  );
}
