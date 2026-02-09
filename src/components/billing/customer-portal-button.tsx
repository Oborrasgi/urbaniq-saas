"use client";

import { Loader } from "lucide-react";
import { useCallback, useTransition } from "react";

import { createCustomerPortalAction } from "@/actions/payment-actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CustomerPortalButton({ className = "" }: { className?: string }) {
  const [isPending, startTransition] = useTransition();

  const handlePortalClick = useCallback(() => {
    startTransition(async () => {
      const result = await createCustomerPortalAction();

      if (result.status === "success" && result.data?.url) {
        window.location.href = result.data.url;
      } else {
        console.error("Failed to create customer portal session", result);
      }
    });
  }, []);

  return (
    <Button
      className={cn("px-4 py-2", className)}
      disabled={isPending}
      onClick={handlePortalClick}
    >
      {isPending && <Loader className="me-2 size-4 animate-spin" />}
      Manage Subscription
    </Button>
  );
}