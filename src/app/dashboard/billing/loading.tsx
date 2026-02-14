import { DashboardTitle } from "@/components/dashboard-title";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BillingLoading() {
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
                  <th className="text-muted-foreground min-w-72 px-4 py-3 font-medium">Package</th>
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
                  <td className="border-e px-4 py-3">
                    <Skeleton className="h-5 w-32" />
                  </td>
                  <td className="border-e px-4 py-3 text-center">
                    <Skeleton className="mx-auto h-5 w-16" />
                  </td>
                  <td className="border-e px-4 py-3 text-center">
                    <Skeleton className="mx-auto h-5 w-24" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Skeleton className="mx-auto h-6 w-16 rounded-full" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </Card>
    </>
  );
}
