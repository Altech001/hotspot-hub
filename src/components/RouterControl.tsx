import { useState } from "react";
import { 
  Router, 
  Power, 
  RefreshCw, 
  Network, 
  HardDrive, 
  Cpu, 
  Thermometer,
  Activity,
  Settings,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DHCPLease {
  id: string;
  mac: string;
  ip: string;
  hostname: string;
  expires: string;
}

export function RouterControl() {
  const { toast } = useToast();
  const [selectedRouter, setSelectedRouter] = useState("main");
  const [isRebooting, setIsRebooting] = useState(false);

  const routers = [
    { id: "main", name: "Main Router", ip: "192.168.1.1", model: "MikroTik RB4011", status: "online" },
    { id: "branch-a", name: "Branch A Router", ip: "192.168.2.1", model: "MikroTik hAP ac²", status: "online" },
    { id: "branch-b", name: "Branch B Router", ip: "192.168.3.1", model: "MikroTik RB3011", status: "warning" },
  ];

  const dhcpLeases: DHCPLease[] = [
    { id: "1", mac: "AA:BB:CC:DD:EE:01", ip: "192.168.1.100", hostname: "johns-laptop", expires: "23:45:12" },
    { id: "2", mac: "AA:BB:CC:DD:EE:02", ip: "192.168.1.101", hostname: "iphone-sarah", expires: "22:30:45" },
    { id: "3", mac: "AA:BB:CC:DD:EE:03", ip: "192.168.1.102", hostname: "android-mike", expires: "21:15:30" },
    { id: "4", mac: "AA:BB:CC:DD:EE:04", ip: "192.168.1.103", hostname: "printer-office", expires: "20:00:00" },
    { id: "5", mac: "AA:BB:CC:DD:EE:05", ip: "192.168.1.104", hostname: "smart-tv", expires: "19:45:22" },
  ];

  const handleReboot = () => {
    setIsRebooting(true);
    toast({
      title: "Rebooting Router",
      description: "The router will be back online in approximately 60 seconds.",
    });
    setTimeout(() => {
      setIsRebooting(false);
      toast({
        title: "Router Online",
        description: "Router has been successfully rebooted.",
      });
    }, 3000);
  };

  const currentRouter = routers.find(r => r.id === selectedRouter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Router Control</h2>
        <p className="text-muted-foreground">Manage router settings, DHCP, and system controls</p>
      </div>

      {/* Router Selection */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {routers.map((router) => (
          <Button
            key={router.id}
            variant={selectedRouter === router.id ? "default" : "outline"}
            onClick={() => setSelectedRouter(router.id)}
            className="whitespace-nowrap"
          >
            <Router className="w-4 h-4 mr-2" />
            {router.name}
            <Badge 
              variant="outline" 
              className={`ml-2 ${
                router.status === "online" 
                  ? "text-success border-success/30" 
                  : "text-warning border-warning/30"
              }`}
            >
              {router.status}
            </Badge>
          </Button>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary/50 border border-border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dhcp">DHCP</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Router Info */}
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Router className="w-5 h-5 text-primary" />
                {currentRouter?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium text-foreground">{currentRouter?.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IP Address</p>
                  <code className="font-mono text-primary">{currentRouter?.ip}</code>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="font-medium text-foreground">14d 7h 32m</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Firmware</p>
                  <p className="font-medium text-foreground">RouterOS 7.12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">CPU Usage</p>
                    <p className="text-xl font-bold text-foreground">23%</p>
                    <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "23%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <HardDrive className="w-5 h-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Memory</p>
                    <p className="text-xl font-bold text-foreground">512 MB</p>
                    <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-warning rounded-full" style={{ width: "65%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Thermometer className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="text-xl font-bold text-foreground">42°C</p>
                    <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: "42%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Bandwidth</p>
                    <p className="text-xl font-bold text-foreground">847 Mbps</p>
                    <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isRebooting}>
                    <Power className="w-4 h-4 mr-2" />
                    {isRebooting ? "Rebooting..." : "Reboot Router"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reboot Router?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will temporarily disconnect all users. The router will be back online in approximately 60 seconds.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-secondary border-border">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReboot} className="bg-destructive text-destructive-foreground">
                      Reboot
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Status
              </Button>
              <Button variant="outline">
                <Terminal className="w-4 h-4 mr-2" />
                Open Terminal
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DHCP Tab */}
        <TabsContent value="dhcp" className="space-y-6">
          <Card className="glass-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Network className="w-5 h-5 text-primary" />
                DHCP Server Settings
              </CardTitle>
              <Badge variant="outline" className="text-success border-success/30">Active</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>DHCP Pool Range</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 font-mono text-sm text-foreground">
                      192.168.1.100
                    </code>
                    <span className="text-muted-foreground">-</span>
                    <code className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 font-mono text-sm text-foreground">
                      192.168.1.250
                    </code>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Lease Time</Label>
                  <code className="block bg-secondary/50 border border-border rounded-lg px-3 py-2 font-mono text-sm text-foreground">
                    24 hours
                  </code>
                </div>
                <div className="space-y-2">
                  <Label>DNS Servers</Label>
                  <code className="block bg-secondary/50 border border-border rounded-lg px-3 py-2 font-mono text-sm text-foreground">
                    8.8.8.8, 8.8.4.4
                  </code>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Switch id="dhcp-enabled" defaultChecked />
                  <Label htmlFor="dhcp-enabled">DHCP Server Enabled</Label>
                </div>
                <Button variant="outline">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* DHCP Leases */}
          <Card className="glass-card border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="text-foreground">Active DHCP Leases</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">MAC Address</th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">IP Address</th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Hostname</th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Expires In</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dhcpLeases.map((lease) => (
                      <tr key={lease.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4">
                          <code className="font-mono text-sm text-muted-foreground">{lease.mac}</code>
                        </td>
                        <td className="px-6 py-4">
                          <code className="font-mono text-sm text-primary">{lease.ip}</code>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{lease.hostname}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{lease.expires}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Board Name", value: "RB4011iGS+5HacQ2HnD" },
                  { label: "Architecture", value: "arm" },
                  { label: "RouterOS Version", value: "7.12 (stable)" },
                  { label: "Firmware Type", value: "ipq4019" },
                  { label: "Factory Software", value: "7.1" },
                  { label: "Total HDD Space", value: "16 MiB" },
                  { label: "Free HDD Space", value: "8.4 MiB" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-mono text-sm text-foreground">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check for Updates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <HardDrive className="w-4 h-4 mr-2" />
                  Backup Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Restore Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <Power className="w-4 h-4 mr-2" />
                  Factory Reset
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
