import BookingSummary from "@/components/dashboard/user/booking/BookingSummary";
import BookingTable from "@/components/dashboard/user/booking/BookingTable";
import React from "react";

const page = () => {
  const userId = "686190f2a2fc79a924679593";
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="mt-2 text-muted-foreground">Manage your reservations</p>
      </div>
      <BookingSummary userId={userId} />
      <BookingTable userId={userId} />
    </div>
  );
};

export default page;
