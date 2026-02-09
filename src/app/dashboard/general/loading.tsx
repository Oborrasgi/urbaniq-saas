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
    <Card className="max-w-3xl shadow-none">
      <CardHeader>
        <CardTitle>Personal information</CardTitle>
        <CardDescription>Your main account information</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar Field */}
        <div className="flex items-center gap-4">
          <Skeleton className="size-16 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-9 w-[120px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>

        <Separator />

        {/* Name Field */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-[50px]" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-[280px]" />
        </div>

        <Separator />

        {/* Email Field */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-[320px]" />
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="mt-4 h-10 w-[140px]" />
      </CardFooter>
    </Card>
  );
}
