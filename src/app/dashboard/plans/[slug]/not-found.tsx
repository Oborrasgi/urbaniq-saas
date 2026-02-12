import { ArrowRight, FileQuestion } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";

export default async function PlanNotFound() {
  const user = await getCurrentUser();

  // 🔐 Hard protection: only ADMIN can access plan management
  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <Card className="mx-auto flex min-h-[400px] max-w-2xl flex-col items-center justify-center space-y-4 text-center">
      <FileQuestion className="text-muted-foreground size-16" />

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Plan Not Found
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2/3">
          The pricing plan you're looking for doesn't exist or has been removed.
        </p>
      </div>

      <Link href="/dashboard/plans">
        <Button>
          View All Plans <ArrowRight className="size-4" />
        </Button>
      </Link>
    </Card>
  );
}
