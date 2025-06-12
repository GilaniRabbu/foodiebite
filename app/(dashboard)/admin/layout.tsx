

import AdminSidebar from "@/components/dashboard/shared/AdminSidebar";
import AdminTopNavbar from "@/components/dashboard/shared/AdminTopNavbar";
import React from "react";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Sidebar: fixed only on large screens */}
      <div className="lg:fixed lg:z-50 ">
        <AdminSidebar />
      </div>

      {/* Main content: pushed right on lg screens */}
      <div className="lg:pl-48 flex flex-col min-h-screen">
        <AdminTopNavbar />
        <main className="px-5 pt-20 pb-5 flex-1">{children}</main>
      </div>
    </div>
  );
}
