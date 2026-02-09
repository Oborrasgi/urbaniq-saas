"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { forgotPasswordSchema, ForgotPasswordSchema } from "@/lib/zod-schemas";

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    toast.error("Password reset unavailable", {
      description: "UrbanIQ demo mode does not send reset emails yet."
    });
  });

  if (isSubmitted) {
    return (
      <div className="grid gap-6 text-center">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Check your inbox</h2>
          <p className="text-muted-foreground text-sm">
            If an UrbanIQ account exists for this email, a password reset link has been sent.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            If you don’t see the email, check your spam folder or try again.
          </p>

          <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
            Resend email
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-primary hover:text-foreground text-sm underline underline-offset-4"
            >
              Back to UrbanIQ login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold md:text-2xl">Reset your UrbanIQ password</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email address and we’ll send you a secure reset link.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@mail.com" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader className="me-3 animate-spin" />}
            Send reset link
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Link
          href="/login"
          className="text-primary hover:text-foreground text-sm underline underline-offset-4"
        >
          Back to UrbanIQ login
        </Link>
      </div>
    </div>
  );
}
