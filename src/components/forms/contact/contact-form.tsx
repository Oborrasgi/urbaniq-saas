"use client";

import { Loader } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { useContactForm } from "./use-contact-form";

export function ContactForm() {
  const { onSubmit, isSubmitting, form } = useContactForm();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grid gap-0">
                <FormLabel htmlFor="email" className="pb-3">
                  First Name
                </FormLabel>

                <FormControl>
                  <Input placeholder="John" autoComplete="firstName" {...field} />
                </FormControl>

                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grid gap-0">
                <FormLabel htmlFor="lastName" className="pb-3">
                  Last Name
                </FormLabel>

                <FormControl>
                  <Input placeholder="Doe" autoComplete="lastName" {...field} />
                </FormControl>

                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
        </div>

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
          name="subject"
          render={({ field }) => (
            <FormItem className="grid gap-0">
              <FormLabel htmlFor="email" className="pb-3">
                Subject
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="How can we help?"
                  autoComplete="subject"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="grid gap-0">
              <FormLabel htmlFor="email" className="pb-3">
                Message
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={6}
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  {...field}
                />
              </FormControl>

              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting && <Loader className="me-3 animate-spin" />}
          Send Message
        </Button>
      </form>
    </Form>
  );
}
