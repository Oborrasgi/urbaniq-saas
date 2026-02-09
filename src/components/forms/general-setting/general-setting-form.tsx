"use client";

import { Loader, Mail, Save } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/user";

import { useGeneralSettingForm } from "./use-general-setting-form";

export function GeneralSettingForm({ user }: { user: User }) {
  const { form, isUploading, avatarPreview, isSubmitting, handleFileChange, onSubmit } =
    useGeneralSettingForm({ user });

  return (
    <Card className="max-w-3xl shadow-none">
      <CardHeader>
        <CardTitle>Personal information</CardTitle>
        <CardDescription>Your main account information</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Avatar Field */}
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt={user?.name || ""} />
                ) : (
                  <AvatarFallback className="text-xl">
                    {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="avatar-upload"
                  className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader className="me-2 size-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Change avatar"
                  )}
                </label>

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />

                <FormDescription className="mt-1 text-xs">
                  JPG, GIF or PNG. 1MB Max.
                </FormDescription>
              </div>
            </div>

            <Separator />

            {/* Name Field */}
            <div className="space-y-2">
              <FormLabel>Name</FormLabel>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Your name as it appears across the platform</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Email Field */}
            <div className="space-y-2">
              <FormLabel>Email address</FormLabel>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input value={user?.email || ""} className="ps-10" disabled />
              </div>
              <FormDescription>Used to sign in and for important notifications</FormDescription>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button onClick={() => onSubmit()} disabled={isSubmitting || isUploading} className="mt-4">
          {isSubmitting ? (
            <>
              <Loader className="me-2 size-4 animate-spin" />
              Saving changes...
            </>
          ) : (
            <>
              <Save className="me-2 size-4" />
              Save changes
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
