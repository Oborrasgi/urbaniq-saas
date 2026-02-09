"use client";

import { ArrowLeftIcon, RotateCcwIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl py-12 sm:py-20">
        {/* Glowing background blobs */}
        <div className="bg-primary absolute top-0 left-1/4 z-0 h-1/3 w-1/3 scale-125 transform opacity-20 blur-[120px]" />
        <div className="bg-secondary absolute right-1/4 bottom-0 z-0 h-1/3 w-1/3 scale-125 transform opacity-20 blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center">
          <svg
            className="text-destructive mb-6 size-16"
            fill="none"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M32 18v18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="32" cy="44" r="2.5" fill="currentColor" />
          </svg>

          <h1 className="mb-2 text-center text-3xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground mb-6 text-center">
            Sorry, an unexpected error has occurred.
            <br />
            Please try again or return to the homepage.
          </p>

          <div className="flex gap-3">
            <Button onClick={reset}>
              <RotateCcwIcon className="size-4" />
              Try Again
            </Button>

            <Link href="/">
              <Button>
                <ArrowLeftIcon className="size-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
