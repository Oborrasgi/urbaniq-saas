import { DashboardTitle } from "@/components/dashboard-title";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BillingLoading() {
  return (
    <>
      <DashboardTitle
        heading="Subscription & Access"
        text="Manage your UrbanIQ plan, billing, and AI access"
      />

      <Card className="max-w-4xl px-6 shadow-none">
        <CardHeader className="px-0">
          <CardTitle>Active UrbanIQ Plan</CardTitle>
          <CardDescription>Your current subscription and access level</CardDescription>
        </CardHeader>

        <div className="overflow-clip rounded-lg border">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-muted/60 text-left">
                  <th className="text-muted-foreground min-w-72 px-4 py-3 font-medium">Plan</th>
                  <th className="text-muted-foreground px-4 py-3 text-center font-medium">
                    Price
                  </th>
                  <th className="text-muted-foreground px-4 py-3 text-center font-medium">
                    Activated On
                  </th>
                  <th className="text-muted-foreground px-4 py-3 text-center font-medium">
                    Access Status
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
