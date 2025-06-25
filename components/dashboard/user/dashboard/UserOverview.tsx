/* eslint-disable */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Heart, TrendingUp } from "lucide-react";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";

export default function UserOverview() {
  const { data, isLoading } = useGetAllBookingsQuery({
    page: 1,
    limit: 100,
  });

  if (isLoading) return <Loader />;

  const bookings = data?.data || [];

  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(
    (b: any) => b.status === "PENDING"
  ).length;
  const totalSpend = bookings.reduce(
    (acc: number, curr: any) => acc + Number(curr.total || 0),
    0
  );
  const canceled = bookings.filter((b: any) => b.status === "CANCELLED").length;

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
    </div>
  );
}
