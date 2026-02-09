import { Blog } from "@/types/blog";
import { prisma } from "./prisma";

export async function getBlogs(): Promise<Blog[]> {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" }
  });

  return blogs;
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blog = await prisma.blog.findUnique({
    where: { slug }
  });

  return blog;
}

export async function getBlogSlugs() {
  const slugs = await prisma.blog.findMany({
    select: { slug: true }
  });

  return slugs;
}
