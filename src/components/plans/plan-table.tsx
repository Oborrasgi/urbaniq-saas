"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { type Plan } from "@/types/plan";
import { PlanDeleteButton } from "./plan-delete-button";

interface PlanTableProps {
  plans: Plan[];
}

export function PlanTable({ plans }: PlanTableProps) {
  return (
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
          {plans.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-muted-foreground h-24 text-center">
                No plans found. Create your first plan to get started.
              </TableCell>
            </TableRow>
          ) : (
            plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="p-4 font-medium">{plan.title}</TableCell>
                <TableCell className="p-4">{plan.mode}</TableCell>

                <PriceCell
                  price={plan.monthlyPrice}
                  isVisible={Boolean(plan.mode === "SUBSCRIPTION" && plan.monthlyPrice)}
                />

                <PriceCell
                  price={plan.yearlyPrice}
                  isVisible={Boolean(plan.mode === "SUBSCRIPTION" && plan.yearlyPrice)}
                />

                <PriceCell
                  price={plan.price!}
                  isVisible={Boolean(plan.mode === "ONE_TIME_PAYMENT" && plan.price)}
                />

                <TableCell className="p-4">
                  <Badge variant={plan.isActive ? "default" : "outline"}>
                    {plan.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                <TableCell className="space-x-2 p-4 text-center">
                  <Link href={`/dashboard/plans/${plan.slug}`}>
                    <Button variant="outline" size="sm" title="Edit Plan">
                      <Pencil className="text-muted-foreground size-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>

                  <PlanDeleteButton slug={plan.slug} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function PriceCell({ isVisible, price }: { isVisible: boolean; price: number }) {
  return (
    <TableCell className="p-4">
      {isVisible ? `$${price}` : <span className="text-muted-foreground">—</span>}
    </TableCell>
  );
}
