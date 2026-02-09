"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { BlogFormSchema, blogFormSchema } from "@/lib/zod-schemas";

export async function createBlogAction(data: BlogFormSchema) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized Access!");
  }

  // Only allow admin users to update blogs
  // if (!currentUser?.isAdmin) {
  //   throw new Error("Unauthorized Access!");
  // }

  const validationResult = blogFormSchema.safeParse(data);
  if (!validationResult.success) {
    throw new Error("Something went wrong. Please try again.");
  }

  const {
    title,
    description,
    content,
    image,
    tags,
    isPublished,
    metaTitle,
    metaDescription,
    metaKeywords
  } = validationResult.data;

  const slug = slugify(title);

  const hasBlog = await prisma.blog.findUnique({
    where: { slug },
    select: { id: true }
  });

  if (hasBlog) {
    throw new Error("Blog already exists with this title!");
  }

  await prisma.blog.create({
    data: {
      slug,
      title,
      description,
      content,
      image,
      isPublished,
      metaTitle,
      metaDescription,
      authorId: currentUser.id,
      tags: tags ? tags.split(",") : [],
      metaKeywords: metaKeywords ? metaKeywords.split(",") : [],
      publishedAt: isPublished ? new Date() : null
    }
  });

  return { success: true, message: "Blog created successfully." };
}

export async function updateBlogAction(slug: string, data: BlogFormSchema) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized Access!");
  }

  // Only allow admin users to update blogs
  // if (!currentUser?.isAdmin) {
  //   throw new Error("Unauthorized Access!");
  // }

  const validationResult = blogFormSchema.safeParse(data);
  if (!validationResult.success) {
    throw new Error("Invalid blog data!");
  }

  const {
    title,
    description,
    content,
    image,
    tags,
    isPublished,
    metaTitle,
    metaDescription,
    metaKeywords
  } = validationResult.data;

  const hasBlog = await prisma.blog.findUnique({
    where: { slug },
    select: { id: true, isPublished: true }
  });

  if (!hasBlog) {
    throw new Error("Blog does not exist with this slug!");
  }

  await prisma.blog.update({
    where: { slug },
    data: {
      title,
      description,
      content,
      image,
      isPublished,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords ? metaKeywords.split(",") : [],
      tags: tags ? tags.split(",") : [],
      ...(isPublished &&
        !hasBlog.isPublished && {
          publishedAt: new Date()
        })
    }
  });

  return {
    status: "success",
    message: "Blog updated successfully"
  };
}

export async function deleteBlogAction(slug: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized Access!");
  }

  // Only allow admin users to delete blogs
  // if (!currentUser?.isAdmin) {
  //   throw new Error("Unauthorized Access!");
  // }

  const hasBlog = await prisma.blog.findUnique({
    where: { slug },
    select: { id: true }
  });

  if (!hasBlog) {
    throw new Error("Blog does not exist with this slug!");
  }

  await prisma.blog.delete({ where: { slug } });

  return {
    status: "success",
    message: "Blog deleted successfully"
  };
}

"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { BlogFormSchema, blogFormSchema } from "@/lib/zod-schemas";

/**
 * Strict admin authorization and safer error handling.
 * Optionally, tenantId can be added for multi-tenancy in the future.
 */

export async function createBlogAction(data: BlogFormSchema) {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.isAdmin) {
    throw new Error("Unauthorized");
  }

  const validationResult = blogFormSchema.safeParse(data);
  if (!validationResult.success) {
    throw new Error("Invalid blog data.");
  }

  const {
    title,
    description,
    content,
    image,
    tags,
    isPublished,
    metaTitle,
    metaDescription,
    metaKeywords
  } = validationResult.data;

  const slug = slugify(title);

  // Optionally add tenantId: currentUser.tenantId, if multi-tenancy is needed
  const hasBlog = await prisma.blog.findUnique({
    where: { slug },
    select: { id: true }
  });

  if (hasBlog) {
    throw new Error("A blog with this title already exists.");
  }

  const created = await prisma.blog.create({
    data: {
      slug,
      title,
      description,
      content,
      image,
      isPublished,
      metaTitle,
      metaDescription,
      authorId: currentUser.id,
      tags: tags ? tags.split(",") : [],
      metaKeywords: metaKeywords ? metaKeywords.split(",") : [],
      publishedAt: isPublished ? new Date() : null
      // tenantId: currentUser.tenantId, // Uncomment if needed for multi-tenancy
    }
  });

  return {
    success: true,
    message: "Blog created successfully.",
    data: { slug: created.slug }
  };
}

export async function updateBlogAction(slug: string, data: BlogFormSchema) {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.isAdmin) {
    throw new Error("Unauthorized");
  }

  const validationResult = blogFormSchema.safeParse(data);
  if (!validationResult.success) {
    throw new Error("Invalid blog data.");
  }

  const {
    title,
    description,
    content,
    image,
    tags,
    isPublished,
    metaTitle,
    metaDescription,
    metaKeywords
  } = validationResult.data;

  // Optionally add tenantId: currentUser.tenantId, if multi-tenancy is needed
  const hasBlog = await prisma.blog.findUnique({
    where: { slug },
    select: { id: true, isPublished: true, title: true }
  });

  if (!hasBlog) {
    throw new Error("Blog not found.");
  }

  // Regenerate slug if title changes
  let newSlug = slug;
  if (title && title !== hasBlog.title) {
    newSlug = slugify(title);
    const slugExists = await prisma.blog.findUnique({
      where: { slug: newSlug },
      select: { id: true }
    });
    if (slugExists) {
      throw new Error("A blog with the new title already exists.");
    }
  }

  const updated = await prisma.blog.update({
    where: { slug },
    data: {
      slug: newSlug,
      title,
      description,
      content,
      image,
      isPublished,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords ? metaKeywords.split(",") : [],
      tags: tags ? tags.split(",") : [],
      ...(isPublished && !hasBlog.isPublished && { publishedAt: new Date() })
      // tenantId: currentUser.tenantId, // Uncomment if needed for multi-tenancy
    }
  });

  return {
    success: true,
    message: "Blog updated successfully.",
    data: { slug: updated.slug }
  };
}

export async function deleteBlogAction(slug: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.isAdmin) {
    throw new Error("Unauthorized");
  }

  // Optionally add tenantId: currentUser.tenantId, if multi-tenancy is needed
  const hasBlog = await prisma.blog.findUnique({
    where: { slug },
    select: { id: true }
  });

  if (!hasBlog) {
    throw new Error("Blog not found.");
  }

  await prisma.blog.delete({ where: { slug } });

  return {
    success: true,
    message: "Blog deleted successfully."
  };
}