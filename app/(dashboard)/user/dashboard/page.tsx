import Overview from "@/components/dashboard/user/dashboard/Overview";
import QuickActions from "@/components/dashboard/user/dashboard/QuickActions";
import RecentBooking from "@/components/dashboard/user/dashboard/RecentBooking";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6 ">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your dining activity.</p>
      </div>
      <Overview />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentBooking />
        <QuickActions />
      </div>
    </div>
  );
};

export default page;
