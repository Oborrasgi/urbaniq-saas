import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";

import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { Toaster } from "@/components/ui/sonner";
import { appConfig } from "@/config";
import { inter, jetBrainsMono } from "@/lib/fonts";
import { createMetadata, getViewportMetadata } from "@/lib/metadata";

import "./globals.css";

export const metadata: Metadata = createMetadata();
export const viewport: Viewport = getViewportMetadata();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jetBrainsMono.variable} antialiased`}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <SessionProvider>
            {children}

            <Toaster
              richColors
              toastOptions={{
                classNames: {
                  title: "truncate",
                  content: "truncate",
                  description: "truncate",
                  icon: "!flex !size-8 !items-center !justify-center",
                  success:
                    "!border-green-200 !bg-green-50 dark:!border-green-800 dark:!bg-green-950",
                  error: "!border-red-200 !bg-red-100 dark:!border-red-800 dark:!bg-red-950"
                }
              }}
            />

            <NextTopLoader
              height={2}
              shadow={false}
              showSpinner={false}
              color={appConfig.colors.primary}
            />

            <CookieConsentBanner />

            <Analytics />
            <GoogleAnalytics gaId={appConfig.googleAnalytics.id} />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
