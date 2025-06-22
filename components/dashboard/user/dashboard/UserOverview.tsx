import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Heart, TrendingUp } from "lucide-react";

export default function UserOverview() {
  const metrics = [
    {
      title: "Total Bookings",
      value: "47",
      icon: CalendarDays,
    },
    {
      title: "Upcoming Reservations",
      value: "8",
      icon: MapPin,
    },
    {
      title: "Total Spend",
      value: "2300",
      icon: Heart,
    },
    {
      title: "Canceled Booking",
      value: "13",
      icon: TrendingUp,
    },
  ];

  return (
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
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {metric.value}
                    {metric.title === "Total Spend" && "$"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
