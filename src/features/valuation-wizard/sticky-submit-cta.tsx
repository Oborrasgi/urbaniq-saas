"use client";

import React from "react";
import { Send } from "lucide-react";
import { RefObject, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type StickySubmitCtaProps = {
  enabled: boolean;
  isSubmitting: boolean;
  submitRef: RefObject<HTMLButtonElement | null>;
  onSubmit: () => void;
};

export function StickySubmitCta({
  enabled,
  isSubmitting,
  submitRef,
  onSubmit
}: StickySubmitCtaProps) {
  const [submitVisible, setSubmitVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    const button = submitRef.current;

    if (!button || typeof IntersectionObserver === "undefined") {
      setSubmitVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSubmitVisible(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.65 }
    );

    observer.observe(button);

    return () => observer.disconnect();
  }, [submitRef]);

  if (!isMobile && submitVisible) {
    return null;
  }

  return (
    <div className="sticky bottom-0 z-20 -mx-6 mt-6 border-t border-slate-200/80 bg-white/95 px-6 py-4 shadow-[0_-16px_40px_rgba(15,23,42,0.14)] backdrop-blur dark:border-white/10 dark:bg-slate-950/90">
      <button
        type="button"
        disabled={!enabled || isSubmitting}
        onClick={onSubmit}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all focus-visible:ring-4 focus-visible:ring-[#2F80ED]/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-55",
          enabled
            ? "bg-linear-to-r from-[#2F80ED] to-violet-600 hover:scale-[1.01] hover:shadow-xl"
            : "bg-slate-300 text-slate-500 shadow-none dark:bg-slate-700 dark:text-slate-300"
        )}
      >
        <Send className="size-4" aria-hidden="true" />
        {isSubmitting ? "Enviando valoración..." : "Enviar y recibir valoración en 24h"}
      </button>
      {!enabled && (
        <p className="mt-2 text-center text-xs text-slate-500">
          Completa nombre, teléfono y consentimiento principal para enviar.
        </p>
      )}
    </div>
  );
}
