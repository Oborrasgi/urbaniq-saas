import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn, getReadingTime } from "@/lib/utils";
import type { Blog } from "@/types/blog";

export function BlogList({ blogs }: { blogs: Blog[] }) {
  const isLessThanThree = blogs.length < 3;

  return (
    <div
      className={cn(
        "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
        isLessThanThree && "lg:grid-cols-2"
      )}
    >
      {blogs.map((blog) => (
        <Link href={`/blogs/${blog.slug}`} key={blog.id}>
          <Card className="group h-full overflow-hidden py-0 pb-6 transition-all duration-300 hover:shadow-lg">
            <div
              className={cn(
                "relative aspect-16/10 min-h-56 overflow-hidden",
                isLessThanThree && "aspect-video min-h-60"
              )}
            >
              <Image
                fill
                src={blog.image}
                alt={blog.title}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
              />
            </div>

            <CardContent className="flex-1">
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  })}
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {getReadingTime(blog.content)}
                </div>
              </div>

              <CardTitle className="group-hover:text-primary mt-1 line-clamp-2 text-lg transition-colors">
                {blog.title}
              </CardTitle>

              <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">{blog.description}</p>
            </CardContent>

            {/* <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative size-5 overflow-hidden rounded-full">
                  <Image
                    fill
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <p className="text-muted-foreground text-xs">{post.author.name}</p>
              </div>

              <ArrowRight className="transition- group-hover:text-primary size-4 transition-transform duration-300 group-hover:-rotate-45" />
            </CardFooter> */}
          </Card>
        </Link>
      ))}
    </div>
  );
}
