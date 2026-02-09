"use client";

import { Loader } from "lucide-react";
import { useCallback, useTransition } from "react";

import { createCustomerPortalAction } from "@/actions/payment-actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CustomerPortalButton({ className = "" }: { className?: string }) {
  const [isPending, startTransition] = useTransition();

  const handlePortalClick = useCallback(() => {
    // Handle the customer portal process
    startTransition(async () => {
      const result = await createCustomerPortalAction();
      if (result.status === "success" && result.url) {
        // Redirect to the Stripe customer portal
        window.location.href = result.url;
      } else {
        // Handle error (could show a toast notification here)
        console.log("Failed to create customer portal session");
      }
    });
  }, []);

  return (
    <Button className={cn("px-4 py-2", className)} disabled={isPending} onClick={handlePortalClick}>
      {isPending && <Loader className="me-2 size-4 animate-spin" />}
      Manage Subscription
    </Button>
  );
}
