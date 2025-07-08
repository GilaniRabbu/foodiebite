/* eslint-disable */
"use client";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBookingsByUserIdQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";
import dayjs from "dayjs";

type Props = {
  userId: string;
};

type BookingRow = {
  _id: string;
  total: number;
  status: string;
  type?: string;
  mealCount: number;
  createdAt?: string;
};

export default function BookingTable({ userId }: Props) {
  const { data, isLoading, error } = useGetBookingsByUserIdQuery({
    userId,
    page: 1,
    limit: 100,
  });

  const rawBookings = data?.data || [];

  // 🧠 Transform bookings for the table
  const bookings: BookingRow[] = rawBookings.map((booking) => ({
    _id: booking._id,
    total: booking.total,
    status: booking.status,
    type: booking.type,
    mealCount: booking.mealIds.length,
    createdAt: booking.createdAt,
  }));

  const columns: ColumnDef<BookingRow>[] = [
    {
      accessorKey: "_id",
      header: "Booking ID",
      cell: ({ getValue }) => (
        <div className="text-xs truncate max-w-[200px]">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <div className="capitalize">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: "total",
      header: "Total ($)",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ getValue }) => getValue() ?? "N/A",
    },
    {
      accessorKey: "mealCount",
      header: "Meal Count",
    },
    {
      accessorKey: "reservationDate",
      header: "Date",
      cell: ({ getValue }) =>
        getValue() ? dayjs(getValue() as string).format("YYYY-MM-DD") : "N/A",
    },
  ];

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Loader />;
  if (error)
    return <div className="text-red-500">Failed to load Booking data.</div>;

  return (
    <div className="p-4 border shadow-none rounded-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">All Bookings (Table)</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
