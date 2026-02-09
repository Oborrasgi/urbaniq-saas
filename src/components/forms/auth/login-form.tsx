"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Alert, AlertTitle } from "@/components/ui/alert";
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

import { appConfig } from "@/config";
import { cn } from "@/lib/utils";
import { LoginSchema, loginSchema } from "@/lib/zod-schemas";

import { GoogleLogin } from "./google-login";

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className = "" }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const error = searchParams.get("error");

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      password: values.password,
      email: values.email.toLowerCase(),
      redirectTo: searchParams.get("redirectTo") || appConfig.auth.afterLogin
    });

    if (result?.error) {
      toast.error("Something went wrong.", {
        description: "Your sign-in request failed. Please try again."
      });

      setIsLoading(false);
      return;
    }

    toast.success("Logged in successfully", {
      description: "Bienvenido a UrbanIQ. Tu panel está listo."
    });

    router.push(result.url!);
  });

  return (
    <div className={cn("grid gap-6", className)}>
      {/* if error is OAuthAccountNotLinked, show the alert */}
      {error && error === "OAuthAccountNotLinked" && (
        <Alert variant="destructive">
          <AlertCircle className="size-5" />
          <AlertTitle>An account with this email already exists.</AlertTitle>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <FormLabel htmlFor="email" className="pb-3">
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="johndoe@mail.com" autoComplete="email" {...field} />
                  </FormControl>

                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <div className="flex items-center justify-between pb-3">
                    <FormLabel htmlFor="password">Password</FormLabel>

                    <Link
                      href="/forgot-password"
                      className="text-primary hover:text-foreground text-sm underline underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="********"
                        autoComplete="password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeIcon className="text-muted-foreground size-4" />
                        ) : (
                          <EyeOffIcon className="text-muted-foreground size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
              {isSubmitting && <Loader className="me-3 animate-spin" />}
              Acceder a UrbanIQ
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">O accede con</span>
        </div>
      </div>

      <GoogleLogin
        type="login"
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
