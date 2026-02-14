import { ArrowRight, FileQuestion } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PlanNotFound() {
  return (
    <Card className="mx-auto flex min-h-[420px] max-w-2xl flex-col items-center justify-center space-y-6 text-center shadow-none">
      <FileQuestion className="text-muted-foreground size-16" />

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Plan de suscripción no disponible
        </h2>

        <p className="text-muted-foreground mx-auto max-w-md text-sm">
          El plan que intentas consultar no está activo en este momento.
          Actualmente solo el plan <span className="font-medium text-foreground">UrbanIQ Professional (€100/mes)</span> está disponible para contratación.
        </p>

        <p className="text-muted-foreground mx-auto max-w-md text-sm">
          Si estás probando URLs manualmente o editando planes, verifica el <span className="font-medium text-foreground">slug</span> configurado en el panel de administración.
        </p>
      </div>

      <Link href="/dashboard/plans">
        <Button className="gap-2">
          Volver a los planes activos
          <ArrowRight className="size-4" />
        </Button>
      </Link>
    </Card>
  );
}
