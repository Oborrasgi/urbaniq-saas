"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type WhatHappensNextProps = {
  city: string;
  defaultOpen?: boolean;
};

export function WhatHappensNext({ city, defaultOpen = false }: WhatHappensNextProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm transition-colors dark:border-white/10 dark:bg-white/5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="what-happens-next-content"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-[#2F80ED] underline-offset-4 hover:underline"
      >
        ¿Qué pasa después de enviar?
        <ChevronDown
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <div
        id="what-happens-next-content"
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <ol className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li>1. Recibirás un email automático con tu valoración orientativa en 24h.</li>
            <li>
              2. Solo si autorizas el contacto, un agente colegiado de la red UrbanIQ en {city} te
              llamará para confirmar y ampliar datos.
            </li>
            <li>3. Sin compromiso. Puedes retirar tu consentimiento en cualquier momento.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
