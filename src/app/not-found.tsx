"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl py-16 sm:py-24">
        {/* Glowing background blobs */}
        <div className="bg-primary absolute top-0 left-1/4 z-0 h-1/3 w-1/3 scale-125 transform opacity-20 blur-[120px]" />
        <div className="bg-secondary absolute right-1/4 bottom-0 z-0 h-1/3 w-1/3 scale-125 transform opacity-20 blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center">
          {/* 404 SVG Illustration */}
          <svg
            className="text-primary mb-8 size-32"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="8" fill="none" />
            <ellipse cx="44" cy="54" rx="6" ry="8" fill="currentColor" opacity="0.7" />
            <ellipse cx="76" cy="54" rx="6" ry="8" fill="currentColor" opacity="0.7" />
            <path
              d="M44 80c4-4 12-4 16 0"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <text
              x="60"
              y="105"
              textAnchor="middle"
              fontSize="32"
              fill="currentColor"
              className="font-bold"
            >
              404
            </text>
          </svg>

          <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight">
            OPPS! Page Not Found
          </h1>

          <p className="text-muted-foreground mb-8 max-w-2/3 text-center">
            We are sorry, The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <Link href="/">
            <Button>
              <ArrowLeftIcon className="size-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
