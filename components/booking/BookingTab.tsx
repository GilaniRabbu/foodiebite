/* eslint-disable */
"use client";
import React, { useState } from "react";
import { useGetPaginatedBookingsQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";

const BookingTab = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const limit = 4;

  const { data, isLoading, isError } = useGetPaginatedBookingsQuery({
    page,
    limit,
    ...(status && { status }), // Only add status if it's selected
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1); // reset to page 1 on filter change
    setStatus(e.target.value);
  };

  if (isLoading) return <Loader />;
  if (isError || !data?.data)
    return <p className="text-red-500">Failed to load bookings.</p>;

  const { data: bookings, meta } = data;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-700">My Bookings</h2>
        <select
          value={status}
          onChange={handleStatusChange}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <table className="min-w-full border border-gray-200 text-left">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            <th className="p-3">Meals</th>
            <th className="p-3">Guests</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking: any) => (
            <tr key={booking._id} className="border-t text-sm">
              <td className="p-3">
                {new Date(booking.reservationDate).toLocaleDateString()}
              </td>
              <td className="p-3">{booking.reservationTime}</td>
              <td className="p-3">
                <ul className="list-disc list-inside space-y-1">
                  {booking.mealIds.map((meal: any) => (
                    <li key={meal._id}>
                      {meal.name} (${meal.price})
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-3">{booking.numberOfGuests}</td>
              <td className="p-3 font-semibold text-green-700">
                ${booking.total}
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    booking.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span className="text-gray-600 text-sm pt-2">
          Page {meta?.page} of {Math.ceil(meta.total / limit)}
        </span>
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= Math.ceil(meta.total / limit)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingTab;
