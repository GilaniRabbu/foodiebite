export default function StatsSection() {
  const stats = [
    {
      number: "2k",
      label: "Our Daily Order",
    },
    {
      number: "18",
      label: "Specialist Chef",
    },
    {
      number: "126",
      label: "Our Menu & Dish",
    },
    {
      number: "80",
      label: "Our Members",
    },
  ];

  return (
    <div className="bg-gray-900 py-16  px-4">
      <div className="flex justify-center items-center flex-col md:flex-row gap-20">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
              {stat.number}
            </div>
            <div className="text-sm font-medium text-gray-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
