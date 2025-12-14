import { useState } from "react";
import { Globe, Monitor, Lock, Unlock, ExternalLink, RefreshCw, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface RemoteSession {
  id: string;
  routerName: string;
  ip: string;
  status: "connected" | "disconnected";
  lastAccess: string;
  user: string;
}

export function RemoteAccess() {
  const { toast } = useToast();
  const [remoteEnabled, setRemoteEnabled] = useState(true);
  const [ddnsEnabled, setDdnsEnabled] = useState(true);

  const [sessions] = useState<RemoteSession[]>([
    { id: "1", routerName: "Main Router", ip: "192.168.1.1", status: "connected", lastAccess: "Now", user: "admin" },
    { id: "2", routerName: "Branch A Router", ip: "192.168.2.1", status: "disconnected", lastAccess: "2 hours ago", user: "admin" },
    { id: "3", routerName: "Branch B Router", ip: "192.168.3.1", status: "disconnected", lastAccess: "1 day ago", user: "tech-support" },
  ]);

  const handleConnect = (routerName: string) => {
    toast({
      title: "Connecting...",
      description: `Establishing secure connection to ${routerName}`,
    });
  };

  const handleGenerateKey = () => {
    toast({
      title: "API Key Generated",
      description: "Your new API key has been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Remote Access</h2>
        <p className="text-muted-foreground">Manage remote connections to your routers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Card */}
        <Card className="glass-card border-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="w-5 h-5 text-primary" />
              Remote Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Remote Access</p>
                <p className="text-sm text-muted-foreground">Enable remote management</p>
              </div>
              <Switch checked={remoteEnabled} onCheckedChange={setRemoteEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">DDNS Service</p>
                <p className="text-sm text-muted-foreground">Dynamic DNS updates</p>
              </div>
              <Switch checked={ddnsEnabled} onCheckedChange={setDdnsEnabled} />
            </div>

            <div className="pt-4 border-t border-border space-y-4">
              <div className="space-y-2">
                <Label>DDNS Hostname</Label>
                <Input 
                  value="hotspot-pro.ddns.net" 
                  readOnly 
                  className="bg-secondary/50 border-border font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Remote Port</Label>
                <Input 
                  value="8291" 
                  className="bg-secondary/50 border-border font-mono text-sm"
                />
              </div>
              <Button variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Update DDNS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sessions Card */}
        <Card className="glass-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Monitor className="w-5 h-5 text-primary" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessions.map((session) => (
              <div 
                key={session.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    session.status === "connected" 
                      ? "bg-success/10" 
                      : "bg-muted"
                  }`}>
                    {session.status === "connected" ? (
                      <Unlock className="w-5 h-5 text-success" />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{session.routerName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs font-mono text-primary">{session.ip}</code>
                      <span className="text-xs text-muted-foreground">• {session.user}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge 
                      variant="outline" 
                      className={session.status === "connected" 
                        ? "text-success border-success/30" 
                        : "text-muted-foreground border-muted"
                      }
                    >
                      {session.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{session.lastAccess}</p>
                  </div>
                  <Button 
                    variant={session.status === "connected" ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleConnect(session.routerName)}
                  >
                    {session.status === "connected" ? (
                      <>Disconnect</>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* API Access */}
      <Card className="glass-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Key className="w-5 h-5 text-primary" />
            API Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input 
                  value="https://api.hotspot-pro.ddns.net/v1" 
                  readOnly 
                  className="bg-secondary/50 border-border font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Current API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password"
                    value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxx" 
                    readOnly 
                    className="bg-secondary/50 border-border font-mono text-sm"
                  />
                  <Button variant="outline" onClick={handleGenerateKey}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Quick Integration</h4>
              <pre className="text-xs font-mono text-muted-foreground bg-background/50 p-3 rounded overflow-x-auto">
{`curl -X GET \\
  https://api.hotspot-pro.ddns.net/v1/vouchers \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
