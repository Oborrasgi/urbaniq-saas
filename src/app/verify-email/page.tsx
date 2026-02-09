"use client";

import { CheckCircle, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const token = searchParams.get("token");

  const handleVerifyEmail = useCallback(async () => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`);
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Your email has been verified successfully!");

        // Redirect to homepage after 3 seconds
        const redirectTimeout = setTimeout(() => {
          window.location.href = "/";
        }, 3000);

        return () => clearTimeout(redirectTimeout);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to verify email");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred while verifying your email");
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    // if token is exists then run this function
    if (token) {
      handleVerifyEmail();
    }
  }, [handleVerifyEmail, token]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Email Verification</CardTitle>

          <CardDescription>
            {status === "loading" && "Verifying your email address..."}
            {status === "success" && "Email verified successfully!"}
            {status === "error" && "Verification failed"}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          {/* If the verification is still loading, show a loading spinner. */}
          {status === "loading" && (
            <div className="flex justify-center">
              <Loader2 className="text-primary size-8 animate-spin" />
            </div>
          )}

          {/* If the verification is successful, show a success message and a link to the login page. */}
          {status === "success" && (
            <div className="space-y-4">
              <CheckCircle className="mx-auto size-12 text-green-600" />
              <p className="text-green-600">{message}</p>
              <p className="text-muted-foreground text-sm">
                Redirecting to homepage in 3 seconds...
              </p>

              <Button asChild>
                <Link href="/">Continue to Homepage</Link>
              </Button>
            </div>
          )}

          {/* If the verification fails, show an error message and a link to the login page. */}
          {status === "error" && (
            <div className="space-y-4">
              <div className="space-y-3 py-5">
                <XCircle className="mx-auto size-12 text-red-600" />
                <p className="text-red-600">{message}</p>
              </div>

              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/register">Back to Registration</Link>
                </Button>

                <Button asChild className="w-full">
                  <Link href="/login">Go to Login</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
