import { Calendar, Clock, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
  ]

  const summaryCards = [
    {
      title: "Confirmed Bookings",
      value: bookings.filter((b) => b.status === "confirmed").length,
      icon: Calendar,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Bookings",
      value: bookings.filter((b) => b.status === "pending").length,
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Total Guests",
      value: bookings.reduce((sum, b) => sum + b.guests, 0),
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className="border-border shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${card.iconBg} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{card.value}</p>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default BookingSummary
