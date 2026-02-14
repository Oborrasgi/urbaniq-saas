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

export default function BlogsLoading() {
  return (
    <div className="space-y-6">
      <DashboardTitle heading="Artículos" text="Gestiona los artículos del blog de UrbanIQ" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-12 px-4">Título</TableHead>
              <TableHead className="h-12 px-4">Descripción</TableHead>
              <TableHead className="h-12 px-4">Fecha de creación</TableHead>
              <TableHead className="h-12 px-4">Estado</TableHead>
              <TableHead className="h-12 px-4 text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="p-4 font-medium">
                  <Skeleton className="h-4 w-full max-w-xs" />
                </TableCell>

                <TableCell className="p-4">
                  <Skeleton className="h-4 w-full max-w-xs" />
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
