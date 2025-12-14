import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { VoucherManagement } from "@/components/VoucherManagement";
import { LocationManagement } from "@/components/LocationManagement";
import { RouterControl } from "@/components/RouterControl";
import { TemplateDesigner } from "@/components/TemplateDesigner";
import { RemoteAccess } from "@/components/RemoteAccess";
import { ConfigFiles } from "@/components/ConfigFiles";
import { SettingsPanel } from "@/components/SettingsPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "vouchers":
        return <VoucherManagement />;
      case "locations":
        return <LocationManagement />;
      case "router":
        return <RouterControl />;
      case "templates":
        return <TemplateDesigner />;
      case "remote":
        return <RemoteAccess />;
      case "config":
        return <ConfigFiles />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <main className="ml-64 p-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Background Glow Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(187 85% 53% / 0.3), transparent 70%)" }}
        />
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(199 89% 48% / 0.3), transparent 70%)" }}
        />
      </div>
    </div>
  );
};

export default Index;
