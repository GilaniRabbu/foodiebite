/* eslint-disable */
"use client";
import React from "react";
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
// import { Button } from "@/components/ui/button";

const CustomerTable = () => {
  // const [page, setPage] = useState(1);
  // const limit = 4;

  const { data, isLoading, isError } = useGetPaginatedBookingsQuery({
    page: 1,
    limit: 1000,
  });

  if (isLoading) return <Loader />;
  if (isError || !data?.data)
    return (
      <p className="text-center text-red-500 font-medium">
        Failed to load bookings.
      </p>
    );

  // const { data: bookings, meta } = data;

  const { data: bookings } = data;

  // Group bookings by email
  const groupedByEmail: Record<string, any[]> = bookings.reduce(
    (acc: Record<string, any[]>, booking: any) => {
      if (!acc[booking.email]) {
        acc[booking.email] = [];
      }
      acc[booking.email].push(booking);
      return acc;
    },
    {}
  );

  // Sort each customer's bookings by reservationDate
  Object.values(groupedByEmail).forEach((group) =>
    group.sort(
      (a, b) =>
        new Date(a.reservationDate).getTime() -
        new Date(b.reservationDate).getTime()
    )
  );

  return (
    <div className="space-y-10 mb-5">
      <div className="py-4 border-b">
        <h1 className="text-3xl font-bold text-gray-900">Customers Details</h1>
      </div>

      {Object.entries(groupedByEmail).map(([email, bookings]) => {
        const { firstName, lastName, phone } = bookings[0];
        return (
          <div key={email} className="space-y-4 p-4 border rounded-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                <p className="text-sm sm:text-lg font-semibold text-gray-800">
                  {firstName} {lastName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
                <p className="text-sm sm:text-lg font-semibold text-muted-foreground">
                  {email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
                <p className="text-sm sm:text-lg font-semibold text-muted-foreground">
                  {phone}
                </p>
              </div>
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
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          {new Date(
                            booking.reservationDate
                          ).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock3 className="w-4 h-4 text-indigo-500" />
                          {booking.reservationTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        {booking.numberOfGuests}{" "}
                        <span className="text-xs text-gray-600">
                          ({booking.type})
                        </span>
                      </TableCell>
                      <TableCell>$ {booking.total}</TableCell>
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

              {/* Summary */}
              <div className="space-y-2 text-sm mt-4 pt-4 border-t">
                <p className="font-medium text-gray-700">
                  Total Orders:{" "}
                  <span className="font-bold">{bookings.length}</span>
                </p>
                <p className="font-medium text-gray-700">
                  Total Spend:{" "}
                  <span className="font-bold">
                    $
                    {bookings.reduce(
                      (acc: number, curr: any) => acc + Number(curr.total),
                      0
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}

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
      </div> */}

      {/* Pagination */}
      {/* <div className="mt-8 flex items-center justify-center gap-4">
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
      </div> */}
    </div>
  );
};

export default CustomerTable;
