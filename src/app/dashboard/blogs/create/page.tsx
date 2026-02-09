import { type Metadata } from "next";

import { DashboardTitle } from "@/components/dashboard-title";
import { BlogForm } from "@/components/forms/blog/blog-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Crear Insight Inmobiliario | UrbanIQ",
  description: "Crea contenido estratégico e inteligencia inmobiliaria impulsada por IA."
});

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <DashboardTitle heading="Crear Insight Inmobiliario" text="Genera análisis, contenido legal y conocimiento inmobiliario con IA." />
      <BlogForm />
    </div>
  );
}
