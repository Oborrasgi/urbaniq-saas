import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// import { createBlogAction, updateBlogAction } from "@/actions/blog-actions";
import { blogFormSchema, type BlogFormSchema } from "@/lib/zod-schemas";

interface UseBlogFormOptions {
  defaultValues: BlogFormSchema;
  isEdit: boolean;
  slug?: string;
}
export function useBlogForm({ defaultValues, isEdit, slug }: UseBlogFormOptions) {
  const form = useForm<BlogFormSchema>({
    resolver: zodResolver(blogFormSchema),
    defaultValues
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isEdit && slug) {
        // TODO: Uncomment this if you want to update the plan
        // await updateBlogAction(slug, data);
        // toast.success("Blog updated successfully");
        // return;
      }

      // TODO: Remove this
      throw new Error("Demo website, so you can't create the blog");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong. Please try again later.";
      toast.error(errorMessage);
      console.error("Error submitting plan form:", error);
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting
  };
}
