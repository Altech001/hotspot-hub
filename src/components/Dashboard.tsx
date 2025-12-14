import { Users, Ticket, Wifi, DollarSign, Activity, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  const recentActivity = [
    { id: 1, action: "Voucher redeemed", user: "User_8842", time: "2 min ago", status: "success" },
    { id: 2, action: "New location added", user: "Admin", time: "15 min ago", status: "info" },
    { id: 3, action: "Router rebooted", user: "System", time: "1 hour ago", status: "warning" },
    { id: 4, action: "Voucher expired", user: "User_7721", time: "2 hours ago", status: "error" },
    { id: 5, action: "Config backup created", user: "Admin", time: "3 hours ago", status: "success" },
  ];

  const statusColors = {
    success: "bg-success",
    info: "bg-primary",
    warning: "bg-warning",
    error: "bg-destructive",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your hotspot network</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Users"
          value="1,284"
          icon={Users}
          trend={{ value: 12, label: "from last week" }}
          variant="success"
        />
        <StatCard
          title="Total Vouchers"
          value="8,429"
          icon={Ticket}
          trend={{ value: 8, label: "from last month" }}
        />
        <StatCard
          title="Online Routers"
          value="24/28"
          icon={Wifi}
          variant="warning"
        />
        <StatCard
          title="Revenue"
          value="$12,840"
          icon={DollarSign}
          trend={{ value: 23, label: "from last month" }}
          variant="success"
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Status */}
        <Card className="lg:col-span-2 glass-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Activity className="w-5 h-5 text-primary" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Bandwidth Used", value: "847 GB", max: "1 TB" },
                { label: "Avg Response", value: "24ms", max: "100ms" },
                { label: "Uptime", value: "99.8%", max: "100%" },
                { label: "Connections", value: "1,284", max: "5,000" },
              ].map((metric, i) => (
                <div key={i} className="bg-secondary/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-xl font-bold text-foreground">{metric.value}</p>
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(parseInt(metric.value) / parseInt(metric.max)) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">of {metric.max}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${statusColors[activity.status as keyof typeof statusColors]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
