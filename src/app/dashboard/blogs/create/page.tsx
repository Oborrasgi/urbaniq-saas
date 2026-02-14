import { type Metadata } from "next";

import { DashboardTitle } from "@/components/dashboard-title";
import { BlogForm } from "@/components/forms/blog/blog-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Crear artículo | UrbanIQ Dashboard",
  description: "Crea un nuevo artículo en el blog de UrbanIQ"
});

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Crear artículo"
        text="Publica un nuevo contenido en el blog de UrbanIQ"
      />
      <BlogForm />
    </div>
  );
}
