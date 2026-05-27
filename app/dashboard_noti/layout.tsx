"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNotiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0b0912", color: "#F9F9FB", fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#1e1c31", borderRight: "1px solid #403d5c", padding: "24px 16px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "32px", color: "#C442F0", textAlign: "center" }}>Pianify Dashboard</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link 
            href="/dashboard_noti/templates" 
            style={{ 
              padding: "12px 16px", 
              borderRadius: "8px", 
              textDecoration: "none",
              color: pathname.includes("templates") ? "#fff" : "rgba(249, 249, 251, 0.7)",
              backgroundColor: pathname.includes("templates") ? "#C442F0" : "transparent",
              fontWeight: pathname.includes("templates") ? "600" : "500",
              transition: "all 0.2s"
            }}
          >
            📋 Quản lý Templates
          </Link>
          <Link 
            href="/dashboard_noti/campaigns" 
            style={{ 
              padding: "12px 16px", 
              borderRadius: "8px", 
              textDecoration: "none",
              color: pathname.includes("campaigns") ? "#fff" : "rgba(249, 249, 251, 0.7)",
              backgroundColor: pathname.includes("campaigns") ? "#C442F0" : "transparent",
              fontWeight: pathname.includes("campaigns") ? "600" : "500",
              transition: "all 0.2s"
            }}
          >
            🚀 Custom Campaigns
          </Link>
          <Link 
            href="/dashboard_noti/la_campaigns" 
            style={{ 
              padding: "12px 16px", 
              borderRadius: "8px", 
              textDecoration: "none",
              color: pathname.includes("la_campaigns") ? "#fff" : "rgba(249, 249, 251, 0.7)",
              backgroundColor: pathname.includes("la_campaigns") ? "#f59e0b" : "transparent",
              fontWeight: pathname.includes("la_campaigns") ? "600" : "500",
              transition: "all 0.2s"
            }}
          >
            ⏱️ Hẹn giờ Live Activity
          </Link>
          <Link 
            href="/dashboard_noti/la_automations" 
            style={{ 
              padding: "12px 16px", 
              borderRadius: "8px", 
              textDecoration: "none",
              color: pathname.includes("la_automations") ? "#fff" : "rgba(249, 249, 251, 0.7)",
              backgroundColor: pathname.includes("la_automations") ? "#8b5cf6" : "transparent",
              fontWeight: pathname.includes("la_automations") ? "600" : "500",
              transition: "all 0.2s"
            }}
          >
            🤖 Tự động hoá (Cron)
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "32px 48px", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}
