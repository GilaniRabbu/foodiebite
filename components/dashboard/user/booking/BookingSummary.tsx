import { Calendar, Clock, Users } from "lucide-react";
import React from "react";

const BookingSummary = () => {
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
            <p className="text-sm text-gray-600">Confirmed Bookings</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {bookings.filter((b) => b.status === "pending").length}
            </p>
            <p className="text-sm text-gray-600">Pending Bookings</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {bookings.reduce((sum, b) => sum + b.guests, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Guests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
