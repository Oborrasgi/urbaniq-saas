"use client";

import { Mail, ShieldAlert, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { sendVerificationEmail } from "@/actions/email-verification-actions";

export function VerifyEmailTopbar({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendVerificationEmail = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await sendVerificationEmail(email);

      if (result?.error) {
        toast.error("Email verification failed", {
          description: result.error
        });
        return;
      }

      setIsSent(true);

      toast.success("Verification email sent", {
        description: "Check your inbox to activate your UrbanIQ account."
      });
    } catch (error) {
      toast.error("Unexpected error", {
        description: "Unable to send verification email."
      });
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  return (
    <div className="relative w-full border-b bg-amber-50/60 dark:bg-amber-500/10 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-center gap-3 px-4 py-3 text-sm">
        <ShieldAlert className="size-4 text-amber-600 dark:text-amber-400" />

        <span className="font-medium text-amber-800 dark:text-amber-300">
          Your email is not verified.
        </span>

        <span className="text-amber-700/80 dark:text-amber-300/70">
          Verify to unlock full UrbanIQ access.
        </span>

        <Button
          size="sm"
          variant="outline"
          className="ms-2 border-amber-500 text-amber-700 hover:bg-amber-100 dark:border-amber-400 dark:text-amber-300 dark:hover:bg-amber-500/20"
          disabled={isLoading || isSent}
          onClick={handleSendVerificationEmail}
        >
          {isLoading && <Loader2 className="me-2 size-4 animate-spin" />}
          {!isLoading && !isSent && <Mail className="me-2 size-4" />}
          {isSent ? "Email Sent" : "Resend Email"}
        </Button>
      </div>
    </div>
  );
}
