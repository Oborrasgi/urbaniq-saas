import type { Metadata } from "next";

import { BlogList } from "@/components/blogs/blog-list";
import { SectionHeader } from "@/components/section-headers";
import { Badge } from "@/components/ui/badge";
import { getBlogs } from "@/lib/blogs";
import { createMetadata } from "@/lib/metadata";
import { EmptyBlog } from "./empty-blog";

export const metadata: Metadata = createMetadata({
  title: "Blogs | SaasPilot",
  description: "Explore our complete collection of guides and tutorials",
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
              📚 Blog & Resources
            </Badge>
            <SectionHeader.Heading>Insights, Tutorials & Best Practices</SectionHeader.Heading>
            <SectionHeader.Text className="text-lg">
              Stay updated with the latest in SaaS development, from technical guides to business
              insights. Learn how to build, scale, and grow your applications with industry best
              practices.
            </SectionHeader.Text>
          </SectionHeader.HeaderContent>
        </SectionHeader>
      </div>

      <SectionHeader className="pt-0">
        <div className="mb-8 space-y-0.5">
          <h2 className="text-2xl font-bold">All Articles</h2>
          <p className="text-muted-foreground">
            Explore our complete collection of guides and tutorials
          </p>
        </div>

        <BlogList blogs={blogs} />
      </SectionHeader>
    </main>
  );
}
