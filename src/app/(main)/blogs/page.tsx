import type { Metadata } from "next";

import { BlogList } from "@/components/blogs/blog-list";
import { SectionHeader } from "@/components/section-headers";
import { Badge } from "@/components/ui/badge";
import { getBlogs } from "@/lib/blogs";
import { createMetadata } from "@/lib/metadata";
import { EmptyBlog } from "./empty-blog";

export const metadata: Metadata = createMetadata({
  title: "Blog | Urbaniq",
  description: "Descubra análisis profundos y actualizaciones sobre tecnología legal, inmobiliaria, fiscal y de inteligencia artificial.",
  canonicalUrlRelative: "/blogs"
});

export default async function BlogPage() {
  const blogs = await getBlogs();

  if (blogs.length < 1) {
    return <EmptyBlog />;
  }

  return (
    <main>
      <div className="bg-primary/5">
        <SectionHeader className="py-16 md:py-24">
          <SectionHeader.HeaderContent className="md:pb-0">
            <Badge variant="secondary" className="px-3 py-1">
              🏢 Hub de Conocimiento Urbaniq
            </Badge>
            <SectionHeader.Heading>Perspectivas, Análisis y Buenas Prácticas en LegalTech y PropTech</SectionHeader.Heading>
            <SectionHeader.Text className="text-lg">
              Manténgase informado con las últimas tendencias en tecnología legal, inmobiliaria, fiscal y de inteligencia artificial. Aprenda a optimizar y transformar su negocio con soluciones innovadoras y conocimiento experto.
            </SectionHeader.Text>
          </SectionHeader.HeaderContent>
        </SectionHeader>
      </div>

      <SectionHeader className="pt-0">
        <div className="mb-8 space-y-0.5">
          <h2 className="text-2xl font-bold">Artículos Especializados</h2>
          <p className="text-muted-foreground">
            Explore nuestra colección exclusiva de análisis, guías y estudios en LegalTech, PropTech y más.
          </p>
        </div>

        <BlogList blogs={blogs} />
      </SectionHeader>
    </main>
  );
}
