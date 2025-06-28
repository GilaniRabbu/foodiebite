/* eslint-disable */
"use client";
import React, { useState } from "react";
import { useGetPaginatedBookingsQuery } from "@/redux/api/bookingApi";
import { Clock3, Trash, Calendar } from "lucide-react";
import Loader from "@/components/shared/Loader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const BookingTable = () => {
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
    <div className="space-y-6">
      <Card className="shadow-none rounded-sm">
        <CardContent className="py-2 px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-700">All Bookings</h2>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border px-3 py-2 rounded text-sm cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none rounded-sm">
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Date & Time</TableHead>
                  <TableHead className="font-semibold">Guests</TableHead>
                  <TableHead className="font-semibold">Total</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bookings.map((booking: any) => (
                  <TableRow key={booking._id} className="hover:bg-muted/50">
                    <TableCell>
                      <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.reservationDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock3 className="w-4 h-4" />
                        {booking.reservationTime}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {booking.numberOfGuests}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        ${booking.total}
                      </span>
                    </TableCell>
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
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          console.log("Delete booking", booking._id)
                        }
                        className="cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
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

export default BookingTable;
