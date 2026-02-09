"use client";

import { Loader, Save } from "lucide-react";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { type Plan } from "@/types/plan";
import { usePlanForm } from "./use-plan-form";

export function PlanForm({ plan }: { plan?: Plan }) {
  const { form, onSubmit, isSubmitting, isSubscriptionMode } = usePlanForm({
    isEdit: !!plan,
    slug: plan?.slug,
    defaultValues: {
      title: plan?.title || "",
      description: plan?.description || "",
      mode: plan?.mode || "SUBSCRIPTION",
      price: plan?.price?.toString() || "",
      priceId: plan?.priceId || "",
      monthlyCredits: plan?.monthlyCredits?.toString() || "",
      yearlyCredits: plan?.yearlyCredits?.toString() || "",
      annualPrice: plan?.yearlyPrice?.toString() || "",
      monthlyPrice: plan?.monthlyPrice?.toString() || "",
      yearlyPriceId: plan?.yearlyPriceId || "",
      monthlyPriceId: plan?.monthlyPriceId || "",
      isActive: plan?.isActive || true
    }
  });

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Plan Details</CardTitle>
        <CardDescription>Enter the details for the new pricing plan</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <FormLabel>Plan Title</FormLabel>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Starter, Pro, Enterprise" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Plan Description</FormLabel>
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="e.g., This is a description of the plan" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isSubscriptionMode && (
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 space-y-2">
                  <FormLabel>Monthly Credits</FormLabel>
                  <FormField
                    name="monthlyCredits"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="number" placeholder="1000" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <FormLabel>Yearly Credits</FormLabel>
                  <FormField
                    name="yearlyCredits"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="number" placeholder="1000" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {isSubscriptionMode ? (
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 space-y-2">
                  <FormLabel>Monthly Price</FormLabel>
                  <FormField
                    name="monthlyPrice"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="number" placeholder="99" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <FormLabel>Annual Price</FormLabel>
                  <FormField
                    name="annualPrice"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="number" placeholder="99" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <FormLabel>Plan Price</FormLabel>
                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" placeholder="99" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {isSubscriptionMode ? (
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 space-y-2">
                  <FormLabel>Monthly Price ID</FormLabel>
                  <FormField
                    name="monthlyPriceId"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="price_xxxxxxxxxxxxx" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <FormLabel>Yearly Price ID</FormLabel>
                  <FormField
                    name="yearlyPriceId"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="price_xxxxxxxxxxxxx" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <FormLabel>Price ID</FormLabel>
                <FormField
                  name="priceId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="price_xxxxxxxxxxxxx" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="space-y-2 sm:w-1/2">
              <FormLabel>Payment Mode</FormLabel>
              <FormField
                name="mode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={cn(
                            "w-full",
                            form.formState.errors.mode && "border-destructive ring-destructive"
                          )}
                          aria-invalid={!!form.formState.errors.mode}
                        >
                          <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="SUBSCRIPTION">Subscription</SelectItem>
                          <SelectItem value="ONE_TIME_PAYMENT">One-time Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Active Plan</FormLabel>
              <FormField
                name="isActive"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button onClick={() => onSubmit()} disabled={isSubmitting}>
          {isSubmitting ? <Loader className="size-4 animate-spin" /> : <Save className="size-4" />}
          {isSubmitting ? "Saving plan..." : "Save plan"}
        </Button>
      </CardFooter>
    </Card>
  );
}
