import { type Metadata } from "next";

import { BlogTable } from "@/components/blogs/blog-table";
import { DashboardTitle } from "@/components/dashboard-title";
import { getBlogs } from "@/lib/blogs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Artículos | UrbanIQ Dashboard",
  description: "Gestiona los artículos y contenidos del blog de UrbanIQ"
});

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Artículos"
        text="Gestiona los contenidos del blog y recursos inmobiliarios de UrbanIQ"
      />
      <BlogTable blogs={blogs} />
    </div>
  );
}
