"use client";

import { useState } from "react";
import { Calendar, Clock, Users, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BookingTable() {
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [searchTerm, setSearchTerm] = useState("");

  const bookings = [
    {
      id: 1,
      date: "2024-01-15",
      time: "7:00 PM",
      guests: 4,
      status: "confirmed",
      table: "Table 5",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "8:30 PM",
      guests: 2,
      status: "pending",
      table: "Table 2",
    },
    {
      id: 3,
      date: "2024-01-16",
      time: "6:00 PM",
      guests: 6,
      status: "confirmed",
      table: "Table 8",
    },
    {
      id: 4,
      date: "2024-01-16",
      time: "7:30 PM",
      guests: 3,
      status: "confirmed",
      table: "Table 3",
    },
    {
      id: 5,
      date: "2024-01-17",
      time: "8:00 PM",
      guests: 2,
      status: "cancelled",
      table: "Table 1",
    },
  ];

  // Filter bookings by table search term
  const filteredBookings = bookings.filter((booking) =>
    booking.table.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const getStatusVariant = (status: string) => {
  //   switch (status) {
  //     case "confirmed":
  //       return "default" as const
  //     case "pending":
  //       return "secondary" as const
  //     case "cancelled":
  //       return "destructive" as const
  //     default:
  //       return "outline" as const
  //   }
  // }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-none rounded-sm">
        <CardContent className="py-2 px-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by table..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date Filter */}
            <div className="flex gap-2">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="shadow-none rounded-sm">
        <CardContent className="">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Date & Time</TableHead>
                  <TableHead className="font-semibold">Guests</TableHead>
                  <TableHead className="font-semibold">Table</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{booking.date}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.time}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{booking.guests}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{booking.table}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(booking.status)}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
