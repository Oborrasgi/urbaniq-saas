import {
  BarChart3,
  Calendar,
  DollarSign,
  Settings,
  TrendingUp,
  UserCheck,
  Users
} from "lucide-react";
import { Metadata } from "next";

import { DashboardTitle } from "@/components/dashboard-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users } from "@/data/users";
import { getCurrentUser } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Dashboard | UrbanIQ – Inteligencia Inmobiliaria"
});

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  // Calculate metrics from user data
  const totalUsers = users.length;

  const activeSubscriptions = users.filter((user) => user.hasAccess && user.subscribedAt).length;
  const totalRevenue = activeSubscriptions * 29; // Assuming $29 average

  const recentUsers = users
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: "Usuarios Totales",
      value: totalUsers.toString(),
      icon: Users,
      description: "+12% from last month",
      trend: "up"
    },
    {
      title: "Suscripciones Activas",
      value: activeSubscriptions.toString(),
      icon: UserCheck,
      description: "+8% from last month",
      trend: "up"
    },
    {
      title: "Ingresos Mensuales",
      value: `${totalRevenue.toLocaleString()} €`,
      icon: DollarSign,
      description: "+15% from last month",
      trend: "up"
    },
    {
      title: "Crecimiento",
      value: "23%",
      icon: TrendingUp,
      description: "+5% from last month",
      trend: "up"
    }
  ];

  const quickActions = [
    { label: "Usuarios", icon: Users, variant: "default" as const },
    { label: "Analítica", icon: BarChart3, variant: "outline" as const },
    { label: "Programar Informe", icon: Calendar, variant: "outline" as const },
    { label: "Configuración", icon: Settings, variant: "outline" as const }
  ];

  return (
    <>
      <DashboardTitle
        heading={`Hola, ${currentUser?.name}`}
        text="Bienvenido a UrbanIQ. Aquí tienes el resumen de tu plataforma inmobiliaria."
      />

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-base font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="text-primary size-5" />
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <TrendingUp className="size-3 text-green-500" />
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="shadow-none lg:col-span-2">
          <CardHeader>
            <CardTitle>Usuarios Recientes</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={user.image || undefined} />
                      <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-muted-foreground text-xs">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {user.isAdmin && <Badge variant="outline">Admin</Badge>}

                    <Badge variant={user.hasAccess ? "default" : "secondary"}>
                      {user.hasAccess ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <Button
                  size="lg"
                  key={action.label}
                  variant={action.variant}
                  className="w-full justify-start shadow-none"
                >
                  <action.icon className="me-2 size-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics Row */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card className="gap-4 shadow-none">
          <CardHeader>
            <CardTitle>Planes de Suscripción</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Starter UrbanIQ</span>
              <Badge variant="secondary">
                {users.filter((u) => u.priceId === "price_basic").length}
              </Badge>
            </div>

            <div className="flex justify-between">
              <span className="text-sm">Pro UrbanIQ</span>
              <Badge variant="secondary">
                {users.filter((u) => u.priceId === "price_pro").length}
              </Badge>
            </div>

            <div className="flex justify-between">
              <span className="text-sm">Enterprise</span>
              <Badge variant="secondary">
                {users.filter((u) => u.priceId === "price_enterprise").length}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-4 shadow-none">
          <CardHeader>
            <CardTitle>Estado de Usuarios</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Verificados</span>
              <Badge variant="default">{users.filter((u) => u.emailVerified).length}</Badge>
            </div>

            <div className="flex justify-between">
              <span className="text-sm">Pendientes</span>
              <Badge variant="outline">{users.filter((u) => !u.emailVerified).length}</Badge>
            </div>

            <div className="flex justify-between">
              <span className="text-sm">Administradores</span>
              <Badge variant="secondary">{users.filter((u) => u.isAdmin).length}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-4 shadow-none">
          <CardHeader>
            <CardTitle>Este Mes</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Nuevos Registros</span>
              <span className="text-sm font-medium text-green-500">
                +{Math.floor(totalUsers * 0.15)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm">Usuarios Perdidos</span>
              <span className="text-sm font-medium text-red-500">
                -{Math.floor(totalUsers * 0.05)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm">Crecimiento Neto</span>
              <span className="text-sm font-medium text-green-500">
                +{Math.floor(totalUsers * 0.1)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
