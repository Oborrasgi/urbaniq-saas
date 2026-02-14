import { DashboardTitle } from "@/components/dashboard-title";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersLoading() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Gestión de Usuarios"
        text="Administra los usuarios registrados en UrbanIQ y controla sus permisos y planes activos"
      />

      <Card className="w-full shadow-none">
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-10 w-[280px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[160px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[140px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
