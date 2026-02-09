import { Rocket } from "lucide-react";

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
          <SectionHeader.Heading className="font-mono font-extrabold md:text-6xl/none">
            Build, Launch & Scale Your Business Today
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
            SaasPilot takes care of the complex technical aspects like authentication, payment
            processing, search engine optimization, user interface design, and third-party
            integrations, allowing you to concentrate on developing your core product and generating
            revenue.
          </SectionHeader.Text>
        </MotionDiv>

        <MotionDiv
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
          className="mt-6 flex w-full items-center justify-center md:mt-10"
        >
          <Button className="h-auto !px-12 !py-4">
            <Rocket /> Get SaasPilot
          </Button>
        </MotionDiv>
      </SectionHeader.HeaderContent>
    </SectionHeader>
  );
}
