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

  // const { data: bookings, meta } = data;

  const { data: rawBookings, meta } = data;

  // Group bookings by email
  const bookingsByEmail: Record<string, any[]> = rawBookings.reduce(
    (acc: any, booking: any) => {
      if (!acc[booking.email]) {
        acc[booking.email] = [];
      }
      acc[booking.email].push(booking);
      return acc;
    },
    {} as Record<string, any[]>
  );

  return (
    <div className="space-y-6">
      <div className="py-3 border-b space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">Customers Details</h1>
      </div>

      {Object.entries(bookingsByEmail).map(([email, bookings]) => (
        <div key={email} className="mb-10 border rounded-md p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-indigo-700">
              {bookings[0].firstName} {bookings[0].lastName}
            </h2>
            <p className="text-sm text-gray-600">{email}</p>
            <p className="text-sm text-gray-600">{bookings[0].phone}</p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...bookings]
                  .sort(
                    (a, b) =>
                      new Date(a.reservationDate).getTime() -
                      new Date(b.reservationDate).getTime()
                  )
                  .map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell>
                        {new Date(booking.reservationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{booking.reservationTime}</TableCell>
                      <TableCell>{booking.numberOfGuests}</TableCell>
                      <TableCell>${booking.total}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            booking.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : booking.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
      {/* Card List */}
      {/* <div className="overflow-x-auto">
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
            {/* {bookings.map((booking: any) => (
            {[...bookings]
              .sort(
                (a, b) =>
                  new Date(a.reservationDate).getTime() -
                  new Date(b.reservationDate).getTime()
              )
              .filter(
                (booking, index, self) =>
                  index === self.findIndex((b) => b.email === booking.email)
              )
              .map((booking: any) => (
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
      </div> */}

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
