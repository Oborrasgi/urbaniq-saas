"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { appConfig } from "@/config";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const cookieKey = appConfig.googleAnalytics.consent.cookieName;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Default deny until user explicitly accepts (GDPR compliant)
    if (window.gtag) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied"
      });
    }

    const savedConsent = localStorage.getItem(cookieKey);

    if (!savedConsent) {
      setIsVisible(true);
    } else if (savedConsent === "accepted" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted"
      });
    }
  }, [cookieKey]);

  const handleAccept = useCallback(() => {
    localStorage.setItem(cookieKey, "accepted");
    setIsVisible(false);

    // Here you can initialize your analytics/tracking
    // For example: Google Analytics, Facebook Pixel, etc.
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted"
      });
    }
  }, [cookieKey]);

  const handleDecline = useCallback(() => {
    localStorage.setItem(cookieKey, "declined");
    setIsVisible(false);

    // Disable analytics/tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied"
      });
    }
  }, [cookieKey]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    // Don't set localStorage, so banner will show again on next visit
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -100, scale: 0.9, filter: "blur(10px)" }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          className="bg-card/95 fixed end-4 bottom-4 z-50 me-4 max-w-sm rounded-xl border p-4 opacity-0 shadow-lg backdrop-blur-sm sm:me-auto md:max-w-md lg:max-w-lg"
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss cookie notice"
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground absolute top-2 right-2 rounded-md p-1 transition-colors"
          >
            <X className="size-4" />
          </button>

          {/* Content */}
          <div className="pr-8">
            <div className="mb-2 flex items-center gap-2">
              <div className="bg-primary/10 flex size-6 items-center justify-center rounded-full">
                <span className="text-xs">🍪</span>
              </div>

              <h3 id="cookie-consent-title" className="text-card-foreground font-medium">
                Cookie Notice
              </h3>
            </div>

            <p
              id="cookie-consent-description"
              className="text-muted-foreground mb-4 text-sm leading-relaxed"
            >
              We use analytics cookies to understand how visitors interact with UrbanIQ.
              These cookies help us improve performance, features, and user experience.
              You can accept or decline optional tracking at any time.
            </p>

            <p className="text-muted-foreground mb-4 text-xs">
              By clicking "Accept", you agree to our{" "}
              <a
                href="/privacy"
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                Privacy Policy
              </a>.
            </p>

            {/* Action buttons */}
            <div className="flex flex-row justify-end gap-2">
              <Button onClick={handleDecline} size="sm" variant="outline">
                Decline
              </Button>

              <Button onClick={handleAccept} size="sm">
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
