import { DashboardTitle } from "@/components/dashboard-title";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function PlansLoading() {
  return (
    <div className="space-y-6">
      <DashboardTitle heading="Pricing Plans" text="Manage your pricing plans for your system" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-12 px-4">Plan Name</TableHead>
              <TableHead className="h-12 px-4">Type</TableHead>
              <TableHead className="h-12 px-4">Monthly Price</TableHead>
              <TableHead className="h-12 px-4">Annual Price</TableHead>
              <TableHead className="h-12 px-4">One-time Price</TableHead>
              <TableHead className="h-12 px-4">Status</TableHead>
              <TableHead className="h-12 px-4 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="p-4 font-medium">
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>

                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>

                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[70px]" />
                </TableCell>

                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[70px]" />
                </TableCell>

                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[70px]" />
                </TableCell>

                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[60px]" />
                </TableCell>

                <TableCell className="space-x-2 p-4 text-center">
                  <Skeleton className="inline-block size-9" />
                  <Skeleton className="inline-block size-9" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import { DashboardTitle } from "@/components/dashboard-title";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function PlansLoading() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="UrbanIQ Plans"
        text="Manage your UrbanIQ subscription plans"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-12 px-4">Plan</TableHead>
              <TableHead className="h-12 px-4">Target</TableHead>
              <TableHead className="h-12 px-4">Monthly Price</TableHead>
              <TableHead className="h-12 px-4">Status</TableHead>
              <TableHead className="h-12 px-4 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="p-4 font-medium">
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>

                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[140px]" />
                </TableCell>

                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[90px]" />
                </TableCell>

                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>

                <TableCell className="space-x-2 p-4 text-center">
                  <Skeleton className="inline-block size-9" />
                  <Skeleton className="inline-block size-9" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}