import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeader } from "@/components/section-headers";
import { Badge } from "@/components/ui/badge";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blogs";
import { createMetadata } from "@/lib/metadata";
import { getReadingTime } from "@/lib/utils";

// Generate static params for all blog details
// This is used to generate the static pages for all blog details at build time
// This is a good practice to improve performance and SEO by pre-rendering the pages
export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs;
}

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  return createMetadata({
    title: blog.title,
    description: blog.description,
    canonicalUrlRelative: `/blogs/${slug}`,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.image, width: 1200, height: 630, alt: blog.title }]
    }
  });
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main>
      <section className="container mx-auto max-w-4xl pt-16 md:pt-24">
        <Link
          href="/blogs"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Volver al Centro de Conocimiento
        </Link>
      </section>

      <SectionHeader className="pt-8 pb-0!">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-center text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
            {blog.title}
          </h1>

          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-center text-lg">
            {blog.description}
          </p>

          <div className="text-muted-foreground mb-8 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              {new Date(blog.createdAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </div>

            <div className="bg-border h-px w-8 sm:h-4 sm:w-px" />

            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              {"Tiempo de lectura: "}{getReadingTime(blog.content)}
            </div>
          </div>

          <div className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-2xl">
            <Image
              priority
              width={1200}
              height={630}
              alt={blog.title}
              src={blog.image}
              className="object-cover"
            />
          </div>
        </div>
      </SectionHeader>

      <article className="container mx-auto max-w-4xl px-4 pb-16">
        <div className="mx-auto max-w-3xl">
          <div
            className="prose prose-lg prose-neutral dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.tags.length > 0 && (
            <div className="mt-12 flex items-center justify-between gap-4 border-t pt-8">
              <div className="flex flex-wrap gap-2">
                <span className="text-muted-foreground text-sm font-medium">Etiquetas:</span>
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
