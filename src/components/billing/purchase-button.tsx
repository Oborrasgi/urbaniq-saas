"use client";

import { ArrowRight, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";

import { createCheckoutSessionAction } from "@/actions/payment-actions";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config";
import { browserConsoleError, cn } from "@/lib/utils";

export function PurchaseButton({
  priceId,
  className = ""
}: {
  priceId: string;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const session = useSession();

  const handlePurchaseClick = useCallback(() => {
    if (!session.data) {
      redirect(appConfig.auth.login);
    }

    // Handle the checkout process
    startTransition(async () => {
      const result = await createCheckoutSessionAction(priceId);

      if (result.status === "success" && result.url) {
        window.location.href = result.url; // Redirect to the stripe checkout page
      } else {
        const message = result.message || "Failed to create checkout session";
        toast.error(message);
        browserConsoleError(message);
      }
    });
  }, [session.data, priceId]);

  return (
    <Button
      size="lg"
      className={cn("w-full rounded-lg px-12 py-6", className)}
      disabled={isPending}
      onClick={handlePurchaseClick}
    >
      {isPending && <Loader className="animate-spin" />}
      {isPending ? "Loading..." : "Get Started"}
      {!isPending && <ArrowRight className="opacity-80" size={18} />}
    </Button>
  );
}
