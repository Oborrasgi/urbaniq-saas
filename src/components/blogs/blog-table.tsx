"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Blog } from "@/types/blog";
import { BlogDeleteButton } from "./blog-delete-button";

interface BlogTableProps {
  blogs: Blog[];
}

export function BlogTable({ blogs }: BlogTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="h-12 px-4">Title</TableHead>
            <TableHead className="h-12 px-4">Description</TableHead>
            <TableHead className="h-12 px-4">Created At</TableHead>
            <TableHead className="h-12 px-4">Status</TableHead>
            <TableHead className="h-12 px-4 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {blogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-muted-foreground h-24 text-center">
                No blogs found. Create your first blog to get started.
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="max-w-xs p-4 font-medium">{blog.title}</TableCell>
                <TableCell className="max-w-xs truncate p-4">{blog.description}</TableCell>
                <TableCell className="p-4">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </TableCell>

                <TableCell className="p-4">
                  <Badge variant={blog.isPublished ? "default" : "outline"}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>

                <TableCell className="space-x-2 p-4 text-center">
                  <Link href={`/dashboard/blogs/${blog.slug}`}>
                    <Button variant="outline" size="sm" title="Edit Blog">
                      <Pencil className="text-muted-foreground size-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>

                  <BlogDeleteButton slug={blog.slug} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function PriceCell({ isVisible, price }: { isVisible: boolean; price: number }) {
  return (
    <TableCell className="p-4">
      {isVisible ? `$${price}` : <span className="text-muted-foreground">—</span>}
    </TableCell>
  );
}
