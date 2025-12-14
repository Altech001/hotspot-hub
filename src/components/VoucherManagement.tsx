import { useState } from "react";
import { Upload, Plus, Search, Filter, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Voucher {
  id: string;
  code: string;
  duration: string;
  bandwidth: string;
  status: "active" | "used" | "expired";
  createdAt: string;
  location: string;
}

export function VoucherManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [vouchers] = useState<Voucher[]>([
    { id: "1", code: "HSP-AXBQ-2847", duration: "1 Hour", bandwidth: "5 Mbps", status: "active", createdAt: "2024-01-15", location: "Main Office" },
    { id: "2", code: "HSP-KFNM-9912", duration: "24 Hours", bandwidth: "10 Mbps", status: "used", createdAt: "2024-01-14", location: "Branch A" },
    { id: "3", code: "HSP-PQWX-5533", duration: "7 Days", bandwidth: "20 Mbps", status: "active", createdAt: "2024-01-13", location: "Main Office" },
    { id: "4", code: "HSP-LMRT-7741", duration: "30 Days", bandwidth: "50 Mbps", status: "expired", createdAt: "2024-01-10", location: "Branch B" },
    { id: "5", code: "HSP-ZVBN-3328", duration: "1 Hour", bandwidth: "5 Mbps", status: "active", createdAt: "2024-01-15", location: "Branch A" },
  ]);

  const handleImportMikhmon = () => {
    toast({
      title: "Import from Mikhmon",
      description: "Please upload your Mikhmon voucher export file (.csv)",
    });
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied!",
      description: "Voucher code copied to clipboard",
    });
  };

  const statusStyles = {
    active: "bg-success/20 text-success border-success/30",
    used: "bg-muted text-muted-foreground border-muted",
    expired: "bg-destructive/20 text-destructive border-destructive/30",
  };

  const filteredVouchers = vouchers.filter(v => 
    v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Voucher Management</h2>
          <p className="text-muted-foreground">Create, import and manage vouchers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportMikhmon}>
            <Upload className="w-4 h-4 mr-2" />
            Import Mikhmon
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Generate Vouchers
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <Card className="glass-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search vouchers by code or location..."
                className="pl-10 bg-secondary/50 border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card border-success/20 bg-success/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Vouchers</p>
            <p className="text-3xl font-bold text-success">1,842</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Used Today</p>
            <p className="text-3xl font-bold text-foreground">127</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Expired</p>
            <p className="text-3xl font-bold text-destructive">45</p>
          </CardContent>
        </Card>
      </div>

      {/* Voucher Table */}
      <Card className="glass-card border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="text-foreground">All Vouchers</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Code</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Duration</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Bandwidth</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Location</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVouchers.map((voucher) => (
                  <tr key={voucher.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <code className="font-mono text-sm text-primary bg-primary/10 px-2 py-1 rounded">
                        {voucher.code}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{voucher.duration}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{voucher.bandwidth}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{voucher.location}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={statusStyles[voucher.status]}>
                        {voucher.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCopyCode(voucher.code, voucher.id)}
                        >
                          {copiedId === voucher.id ? (
                            <Check className="w-4 h-4 text-success" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
