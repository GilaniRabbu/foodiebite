/* eslint-disable */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign, Users, Utensils } from "lucide-react";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";
import MealTypePieChart from "./MealTypePieChart";

export default function AdminOverview() {
  const { data, isLoading, isError } = useGetAllBookingsQuery({
    page: 1,
    limit: 1000, // large enough to include all
  });

  if (isLoading) return <Loader />;
  if (isError || !data?.data)
    return <p className="text-red-500">Failed to load stats</p>;

  const bookings = data.data;

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (sum: any, b: any) => sum + Number(b.total || 0),
    0
  );
  const totalUsers = new Set(bookings.map((b: any) => b.email)).size;
  const totalMealsOrdered = bookings.reduce(
    (sum: any, b: any) => sum + (b.mealIds?.length || 0),
    0
  );

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: Calendar,
      color: "text-blue-600",
      description: "All customer reservations",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      description: "Revenue from orders",
    },
    {
      label: "Total Meals",
      value: totalMealsOrdered,
      icon: Utensils,
      color: "text-purple-600",
      description: "All meals across bookings",
    },
    {
      label: "Total Customers",
      value: totalUsers,
      icon: Users,
      color: "text-orange-600",
      description: "Unique customers served",
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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="relative overflow-hidden rounded-sm shadow-none"
            >
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="pt-5 pb-10">
        <MealTypePieChart />
      </div>
    </div>
  );
}
