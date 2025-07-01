import React from "react";
import UserOverview from "@/components/dashboard/user/dashboard/UserOverview";

const page = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your dining activity.
        </p>
      </div>
      <UserOverview />
    </div>
  );
};

export default page;
