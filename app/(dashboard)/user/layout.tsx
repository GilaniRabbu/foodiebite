
import UserSidebar from "@/components/dashboard/shared/UserSidebar";
import UserTopNavbar from "@/components/dashboard/shared/UserTopNavbar";
import React from "react";

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Sidebar: fixed only on large screens */}
      <div className="lg:fixed lg:z-50 ">
        <UserSidebar />
      </div>

      {/* Main content: pushed right on lg screens */}
      <div className="lg:pl-48 flex flex-col min-h-screen">
        <UserTopNavbar />
        <main className="px-5 pt-20 pb-5 flex-1 bg-[#f1f7f9]">{children}</main>
      </div>
    </div>
  );
}
