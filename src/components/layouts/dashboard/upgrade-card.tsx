"use client";

import { ArrowRight, Crown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";

export function UpgradeCard() {
  const { state } = useSidebar();

  // Hide the upgrade card when the sidebar is collapsed
  if (state === "collapsed") return null;

  return (
    <Card className="bg-muted/50 rounded-lg border-1 p-4 shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="flex gap-4">
          <Crown size={16} className="text-primary" />
          <span className="text-primary text-sm font-medium">On Trial</span>
        </CardTitle>

        <CardDescription className="text-muted-foreground text-sm">
          Unlock all features and get unlimited access to our support team.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 pt-2">
        <Link href="/dashboard/billing">
          <Button size="sm" className="w-full">
            Upgrade
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
