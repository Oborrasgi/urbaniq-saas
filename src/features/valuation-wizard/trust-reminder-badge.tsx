import React from "react";
import { BadgeX, Clock, Shield } from "lucide-react";

export function TrustReminderBadge() {
  return (
    <div
      aria-label="Datos protegidos RGPD - Respuesta en 24h - Sin llamada de venta"
      className="inline-flex w-fit max-w-full flex-wrap items-center gap-2 rounded-full border border-slate-200/70 bg-slate-100/70 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
    >
      <span className="inline-flex items-center gap-1">
        <Shield className="size-3.5 text-[#2F80ED]" aria-hidden="true" />
        Datos protegidos RGPD
      </span>
      <span className="hidden h-3 w-px bg-slate-300 sm:block" aria-hidden="true" />
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3.5 text-[#2F80ED]" aria-hidden="true" />
        Respuesta en 24h
      </span>
      <span className="hidden h-3 w-px bg-slate-300 sm:block" aria-hidden="true" />
      <span className="inline-flex items-center gap-1">
        <BadgeX className="size-3.5 text-[#7C3AED]" aria-hidden="true" />
        Sin llamada de venta
      </span>
    </div>
  );
}
