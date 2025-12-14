import { useState } from "react";
import { Palette, Eye, Download, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface VoucherTemplate {
  id: string;
  name: string;
  headerText: string;
  footerText: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  showLogo: boolean;
  showQR: boolean;
}

export function TemplateDesigner() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<VoucherTemplate[]>([
    {
      id: "1",
      name: "Default Template",
      headerText: "WiFi Hotspot Voucher",
      footerText: "Thank you for using our service!",
      backgroundColor: "#1a1f2e",
      textColor: "#ffffff",
      accentColor: "#22d3ee",
      showLogo: true,
      showQR: true,
    },
    {
      id: "2",
      name: "Premium Gold",
      headerText: "Premium WiFi Access",
      footerText: "Enjoy unlimited browsing!",
      backgroundColor: "#1c1c1c",
      textColor: "#d4af37",
      accentColor: "#ffd700",
      showLogo: true,
      showQR: true,
    },
  ]);

  const [activeTemplate, setActiveTemplate] = useState<VoucherTemplate>(templates[0]);

  const handleTemplateChange = (field: keyof VoucherTemplate, value: string | boolean) => {
    setActiveTemplate(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveTemplate = () => {
    setTemplates(prev => 
      prev.map(t => t.id === activeTemplate.id ? activeTemplate : t)
    );
    toast({
      title: "Template Saved",
      description: "Your voucher template has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Template Designer</h2>
          <p className="text-muted-foreground">Design and customize voucher templates</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <Card className="glass-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Palette className="w-5 h-5 text-primary" />
              Template Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Template Selection */}
            <div className="space-y-2">
              <Label>Select Template</Label>
              <div className="flex gap-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant={activeTemplate.id === template.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTemplate(template)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>

            <Tabs defaultValue="content" className="space-y-4">
              <TabsList className="bg-secondary/50 border border-border">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={activeTemplate.name}
                    onChange={(e) => handleTemplateChange("name", e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="header-text">Header Text</Label>
                  <Input
                    id="header-text"
                    value={activeTemplate.headerText}
                    onChange={(e) => handleTemplateChange("headerText", e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-text">Footer Text</Label>
                  <Textarea
                    id="footer-text"
                    value={activeTemplate.footerText}
                    onChange={(e) => handleTemplateChange("footerText", e.target.value)}
                    className="bg-secondary/50 border-border resize-none"
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="bg-color"
                        value={activeTemplate.backgroundColor}
                        onChange={(e) => handleTemplateChange("backgroundColor", e.target.value)}
                        className="w-12 h-10 p-1 bg-transparent border-border cursor-pointer"
                      />
                      <Input
                        value={activeTemplate.backgroundColor}
                        onChange={(e) => handleTemplateChange("backgroundColor", e.target.value)}
                        className="bg-secondary/50 border-border font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="text-color"
                        value={activeTemplate.textColor}
                        onChange={(e) => handleTemplateChange("textColor", e.target.value)}
                        className="w-12 h-10 p-1 bg-transparent border-border cursor-pointer"
                      />
                      <Input
                        value={activeTemplate.textColor}
                        onChange={(e) => handleTemplateChange("textColor", e.target.value)}
                        className="bg-secondary/50 border-border font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="accent-color"
                        value={activeTemplate.accentColor}
                        onChange={(e) => handleTemplateChange("accentColor", e.target.value)}
                        className="w-12 h-10 p-1 bg-transparent border-border cursor-pointer"
                      />
                      <Input
                        value={activeTemplate.accentColor}
                        onChange={(e) => handleTemplateChange("accentColor", e.target.value)}
                        className="bg-secondary/50 border-border font-mono"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="options" className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Show Logo</p>
                    <p className="text-sm text-muted-foreground">Display company logo on voucher</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={activeTemplate.showLogo}
                    onChange={(e) => handleTemplateChange("showLogo", e.target.checked)}
                    className="w-5 h-5 accent-primary"
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-foreground">Show QR Code</p>
                    <p className="text-sm text-muted-foreground">Include QR code for easy login</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={activeTemplate.showQR}
                    onChange={(e) => handleTemplateChange("showQR", e.target.checked)}
                    className="w-5 h-5 accent-primary"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button onClick={handleSaveTemplate} className="flex-1">
                Save Template
              </Button>
              <Button variant="outline">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="glass-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Eye className="w-5 h-5 text-primary" />
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
              {/* Voucher Preview */}
              <div 
                className="w-80 rounded-xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: activeTemplate.backgroundColor }}
              >
                {/* Header */}
                <div 
                  className="p-4 text-center"
                  style={{ borderBottom: `2px solid ${activeTemplate.accentColor}` }}
                >
                  {activeTemplate.showLogo && (
                    <div 
                      className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center text-lg font-bold"
                      style={{ backgroundColor: activeTemplate.accentColor, color: activeTemplate.backgroundColor }}
                    >
                      HP
                    </div>
                  )}
                  <h3 
                    className="text-lg font-bold"
                    style={{ color: activeTemplate.textColor }}
                  >
                    {activeTemplate.headerText}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="text-center">
                    <p 
                      className="text-xs uppercase tracking-wider mb-1"
                      style={{ color: activeTemplate.accentColor }}
                    >
                      Access Code
                    </p>
                    <p 
                      className="font-mono text-2xl font-bold tracking-widest"
                      style={{ color: activeTemplate.textColor }}
                    >
                      HSP-DEMO-1234
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4" style={{ borderTop: `1px solid ${activeTemplate.accentColor}33` }}>
                    <div className="text-center">
                      <p className="text-xs" style={{ color: `${activeTemplate.textColor}88` }}>Duration</p>
                      <p className="font-semibold" style={{ color: activeTemplate.textColor }}>24 Hours</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs" style={{ color: `${activeTemplate.textColor}88` }}>Speed</p>
                      <p className="font-semibold" style={{ color: activeTemplate.textColor }}>10 Mbps</p>
                    </div>
                  </div>

                  {activeTemplate.showQR && (
                    <div className="flex justify-center pt-4">
                      <div 
                        className="w-20 h-20 rounded-lg flex items-center justify-center text-xs"
                        style={{ backgroundColor: activeTemplate.textColor, color: activeTemplate.backgroundColor }}
                      >
                        QR Code
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div 
                  className="p-3 text-center text-xs"
                  style={{ backgroundColor: `${activeTemplate.accentColor}22`, color: `${activeTemplate.textColor}aa` }}
                >
                  {activeTemplate.footerText}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Full Preview
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
