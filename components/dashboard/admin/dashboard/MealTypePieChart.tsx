/* eslint-disable */
"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";

// Color palette
const COLORS = [
  "#60a5fa",
  "#34d399",
  "#f87171",
  "#facc15",
  "#a78bfa",
  "#f472b6",
  "#38bdf8",
];

const MealTypeBarChart = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery({
    page: 1,
    limit: 1000,
  });

  if (isLoading) return <Loader />;
  if (isError || !data?.data)
    return <p className="text-red-500">Failed to load chart data</p>;

  const bookings = data.data;

  // Count meal types
  const mealTypeCounts: Record<string, number> = {};
  bookings.forEach((booking: any) => {
    booking.mealIds.forEach((meal: any) => {
      const type = meal.type || "UNKNOWN";
      mealTypeCounts[type] = (mealTypeCounts[type] || 0) + 1;
    });
  });

  // Transform into chart data
  const chartData = Object.entries(mealTypeCounts).map(([type, count]) => ({
    name: type,
    value: count,
    fill: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  return (
    <div className="w-full h-[420px]">
      <h2 className="text-xl font-semibold text-center italic text-muted-foreground">
        Meal Type Distribution
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MealTypeBarChart;
