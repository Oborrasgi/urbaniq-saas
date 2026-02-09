import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function EmptyBlog() {
  return (
    <main className="container mx-auto grid place-items-center py-16 lg:min-h-[600px]">
      <div className="mx-auto max-w-2xl text-center">
        <div className="bg-muted/30 mb-8 inline-flex rounded-md p-6">
          <svg
            className="text-muted-foreground size-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>

        <h2 className="mb-4 text-3xl font-bold">No Blogs Available</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          We're working on creating amazing content for you. Check back soon for insightful articles
          and tutorials.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">
              Back to Home
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
