import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChangePasswordLoading() {
  return (
    <Card className="max-w-2xl shadow-none">
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="mt-4 h-10 w-[180px]" />
      </CardFooter>
    </Card>
  );
}

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChangePasswordLoading() {
  return (
    <Card className="max-w-2xl border-border/50 bg-background shadow-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold">
          <Skeleton className="h-5 w-48" />
        </CardTitle>
        <Skeleton className="h-4 w-72" />
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Skeleton className="h-10 w-44 rounded-md" />
      </CardFooter>
    </Card>
  );
}