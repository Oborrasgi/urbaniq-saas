import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Fragment } from "react";

import BentoGrid from "@/components/sections/bento-grid";
import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import Features from "@/components/sections/features";
import FeaturesGrid from "@/components/sections/features-grid";
import Hero from "@/components/sections/hero";
import Pricing from "@/components/sections/pricing";
import Problem from "@/components/sections/problem";
import Stats from "@/components/sections/stats";
import TrustedBy from "@/components/sections/trusted-by";
import WallOfLove from "@/components/sections/wall-of-love";

export const metadata: Metadata = createMetadata({
  title: "UrbanIQ | Inteligencia Artificial Inmobiliaria",
  description:
    "UrbanIQ es la plataforma SaaS de IA para el sector inmobiliario: captación de propietarios, valoración avanzada, análisis legal y automatización comercial en una única solución.",
  canonicalUrlRelative: "/"
});

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <TrustedBy />
      <FeaturesGrid />
      <Problem />
      <BentoGrid />
      <Features />
      <WallOfLove />
      <Pricing />
      <Stats />
      <FAQ />
      <CTA />
    </Fragment>
  );
}