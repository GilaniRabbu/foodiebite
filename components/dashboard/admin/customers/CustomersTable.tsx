/* eslint-disable */
"use client";
import React, { useState } from "react";
import { useGetPaginatedBookingsQuery } from "@/redux/api/bookingApi";
import { Calendar, Clock3, Mail, Phone, User } from "lucide-react";
import Loader from "@/components/shared/Loader";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CustomerTable = () => {
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data, isLoading, isError } = useGetPaginatedBookingsQuery({
    page,
    limit,
  });

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
      <div className="py-3 border-b space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">Customers Details</h1>
      </div>

      {/* Card List */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking: any) => (
              <TableRow key={booking._id}>
                <TableCell>
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <User className="w-5 h-5 text-indigo-600" />
                    {booking.firstName} {booking.lastName}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm">{booking.email}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm">{booking.phone}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm">
                      {new Date(booking.reservationDate).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock3 className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm">{booking.reservationTime}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm font-medium text-indigo-600">
                    ${booking.total}{" "}
                    <span className="text-xs text-gray-500">
                      ({booking.type})
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-4">
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
