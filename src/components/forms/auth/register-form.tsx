"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
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

import { cn } from "@/lib/utils";
import { registerSchema, RegisterSchema } from "@/lib/zod-schemas";

import { authRegisterAction } from "@/actions/register-actions";
import { GoogleLogin } from "./google-login";

interface RegisterFormProps {
  className?: string;
}

export function RegisterForm({ className = "" }: RegisterFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    const result = await authRegisterAction(values);

    if (result.status === "error") {
      toast.error("Something went wrong.", {
        description: result?.message || "No se pudo completar el registro. Inténtalo de nuevo."
      });

      return;
    }

    toast.success("Cuenta creada correctamente", {
      description: "Tu cuenta de UrbanIQ está lista. Inicia sesión para continuar."
    });

    router.push("/login");
  });

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <FormLabel htmlFor="name" className="pb-3">
                    Nombre completo
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Nombre y apellidos" autoComplete="name" {...field} />
                  </FormControl>

                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <FormLabel htmlFor="email" className="pb-3">
                    Correo electrónico
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
                  <FormLabel htmlFor="password" className="pb-3">
                    Contraseña
                  </FormLabel>

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <FormLabel htmlFor="confirmPassword" className="pb-3">
                    Confirmar contraseña
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="********"
                        autoComplete="password"
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
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
              Crear cuenta en UrbanIQ
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">O continúa con</span>
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
