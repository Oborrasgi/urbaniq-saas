import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function GeneralSettingsLoading() {
  return (
    <Card className="max-w-3xl border bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader className="space-y-2">
        <Skeleton className="h-7 w-[220px]" />
        <Skeleton className="h-4 w-[320px]" />
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Avatar Field */}
        <div className="flex items-center gap-5">
          <Skeleton className="size-20 rounded-full" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-9 w-[140px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </div>

        <Separator />

        {/* Name Field */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-[80px]" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-4 w-[300px]" />
        </div>

        <Separator />

        {/* Email Field */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-[120px]" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-4 w-[340px]" />
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="h-11 w-[160px]" />
      </CardFooter>
    </Card>
  );
}
