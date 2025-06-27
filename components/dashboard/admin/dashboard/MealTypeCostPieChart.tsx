/* eslint-disable */
"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";

const COLORS = [
  "#34d399", // GREEN
  "#60a5fa", // BLUE
  "#f87171", // RED
  "#facc15", // YELLOW
  "#a78bfa", // PURPLE
  "#fb923c", // ORANGE
  "#e879f9", // PINK
];

const MealTypeCostPieChart = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery({
    page: 1,
    limit: 1000,
  });

  if (isLoading) return <Loader />;
  if (isError || !data?.data)
    return <p className="text-red-500">Failed to load data</p>;

  const bookings = data.data;

  // Calculate total cost per meal type
  const costByType: Record<string, number> = {};
  bookings.forEach((booking: any) => {
    booking.mealIds.forEach((meal: any) => {
      const type = meal.type || "UNKNOWN";
      const price = Number(meal.price) || 0;
      costByType[type] = (costByType[type] || 0) + price;
    });
  });

  const chartData = Object.entries(costByType).map(([type, total]) => ({
    name: type,
    value: total,
  }));

  return (
    <div className="w-full h-[420px]">
      <h2 className="text-xl font-semibold text-center italic text-muted-foreground">
        Meal Type Cost Distribution
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            // labelLine={false}
            // label={({ name, percent }) =>
            //   `${name} (${(percent * 100).toFixed(0)}%)`
            // }
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MealTypeCostPieChart;
