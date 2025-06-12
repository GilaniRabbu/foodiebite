"use client";

import { useState } from "react";
import { Calendar, Clock, Users, Search, Filter } from "lucide-react";

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

  // Since we removed customer/email, search will filter by table
  const filteredBookings = bookings.filter((booking) =>
    booking.table.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by table..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Date Filter */}
          <div className="flex gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Date & Time
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Guests
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Table
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-900">{booking.date}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {booking.time}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{booking.guests}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-900">{booking.table}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
