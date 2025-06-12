import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin, Heart, TrendingUp } from "lucide-react"

export default function UserOverview() {
  const metrics = [
    {
      title: "Total Bookings",
      value: "47",
      change: "+12%",
      changeType: "positive" as const,
      description: "Since last month",
      icon: CalendarDays,
    },
    {
      title: "Upcoming Reservations",
      value: "8",
      change: "+25%",
      changeType: "positive" as const,
      description: "Since last month",
      icon: MapPin,
    },
    {
      title: "Favorite Restaurants",
      value: "23",
      change: "+8%",
      changeType: "positive" as const,
      description: "Since last month",
      icon: Heart,
    },
    {
      title: "Booking Success Rate",
      value: "94%",
      change: "-2%",
      changeType: "negative" as const,
      description: "Since last month",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title} className="relative overflow-hidden rounded-sm shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className={`text-xs font-medium ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
