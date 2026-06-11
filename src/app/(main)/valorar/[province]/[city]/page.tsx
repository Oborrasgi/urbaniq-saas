import type { Metadata } from "next";

import { ValuationPage } from "@/features/valuation-wizard/valuation-page";
import { cityNameFromSlug } from "@/features/valuation-wizard/slug";

type PageProps = {
  params: Promise<{
    city: string;
    province: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = cityNameFromSlug(city);

  return {
    title: `Valorar vivienda en ${cityName} | UrbanIQ`,
    description: `Solicita una valoración orientativa de vivienda en ${cityName} con UrbanIQ.`
  };
}

export default async function Page({ params }: PageProps) {
  const { city, province } = await params;

  return <ValuationPage citySlug={city} provinceSlug={province} />;
}
