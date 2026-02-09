import Image from "next/image";

import { Marquee } from "@/components/marquee";
import { MotionDiv } from "@/components/motion-elements";

const sponsors = [
  "/clients/client-logo-1.svg",
  "/clients/client-logo-2.svg",
  "/clients/client-logo-3.svg",
  "/clients/client-logo-4.svg",
  "/clients/client-logo-5.svg",
  "/clients/client-logo-6.svg"
];

export default function TrustedBy() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <section className="container mx-auto max-w-7xl py-10 md:py-14">
        <h3 className="mb-6 text-center text-2xl font-medium">Trusted by real estate professionals</h3>
        <p className="text-muted-foreground mb-8 text-center text-sm">Agencies, investors, and legal advisors using AI-driven real estate intelligence.</p>

        <div className="bg-background relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <Marquee duration="40s" className="ms-2 flex shrink-0 flex-row justify-around gap-2">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="flex h-16 w-40 items-center justify-center">
                <Image
                  width={0}
                  alt="UrbanIQ partner logo"
                  height={64}
                  src={sponsor}
                  className="h-full w-auto object-contain px-5 dark:invert"
                  sizes="(max-width: 640px) 100vw, 200px"
                />
              </div>
            ))}
          </Marquee>

          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-linear-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-linear-to-l" />
        </div>
      </section>
    </MotionDiv>
  );
}
