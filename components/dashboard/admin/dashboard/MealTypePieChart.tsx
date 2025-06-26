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

const MealTypePieChart = () => {
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
  }));

  return (
    <div className="w-full h-[420px] mt-6">
      <h2 className="text-lg font-semibold text-center text-gray-800">
        Meal Type Distribution
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
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
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MealTypePieChart;
