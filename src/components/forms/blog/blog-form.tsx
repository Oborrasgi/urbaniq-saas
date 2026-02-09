"use client";

import { Loader, Save } from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { InputFile } from "@/components/InputFile";
import { Blog } from "@/types/blog";
import { useBlogForm } from "./use-blog-form";

const Editor = dynamic(() => import("@/components/editor").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <div className="bg-muted h-72 w-full animate-pulse rounded-lg border" />
});

export function BlogForm({ blog }: { blog?: Blog }) {
  const { form, onSubmit, isSubmitting } = useBlogForm({
    isEdit: !!blog?.slug,
    slug: blog?.slug,
    defaultValues: {
      title: blog?.title ?? "",
      description: blog?.description ?? "",
      content: blog?.content ?? "",
      image: blog?.image ?? "",
      tags: blog?.tags.join(",") ?? "",
      metaTitle: blog?.metaTitle ?? "",
      metaDescription: blog?.metaDescription ?? "",
      metaKeywords: blog?.metaKeywords.join(",") ?? "",
      isPublished: blog?.isPublished ?? true
    }
  });

  return (
    <Card className="max-w-5xl">
      <CardHeader>
        <CardTitle>Blog Details</CardTitle>
        <CardDescription>Enter the details for the new/edit blog</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <FormLabel>Title</FormLabel>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="e.g., My First Blog" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Description</FormLabel>
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        className="dark:bg-input/30 resize-none bg-transparent"
                        placeholder="Enter the description of the blog..."
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Content</FormLabel>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor content={field.value} onUpdate={field.onChange} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Image</FormLabel>
              <FormField
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <InputFile
                        onChange={field.onChange}
                        value={field.value}
                        error={!!fieldState.error}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Tags</FormLabel>
              <FormField
                name="tags"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Programming, AI, Technology, etc." />
                    </FormControl>
                    <span className="text-muted-foreground ms-3 block text-xs">
                      Enter the tags separated by commas
                    </span>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Meta Title</FormLabel>
              <FormField
                name="metaTitle"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Enter the meta title of the blog..." />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Meta Description</FormLabel>
              <FormField
                name="metaDescription"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        className="dark:bg-input/30 resize-none bg-transparent"
                        placeholder="Enter the meta description of the blog..."
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Meta Keywords</FormLabel>
              <FormField
                name="metaKeywords"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Technology, Programming, AI, etc." />
                    </FormControl>
                    <span className="text-muted-foreground ms-3 block text-xs">
                      Enter the keywords separated by commas
                    </span>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center space-x-2">
              <FormField
                name="isPublished"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Publish</FormLabel>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button onClick={() => onSubmit()} disabled={isSubmitting}>
          {isSubmitting ? <Loader className="size-4 animate-spin" /> : <Save className="size-4" />}
          {isSubmitting ? "Saving blog..." : "Save blog"}
        </Button>
      </CardFooter>
    </Card>
  );
}
