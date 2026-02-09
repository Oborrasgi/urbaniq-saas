import type { Metadata, Viewport } from "next";

import { appConfig } from "@/config";

interface createMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrlRelative?: string;
  extraTags?: Record<string, string>;
  authors?: Array<{ name: string; url?: string }>;
  openGraph?: {
    url?: string;
    title?: string;
    locale?: string;
    siteName?: string;
    description?: string;
    type?: "website" | "article" | "profile";
    images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  };
}

/** ===============================================
 * Generates SEO metadata for Next.js pages.
 * This function returns a comprehensive set of metadata tags for optimal SEO performance.
 * ===============================================
 */
export function createMetadata({
  title,
  authors,
  keywords,
  openGraph,
  extraTags,
  description,
  canonicalUrlRelative
}: createMetadataOptions = {}): Metadata {
  return {
    // Up to 50 characters: what your app offers
    title: title || appConfig.appTagline,

    // Up to 160 characters: how your app helps the user
    description: description || appConfig.appDescription,

    // Keywords separated by commas.
    keywords: keywords || [appConfig.appName],

    // Defaults to your app name
    applicationName: appConfig.appName,

    // Base URL for fully qualified URLs in metadata (e.g., for OpenGraph images)
    metadataBase: new URL(`${appConfig.domainUrl}/`),

    // Authors for article pages
    ...(authors
      ? { authors }
      : { authors: [{ name: appConfig.appName, url: appConfig.domainUrl }] }),

    creator: appConfig.appName,

    // Default OG image - add opengraph-image.(jpg|jpeg|png|gif) to /app folder for automatic OG images
    // Default Twitter image - add twitter-image.(jpg|jpeg|png|gif) to /app folder for automatic Twitter images
    ...(openGraph?.images && {
      openGraph: {
        images: openGraph.images,
        type: openGraph?.type || "website",
        locale: openGraph?.locale || "en_US",
        title: openGraph?.title || appConfig.appName,
        url: openGraph?.url || `${appConfig.domainUrl}/`,
        siteName: openGraph?.siteName || appConfig.appName,
        description: openGraph?.description || appConfig.appDescription
      },

      twitter: {
        creator: "@saaspilot",
        images: openGraph.images,
        card: "summary_large_image",
        title: openGraph?.title || appConfig.appName,
        description: openGraph?.description || appConfig.appDescription
      }
    }),

    // Adds a canonical URL if provided
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative }
    }),

    // Merge any extra tags
    ...extraTags
  };
}

/** ===============================================
 * Generates viewport metadata for Next.js pages.
 * ===============================================
 */
export function getViewportMetadata(): Viewport {
  return {
    initialScale: 1,
    userScalable: true,
    viewportFit: "cover",
    width: "device-width",
    colorScheme: "light dark",
    themeColor: [
      {
        color: appConfig.colors.primary,
        media: "(prefers-color-scheme: light)"
      },
      {
        color: appConfig.colors.primary,
        media: "(prefers-color-scheme: dark)"
      }
    ]
  };
}

/**
 * Usage examples:
 *
 * Basic usage in page.tsx:
 * ```
 * export const metadata = constructMetadata({
 *   title: "Page Title",
 *   description: "Page description",
 *    openGraph: {
 *       type: "article",
 *       images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: post.title }]
 *    },
 * canonicalUrlRelative: "/"
 * });
 *
 *
 *  Only need in layout.tsx
 * export const viewport = getViewportMetadata();
 *
 * ```
 */
