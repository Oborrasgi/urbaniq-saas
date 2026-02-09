import { type Metadata } from "next";

import { BlogTable } from "@/components/blogs/blog-table";
import { DashboardTitle } from "@/components/dashboard-title";
import { getBlogs } from "@/lib/blogs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contenido & Insights | UrbanIQ",
  description: "Gestiona artículos, análisis y contenido estratégico generado para UrbanIQ."
});

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Contenido & Insights"
        text="Gestiona artículos, análisis legales e inteligencia inmobiliaria generada con IA."
      />
      <BlogTable blogs={blogs} />
    </div>
  );
}