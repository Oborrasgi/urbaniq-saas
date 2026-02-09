"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { sendVerificationEmail } from "@/actions/email-verification-actions";

export function VerifyEmailTopbar({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendVerificationEmail = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await sendVerificationEmail(email);

      if (result.error) {
        toast.error("Failed to resend email", {
          description: result.error
        });
        return;
      }

      toast.success("Verification email sent!", {
        description: "Please check your email for the verification link."
      });
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Failed to resend verification email"
      });
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  return (
    <div className="bg-card flex w-full items-center justify-center border-b px-4 py-3">
      <CheckCircle className="text-muted-foreground size-4" />
      <span className="text-muted-foreground ms-2 text-sm font-medium">
        Verify your email address to continue.
      </span>

      <Button size="sm" variant="link" disabled={isLoading} onClick={handleSendVerificationEmail}>
        {isLoading && <Loader2 className="me-2 size-4 animate-spin" />}
        Send email
      </Button>
    </div>
  );
}
