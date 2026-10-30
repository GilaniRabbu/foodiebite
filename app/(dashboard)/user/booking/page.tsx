"use client";
import BookingSummary from "@/components/dashboard/user/booking/BookingSummary";
import BookingTable from "@/components/dashboard/user/booking/BookingTable";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import React from "react";

const Page = () => {
  // Bookings are always looked up for the logged in user.
  const user = useSelector(selectCurrentUser);
  const userId = user?._id;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your reservations
          {user?.email ? ` for ${user.email}` : ""}
        </p>
      </div>
      {userId ? (
        <>
          <BookingSummary userId={userId} />
          <BookingTable userId={userId} />
        </>
      ) : null}
    </div>
  );
};

export default Page;
