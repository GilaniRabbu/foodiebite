"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  totalBookings: number;
  upcomingBookings: number;
  canceled: number;
  totalSpend: number;
};

const UserBookingChart = ({
  totalBookings,
  upcomingBookings,
  canceled,
  totalSpend,
}: Props) => {
  const data = [
    {
      name: "Total",
      value: totalBookings,
    },
    {
      name: "Upcoming",
      value: upcomingBookings,
    },
    {
      name: "Canceled",
      value: canceled,
    },
    {
      name: "Total Spend",
      value: totalSpend,
    },
  ];

  return (
    <div className="h-[400px] border rounded-sm shadow-none bg-white">
      <div className="w-full h-[350px] p-4">
        <h3 className="text-lg text-center font-semibold mb-4">
          Booking Overview Chart
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserBookingChart;
