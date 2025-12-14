import { useState } from "react";
import { MapPin, Plus, MoreVertical, Wifi, WifiOff, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Location {
  id: string;
  name: string;
  address: string;
  status: "online" | "offline" | "warning";
  routers: number;
  activeUsers: number;
  routerIp: string;
}

export function LocationManagement() {
  const [locations] = useState<Location[]>([
    { id: "1", name: "Main Office", address: "123 Business Ave, Downtown", status: "online", routers: 5, activeUsers: 245, routerIp: "192.168.1.1" },
    { id: "2", name: "Branch A - Mall", address: "456 Shopping Center, West Side", status: "online", routers: 3, activeUsers: 89, routerIp: "192.168.2.1" },
    { id: "3", name: "Branch B - Airport", address: "789 Airport Terminal 2", status: "warning", routers: 8, activeUsers: 512, routerIp: "192.168.3.1" },
    { id: "4", name: "Branch C - Hotel", address: "321 Luxury Hotel, Beach Road", status: "offline", routers: 12, activeUsers: 0, routerIp: "192.168.4.1" },
    { id: "5", name: "Café Partner", address: "555 Coffee Street", status: "online", routers: 2, activeUsers: 34, routerIp: "192.168.5.1" },
  ]);

  const statusConfig = {
    online: { icon: Wifi, color: "text-success", bg: "bg-success/10", label: "Online" },
    offline: { icon: WifiOff, color: "text-destructive", bg: "bg-destructive/10", label: "Offline" },
    warning: { icon: Wifi, color: "text-warning", bg: "bg-warning/10", label: "Issues" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Locations</h2>
          <p className="text-muted-foreground">Manage your hotspot locations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>Add a new hotspot location to your network</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Location Name</Label>
                <Input id="name" placeholder="e.g., Main Office" className="bg-secondary/50 border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Full address" className="bg-secondary/50 border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="router-ip">Router IP</Label>
                <Input id="router-ip" placeholder="192.168.1.1" className="bg-secondary/50 border-border font-mono" />
              </div>
              <Button className="w-full">Add Location</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="glass-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{locations.length}</p>
                <p className="text-sm text-muted-foreground">Total Locations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-success/20 bg-success/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{locations.filter(l => l.status === "online").length}</p>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-warning/20 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{locations.filter(l => l.status === "warning").length}</p>
                <p className="text-sm text-muted-foreground">Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{locations.filter(l => l.status === "offline").length}</p>
                <p className="text-sm text-muted-foreground">Offline</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {locations.map((location) => {
          const status = statusConfig[location.status];
          const StatusIcon = status.icon;
          
          return (
            <Card key={location.id} className="glass-card border-border hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${status.bg} flex items-center justify-center`}>
                      <StatusIcon className={`w-5 h-5 ${status.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground">{location.name}</CardTitle>
                      <Badge variant="outline" className={`mt-1 ${status.color} border-current/30`}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {location.address}
                </p>
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{location.routers}</p>
                    <p className="text-xs text-muted-foreground">Routers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{location.activeUsers}</p>
                    <p className="text-xs text-muted-foreground">Users</p>
                  </div>
                  <div className="text-center">
                    <code className="text-xs font-mono text-primary">{location.routerIp}</code>
                    <p className="text-xs text-muted-foreground">Gateway</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
