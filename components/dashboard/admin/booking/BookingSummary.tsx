/* eslint-disable */
"use client";
import {
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  CheckCircle2 as ConfirmedIcon,
  XCircle as CanceledIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";

const BookingSummary = () => {
  const { data, isLoading } = useGetAllBookingsQuery({
    page: 1,
    limit: 100,
  });

  if (isLoading) return <Loader />;

  const bookings = data?.data || [];

  const total = bookings.length;
  const confirmed = bookings.filter(
    (b: any) => b.status === "CONFIRMED"
  ).length;
  const pending = bookings.filter((b: any) => b.status === "PENDING").length;
  const canceled = bookings.filter((b: any) => b.status === "CANCELLED").length;

  const summaryCards = [
    {
      title: "Total Bookings",
      value: total,
      icon: CalendarIcon,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Confirmed Bookings",
      value: confirmed,
      icon: ConfirmedIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Bookings",
      value: pending,
      icon: ClockIcon,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Canceled Bookings",
      value: canceled,
      icon: CanceledIcon,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="border shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${card.iconBg} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {card.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BookingSummary;
