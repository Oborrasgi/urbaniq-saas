"use client";

import Image from "next/image";

import { MotionDiv } from "@/components/motion-elements";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    src: "/images/image-13.png",
    alt: "AI Generated Portrait 1",
    span: "col-span-2 row-span-2"
  },
  {
    src: "/images/image-14.png",
    alt: "AI Generated Portrait 2",
    span: "col-span-2 row-span-2"
  },
  {
    src: "/images/image-15.jpg",
    alt: "AI Generated Portrait 3",
    span: "md:col-span-1 col-span-2 row-span-2"
  },
  {
    src: "/images/image-16.jpg",
    alt: "AI Generated Portrait 5",
    span: "md:col-span-1 col-span-2 row-span-2"
  },
  {
    src: "/images/image-17.png",
    alt: "AI Generated Portrait 4",
    span: "col-span-2 row-span-2"
  },
  {
    src: "/images/image-18.png",
    alt: "AI Generated Portrait 6",
    span: "col-span-2 row-span-2"
  },
  {
    src: "/images/image-19.png",
    alt: "AI Generated Portrait 7",
    span: "col-span-2 row-span-2"
  },

  {
    src: "/images/image-20.png",
    alt: "AI Generated Portrait 9",
    span: "col-span-2 row-span-2"
  },
  {
    src: "/images/image-21.png",
    alt: "AI Generated Portrait 8",
    span: "md:col-span-1 col-span-2 row-span-2"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <MotionDiv
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl space-y-3 pb-12 text-center md:pb-16"
        >
          <h3 className="text-3xl font-bold sm:text-4xl">UrbanIQ Insights Gallery</h3>
          <p className="text-muted-foreground">
            Explore AI-generated visual insights used by UrbanIQ to analyze, enhance, and understand real estate assets.
          </p>
        </MotionDiv>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {galleryImages.map((image, index) => (
            <MotionDiv
              key={index}
              viewport={{ once: true }}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
              className={cn("relative overflow-hidden rounded-2xl", image.span)}
            >
              <Image
                fill
                src={image.src}
                alt={image.alt}
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
