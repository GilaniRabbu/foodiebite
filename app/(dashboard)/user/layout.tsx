import Sidebar from "@/components/dashboard/shared/Sidebar";
import TopNavbar from "@/components/dashboard/shared/TopNavbar";
import React from "react";

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Sidebar: fixed only on large screens */}
      <div className="lg:fixed lg:z-50 lg:w-64">
        <Sidebar />
      </div>

      {/* Main content: pushed right on lg screens */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopNavbar />
        <main className="px-5 pt-20 pb-5 flex-1">{children}</main>
      </div>
    </div>
  );
}
