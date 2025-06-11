import { Calendar, DollarSign, Utensils } from "lucide-react";

export default function Overview() {
  const stats = [
    {
      label: "My Bookings",
      value: "4",
      change: "+1 this month",
      icon: Calendar,
      color: "text-blue-600",
      description: "Total tables booked by you",
    },
    {
      label: "Total Spent",
      value: "$320",
      change: "+$50 this month",
      icon: DollarSign,
      color: "text-green-600",
      description: "Your total order spend",
    },
    {
      label: "Favorite Meal",
      value: "Chicken Alfredo",
      change: "",
      icon: Utensils,
      color: "text-pink-600",
      description: "Most frequently ordered",
    },
    {
      label: "Upcoming Booking",
      value: "June 15, 2025",
      change: "Table for 4 at 7:30 PM",
      icon: Calendar,
      color: "text-orange-600",
      description: "Your next reservation",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: "Alice Johnson",
      date: "2024-01-15",
      time: "7:00 PM",
      guests: 4,
      status: "confirmed",
    },
    {
      id: 2,
      customer: "Bob Smith",
      date: "2024-01-15",
      time: "8:30 PM",
      guests: 2,
      status: "pending",
    },
    {
      id: 3,
      customer: "Carol Davis",
      date: "2024-01-16",
      time: "6:00 PM",
      guests: 6,
      status: "confirmed",
    },
    {
      id: 4,
      customer: "David Wilson",
      date: "2024-01-16",
      time: "7:30 PM",
      guests: 3,
      status: "confirmed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here&apos;s what&apos;s happening at your restaurant.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Bookings
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {booking.customer}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.date} at {booking.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.guests} guests
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
