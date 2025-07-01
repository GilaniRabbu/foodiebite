/* eslint-disable */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Heart, TrendingUp } from "lucide-react";
import { useGetBookingsByUserIdQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";
import UserBookingChart from "./UserBookingChart";

export default function UserOverview() {
  const userId = "686190f2a2fc79a924679593";

  // ✅ Use bookings by user ID
  const { data, isLoading } = useGetBookingsByUserIdQuery({
    userId,
    page: 1,
    limit: 100,
  });

  if (isLoading) return <Loader />;

  // ✅ bookings for this user
  const bookings = data?.data || [];
  console.log(bookings);

  // ✅ Metrics calculation based on user bookings
  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(
    (b) => b.status === "PENDING"
  ).length;
  const totalSpend = bookings.reduce(
    (acc, curr) => acc + Number(curr.total || 0),
    0
  );
  const canceled = bookings.filter((b) => b.status === "CANCELLED").length;

  const metrics = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: CalendarDays,
    },
    {
      title: "Upcoming Bookings",
      value: upcomingBookings,
      icon: MapPin,
    },
    {
      title: "Total Spend",
      value: `$${totalSpend}`,
      icon: Heart,
    },
    {
      title: "Canceled Booking",
      value: canceled,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card
              key={metric.title}
              className="relative overflow-hidden rounded-sm shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <UserBookingChart
        totalBookings={totalBookings}
        upcomingBookings={upcomingBookings}
        canceled={canceled}
        totalSpend={totalSpend}
      />
    </div>
  );
}
