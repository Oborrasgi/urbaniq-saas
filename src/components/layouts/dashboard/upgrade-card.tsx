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
    <Card className="bg-gradient-to-br from-primary/10 via-background to-background rounded-xl border border-primary/20 p-4 shadow-sm">
      <CardHeader className="px-0 space-y-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Crown size={16} />
          UrbanIQ Pro
        </CardTitle>

        <CardDescription className="text-muted-foreground text-sm leading-relaxed">
          Activa AVM avanzado, Legal AI y Lead Scoring inteligente para maximizar
          tu captación inmobiliaria.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 pt-3">
        <Link href="/dashboard/billing">
          <Button size="sm" className="w-full group">
            Upgrade to Pro
            <ArrowRight
              size={14}
              className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
