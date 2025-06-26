import BookingSummary from "@/components/dashboard/admin/booking/BookingSummary";
import BookingTable from "@/components/dashboard/admin/booking/BookingTable";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-2">
            Admin dashboard for managing all bookings
          </p>
        </div>
      </div>
      <BookingSummary />
      <BookingTable />
    </div>
  );
};

export default page;
