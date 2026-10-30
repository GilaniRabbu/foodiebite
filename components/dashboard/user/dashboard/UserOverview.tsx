"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Heart, TrendingUp, Mail, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import { useGetBookingsByUserIdQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";
import UserBookingChart from "./UserBookingChart";

export default function UserOverview() {
  const user = useSelector(selectCurrentUser);
  const userId = user?._id;

  const { data, isLoading, isError } = useGetBookingsByUserIdQuery(
    { userId: userId as string, page: 1, limit: 100 },
    { skip: !userId }
  );

  if (!userId) return null;
  if (isLoading) return <Loader />;

  // ✅ bookings for the logged in user
  const bookings = data?.data || [];

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "Guest";
  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    fullName.charAt(0).toUpperCase();

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
      {/* Logged in user identity */}
      <Card className="rounded-sm shadow-none">
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center">
          <div className="w-14 h-14 shrink-0 bg-red-50 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-red-600">
              {initials}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-900">{fullName}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role ? `${user.role.toLowerCase()} account` : "account"}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-600 md:items-end">
            {user?.email && (
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {user.email}
              </span>
            )}
            {user?.phone && (
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {user.phone}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

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

      {isError ? (
        <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Failed to load your bookings.
        </div>
      ) : (
        <UserBookingChart
          totalBookings={totalBookings}
          upcomingBookings={upcomingBookings}
          canceled={canceled}
          totalSpend={totalSpend}
        />
      )}
    </div>
  );
}
