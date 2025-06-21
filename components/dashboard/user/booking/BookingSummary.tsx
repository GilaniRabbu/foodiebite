import { Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BookingSummary = () => {
  const summaryCards = [
    {
      title: "Total Bookings",
      value: "32",
      icon: Calendar,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Confirmed Bookings",
      value: "7",
      icon: Calendar,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Bookings",
      value: "3",
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Canceled Bookings",
      value: "13",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="border-border shadow-none rounded-sm">
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
