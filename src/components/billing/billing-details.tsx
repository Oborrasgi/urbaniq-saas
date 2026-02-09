import { Clock } from "lucide-react";

import { CustomerPortalButton } from "@/components/billing";
import { DashboardTitle } from "@/components/dashboard-title";
import { DashboardPlans } from "@/components/sections/pricing";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/config";
import { formatDate, isTrialPeriod } from "@/lib/utils";
import { User } from "@/types/user";

export function BillingDetails({ user }: { user: User }) {
  // If user has access (subscribed or purchased), show subscription management UI
  const plan = appConfig.stripe.plans.find((p) => p.priceId === user.priceId && user.hasAccess);

  let isCurrentUserOnTrialPeriod = false;

  // if user not subscribed or purchased we check is it on trail period or not.
  if (!plan) {
    isCurrentUserOnTrialPeriod = isTrialPeriod(user.createdAt);
  }

  if (plan) {
    return (
      <>
        <DashboardTitle
          heading="Billing Information"
          text="Manage your subscription and billing information"
        />

        <Card className="max-w-4xl px-6 shadow-none">
          <CardHeader className="px-0">
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Here is your activated current plan.</CardDescription>
          </CardHeader>

          <div className="overflow-clip rounded-lg border">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-muted/60 text-left">
                    <th className="text-muted-foreground min-w-72 px-4 py-3 font-medium">
                      Package
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-center font-medium">
                      Amount
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-center font-medium">
                      Purchased On
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-center font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="border-e px-4 py-3">{plan.title}</td>
                    <td className="border-e px-4 py-3 text-center">${plan.price}</td>
                    <td className="border-e px-4 py-3 text-center">
                      {user.subscribedAt ? formatDate(user.subscribedAt.toDateString()) : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={plan ? "default" : "destructive"}>
                        {plan ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <CustomerPortalButton />
          </div>
        </Card>
      </>
    );
  }

  // If user doesn't have access, show plans
  return (
    <>
      <DashboardTitle heading="Choose a Plan" text="Select a plan to access premium features" />

      <section className="w-full max-w-5xl">
        {isCurrentUserOnTrialPeriod && (
          <Alert variant="destructive" className="mb-8 items-center">
            <Clock size={18} />

            <AlertTitle>Trial Period Active</AlertTitle>

            <AlertDescription>
              You're currently on a trial period. Select a plan to continue accessing premium
              features when your trial ends.
            </AlertDescription>
          </Alert>
        )}

        <DashboardPlans />
      </section>
    </>
  );
}
