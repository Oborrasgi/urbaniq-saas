import { notFound } from "next/navigation";

import { DashboardTitle } from "@/components/dashboard-title";
import { BlogForm } from "@/components/forms/blog/blog-form";
import { getBlogBySlug } from "@/lib/blogs";
import { createMetadata } from "@/lib/metadata";

interface EditBlogProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EditBlogProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    notFound();
  }

  return createMetadata({
    title: `${blog.title} | UrbanIQ Dashboard`,
    description: blog.description,
    keywords: blog.metaKeywords
  });
}

export default async function EditBlogPage({ params }: EditBlogProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DashboardTitle heading="Editar artículo" text="Modifica el contenido del artículo en UrbanIQ" />
      <BlogForm blog={blog} />
    </div>
  );
}
