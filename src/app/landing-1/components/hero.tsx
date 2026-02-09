import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Marquee } from "@/components/marquee";
import { MotionDiv, MotionH1, MotionParagraph } from "@/components/motion-elements";
import { Button } from "@/components/ui/button";

const images = [
  "/images/image-1.jpg",
  "/images/image-2.jpg",
  "/images/image-3.jpg",
  "/images/image-4.jpg",
  "/images/image-5.jpg",
  "/images/image-6.jpg"
];

const imagesReverse = [
  "/images/image-7.jpg",
  "/images/image-8.jpg",
  "/images/image-9.jpg",
  "/images/image-10.jpg",
  "/images/image-11.jpg",
  "/images/image-12.jpg"
];

const makers = [
  { id: 1, name: "Agentes inmobiliarios", avatar: "https://i.pravatar.cc/100?img=7" },
  { id: 2, name: "Inversores", avatar: "https://i.pravatar.cc/100?img=8" },
  { id: 3, name: "Propietarios", avatar: "https://i.pravatar.cc/100?img=3" }
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 pt-28 md:py-20 md:pt-40">
      <div className="mx-auto flex flex-col items-center gap-8 xl:flex-row xl:gap-4">
        <div className="w-full px-6 text-center xl:max-w-md xl:px-0 xl:text-left">
          <MotionH1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-5 text-6xl leading-tight font-bold md:text-7xl"
          >
            UrbanIQ
            <span className="block text-primary">
              Inteligencia Artificial para decisiones inmobiliarias
            </span>
          </MotionH1>

          <MotionParagraph
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-muted-foreground mb-8 text-base lg:text-lg"
          >
            La plataforma SaaS que combina IA, datos de mercado y análisis legal para
            captar propietarios, valorar activos y reducir riesgos en cada operación.
          </MotionParagraph>

          <div className="flex items-center justify-center gap-6 xl:justify-start">
            <MotionDiv
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link href="/register" passHref>
                <Button
                  variant="default"
                  className="group w-auto rounded-lg px-8! py-6 text-base font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  <Sparkles className="size-4 transition-transform duration-300 group-hover:scale-95" />
                  Ver demo
                </Button>
              </Link>
            </MotionDiv>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                {makers.map((maker, index) => (
                  <MotionDiv
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.4 + index * 0.1 }}
                    className="relative size-8 overflow-hidden rounded-full border bg-transparent"
                    key={maker.id}
                  >
                    <Image fill src={maker.avatar} alt={maker.name} />
                  </MotionDiv>
                ))}
              </div>

              <MotionParagraph
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.4 + makers.length * 0.1 }}
                className="text-sm font-medium"
              >
                Diseñado para agentes, inversores y propietarios profesionales
              </MotionParagraph>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden mask-x-from-70% mask-x-to-95% xl:-mr-10">
          <Marquee duration="40s">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex size-50 items-center justify-center overflow-hidden rounded-lg"
              >
                <Image
                  width={220}
                  height={220}
                  src={image}
                  alt="UrbanIQ plataforma inmobiliaria"
                  className="size-full object-cover"
                  sizes="(max-width: 640px) 100vw, 200px"
                />
              </div>
            ))}
          </Marquee>

          <Marquee reverse duration="40s">
            {imagesReverse.map((image, index) => (
              <div
                key={index}
                className="flex size-50 items-center justify-center overflow-hidden rounded-lg"
              >
                <Image
                  width={240}
                  height={240}
                  src={image}
                  alt="UrbanIQ inteligencia artificial inmobiliaria"
                  className="size-full object-cover"
                  sizes="(max-width: 640px) 100vw, 200px"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}