"use client";

import { MotionDiv } from "@/components/motion-elements";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

const images = [
  {
    id: 1,
    afterImage: "/images/image-13.png",
    beforeImage: "/images/image-13-black.png",
    alt: "Valoración inmobiliaria con IA"
  },
  {
    id: 2,
    afterImage: "/images/image-17.png",
    beforeImage: "/images/image-17-black.png",
    alt: "Análisis de riesgo legal inmobiliario"
  }
];

export default function Demo() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <MotionDiv
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl space-y-3 pb-12 text-center md:pb-16"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Inteligencia inmobiliaria aplicada a decisiones reales
          </h2>

          <p className="text-muted-foreground">
            UrbanIQ transforma datos dispersos en ventaja competitiva:
            valoración avanzada, detección de riesgos legales y análisis accionable
            en segundos.
          </p>
        </MotionDiv>

        {/* Demo */}
        <div className="mx-auto max-w-5xl">
          <div className="bg-muted dark:bg-card border-border relative overflow-hidden rounded-2xl">
            <div className="relative overflow-hidden rounded-tl-2xl rounded-tr-2xl">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    className="object-cover"
                    alt={images[selectedImageIndex].alt}
                    src={images[selectedImageIndex].beforeImage}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    className="object-cover"
                    alt={images[selectedImageIndex].alt}
                    src={images[selectedImageIndex].afterImage}
                  />
                }
                position={50}
              />

              {/* Labels */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-primary rounded-md px-3 py-1 text-sm font-medium text-white">
                  Datos sin procesar
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <span className="bg-primary rounded-md px-3 py-1 text-sm font-medium text-white">
                  Insight UrbanIQ
                </span>
              </div>
            </div>

            {/* Selector */}
            <div className="flex items-center justify-center gap-4 p-6">
              <SelectImageButton
                src="/images/image-13.png"
                alt="Valoración inmobiliaria"
                index={0}
                label="Valoración realista"
                selectedImageIndex={selectedImageIndex}
                handleImageClick={handleImageClick}
              />

              <SelectImageButton
                src="/images/image-17.png"
                alt="Riesgo legal inmobiliario"
                index={1}
                label="Riesgo legal"
                selectedImageIndex={selectedImageIndex}
                handleImageClick={handleImageClick}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Selector buttons                   */
/* ---------------------------------- */

function SelectImageButton({
  src,
  alt,
  index,
  label,
  selectedImageIndex,
  handleImageClick
}: {
  src: string;
  alt: string;
  index: number;
  label: string;
  selectedImageIndex: number;
  handleImageClick: (index: number) => void;
}) {
  return (
    <div
      role="button"
      onClick={() => handleImageClick(index)}
      className={cn(
        "relative flex h-auto w-24 cursor-pointer flex-col items-center gap-1 rounded-xl p-2 transition",
        selectedImageIndex === index && "bg-primary/10"
      )}
    >
      <div className="relative h-12 w-full overflow-hidden rounded-lg">
        <Image fill src={src} alt={alt} className="object-cover" sizes="100vw" />
      </div>

      <span
        className={cn(
          "text-xs font-medium",
          selectedImageIndex === index && "text-primary"
        )}
      >
        {label}
      </span>
    </div>
  );
}