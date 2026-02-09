"use client";

import { Eye, EyeOff, Loader, Lock, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useChangePasswordForm } from "./use-change-password-form";

export function ChangePasswordForm() {
  const {
    form,
    onSubmit,
    isSubmitting,
    showNewPassword,
    showCurrentPassword,
    showConfirmPassword,
    handleShowNewPassword,
    handleShowCurrentPassword,
    handleShowConfirmPassword
  } = useChangePasswordForm();

  return (
    <Card className="max-w-2xl shadow-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                      <Input
                        {...field}
                        type={showCurrentPassword ? "text" : "password"}
                        className="ps-10 pe-10"
                        placeholder="Enter your current password"
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={handleShowCurrentPassword}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                      <Input
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                        className="ps-10 pe-10"
                        placeholder="Enter your new password"
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={handleShowNewPassword}
                      >
                        {showNewPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        className="ps-10 pe-10"
                        placeholder="Confirm your new password"
                      />

                      <Button
                        size="sm"
                        type="button"
                        variant="ghost"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={handleShowConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button onClick={onSubmit} disabled={isSubmitting} className="mt-4">
          {isSubmitting ? (
            <>
              <Loader className="me-2 size-4 animate-spin" />
              Updating password...
            </>
          ) : (
            <>
              <Save className="me-2 size-4" />
              Update password
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
