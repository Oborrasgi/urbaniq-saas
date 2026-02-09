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
  title: "UrbanIQ Dashboard | AI Real Estate Intelligence"
});

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  // Mock metrics (se conectarán a BD más adelante)
  const totalUsers = users.length;
  const activeSubscriptions = users.filter((user) => user.hasAccess).length;
  const totalRevenue = activeSubscriptions * 49;

  const recentUsers = users
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: "Property Owners Analyzed",
      value: totalUsers.toString(),
      icon: Users,
      description: "Captured via AI & inbound channels",
      trend: "up"
    },
    {
      title: "Active Intelligence Sessions",
      value: activeSubscriptions.toString(),
      icon: UserCheck,
      description: "Users with active access",
      trend: "up"
    },
    {
      title: "Monthly Intelligence Revenue",
      value: `€${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "Recurring SaaS income",
      trend: "up"
    },
    {
      title: "Market Growth Index",
      value: "23%",
      icon: TrendingUp,
      description: "UrbanIQ prediction engine",
      trend: "up"
    }
  ];

  const quickActions = [
    { label: "View Leads", icon: Users, variant: "default" as const },
    { label: "Market Analytics", icon: BarChart3, variant: "outline" as const },
    { label: "Schedule Valuation", icon: Calendar, variant: "outline" as const },
    { label: "Platform Settings", icon: Settings, variant: "outline" as const }
  ];

  return (
    <>
      <DashboardTitle
        heading={`Welcome back, ${currentUser?.name}`}
        text="This is your UrbanIQ control center. Real estate intelligence powered by AI."
      />

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="text-primary size-5" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-none">
          <CardHeader>
            <CardTitle>Latest Property Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Badge variant={user.hasAccess ? "default" : "secondary"}>
                  {user.hasAccess ? "Active Insight" : "Pending"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                size="lg"
                variant={action.variant}
                className="w-full justify-start"
              >
                <action.icon className="mr-2 size-4" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}