/* eslint-disable */
"use client";
import React, { useState } from "react";
import { useGetPaginatedBookingsQuery } from "@/redux/api/bookingApi";
import { Calendar, Clock3, Mail, Phone, User } from "lucide-react";
import Loader from "@/components/shared/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CustomerTable = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const limit = 4;

  const { data, isLoading, isError } = useGetPaginatedBookingsQuery({
    page,
    limit,
    ...(status && { status }),
  });

  const handleStatusChange = (e: any) => {
    setPage(1);
    setStatus(e.target.value);
  };

  if (isLoading) return <Loader />;
  if (isError || !data?.data)
    return (
      <p className="text-center text-red-500 font-medium">
        Failed to load bookings.
      </p>
    );

  const { data: bookings, meta } = data;

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="py-3 border-b flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">Customers Details</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 px-4 py-2 rounded-md shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Card List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking: any) => (
          <Card key={booking._id} className="shadow-none rounded-md border">
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-3 text-gray-800">
                <User className="w-6 h-6 text-indigo-600" />
                {booking.firstName} {booking.lastName}
              </CardTitle>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm">{booking.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm">{booking.phone}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span className="text-sm">
                  {new Date(booking.reservationDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock3 className="w-5 h-5 text-indigo-500" />
                <span className="text-sm">{booking.reservationTime}</span>
              </div>
              <div className="text-lg font-semibold text-gray-800">
                Total: <span className="text-indigo-600">${booking.total}</span>
              </div>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1}
          className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Button>
        <span className="text-gray-700 text-sm">
          Page {meta?.page} of {Math.ceil(meta.total / limit)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= Math.ceil(meta.total / limit)}
          className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CustomerTable;
