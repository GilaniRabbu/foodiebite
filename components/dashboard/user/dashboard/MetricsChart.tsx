"use client";

import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const metrics = [
  { title: "Total Bookings", value: 47 },
  { title: "Upcoming Reservations", value: 8 },
  { title: "Total Spend", value: 2300 },
  { title: "Canceled Booking", value: 13 },
];

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

export default function MetricsChart() {
  const barWidth = 150;
  const chartWidth = metrics.length * barWidth;

  return (
    <div className="overflow-x-auto bg-white rounded-md p-4">
      <div className="h-[500px]" style={{ minWidth: `${chartWidth}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={metrics}>
            <XAxis dataKey="title" tick={{ fontSize: 12 }} interval={0} />
            <Tooltip />
            <Bar dataKey="value" barSize={barWidth} radius={[8, 8, 0, 0]}>
              {metrics.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
