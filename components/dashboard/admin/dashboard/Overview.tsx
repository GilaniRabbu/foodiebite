import { Calendar, DollarSign, Utensils, Users, Star } from "lucide-react";

export default function AdminOverview() {
  const stats = [
    {
      label: "Total Bookings",
      value: "128",
      icon: Calendar,
      color: "text-blue-600",
      description: "All customer reservations",
    },
    {
      label: "Total Revenue",
      value: "$12,450",
      icon: DollarSign,
      color: "text-green-600",
      description: "Revenue from orders",
    },
    {
      label: "Menu Items",
      value: "42",
      icon: Utensils,
      color: "text-pink-600",
      description: "Items currently on the menu",
    },
    {
      label: "Total Customers",
      value: "365",
      icon: Users,
      color: "text-orange-600",
      description: "Unique customers served",
    },
  ];

  const recentFeedback = [
    {
      id: 1,
      customer: "Alice Johnson",
      date: "2024-01-15",
      comment: "Loved the ambiance and food!",
      rating: 5,
    },
    {
      id: 2,
      customer: "Bob Smith",
      date: "2024-01-16",
      comment: "Service could be quicker.",
      rating: 3,
    },
    {
      id: 3,
      customer: "Carol Davis",
      date: "2024-01-17",
      comment: "Great place for family dinner.",
      rating: 4,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Here&apos;s a snapshot of the restaurant&apos;s performance.
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
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Feedback */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Customer Feedback
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {recentFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="p-4 bg-gray-50 rounded-lg space-y-1"
              >
                <p className="font-medium text-gray-900">{feedback.customer}</p>
                <p className="text-sm text-gray-600">{feedback.date}</p>
                <p className="text-sm text-gray-700">&quot;{feedback.comment}&quot;</p>
                <div className="flex items-center text-yellow-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < feedback.rating ? "fill-yellow-500" : "fill-none"
                        }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
