"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import UserOverview from "@/components/dashboard/user/dashboard/UserOverview";

const Page = () => {
  const user = useSelector(selectCurrentUser);
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {fullName ? `Welcome back, ${fullName}!` : "User Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {user?.email
            ? `Signed in as ${user.email}. Here's an overview of your dining activity.`
            : "Welcome back! Here's an overview of your dining activity."}
        </p>
      </div>
      <UserOverview />
    </div>
  );
};

export default Page;
