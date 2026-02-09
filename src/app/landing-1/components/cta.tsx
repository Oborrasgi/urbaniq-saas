import Image from "next/image";

import { Marquee } from "@/components/marquee";
import { MotionDiv } from "@/components/motion-elements";
import { Button } from "@/components/ui/button";

const images = [
  "/images/image-1.jpg",
  "/images/image-2.jpg",
  "/images/image-3.jpg",
  "/images/image-4.jpg"
];

export default function CTA() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="from-primary/10 via-primary/5 to-background overflow-hidden rounded-3xl bg-linear-to-br">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <MotionDiv
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                  Start making smarter real estate decisions today
                </h2>

                <p className="text-muted-foreground text-lg">
                  Use artificial intelligence to capture leads, value properties, and analyze legal risk — all from a single platform built for real estate professionals.
                </p>

                <Button size="lg" className="mt-8 w-fit">
                  Request a demo
                </Button>
              </MotionDiv>
            </div>

            <div className="relative hidden h-96 perspective-near lg:flex lg:items-center lg:justify-center">
              <div className="flex translate-y-0 rotate-z-[-30deg] flex-row items-center gap-1">
                <Marquee duration="20s" vertical>
                  {images.map((src, index) => (
                    <div key={index} className="relative size-36 overflow-hidden rounded-xl">
                      <Image
                        fill
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 160px"
                      />
                    </div>
                  ))}
                </Marquee>

                <Marquee duration="20s" reverse vertical>
                  {images.map((src, index) => (
                    <div key={index} className="relative size-36 overflow-hidden rounded-xl">
                      <Image
                        fill
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 160px"
                      />
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
