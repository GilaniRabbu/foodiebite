import Image from "next/image";

interface StatItemProps {
  label: string;
  value: string;
  color: string;
}

const StatItem = ({ label, value, color }: StatItemProps) => (
  <div className="text-center">
    <div className={`text-4xl font-bold mb-1 ${color}`}>{value}</div>
    <div className="text-gray-600 text-sm font-medium">{label}</div>
  </div>
);

export default function Facts() {
  const stats = [
    {
      label: "Satisfied Clients",
      value: "250+",
      color: "text-red-500",
    },
    {
      label: "Total Food Categories",
      value: "153+",
      color: "text-orange-500",
    },
    {
      label: "Award Win",
      value: "25+",
      color: "text-yellow-500",
    },
  ];

  return (
    <section className="bg-orange-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative dots */}
              <div className="absolute -top-4 -right-4 w-20 h-20 opacity-30">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-orange-400 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Main image */}
              <div className="relative rounded-full overflow-hidden bg-gradient-to-br from-red-500 to-orange-600 p-1">
                <div className="relative aspect-square rounded-full overflow-hidden bg-white">
                  <Image
                    src="/images/chef-burger.png"
                    alt="Chef holding a delicious burger"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Decorative dots bottom left */}
              <div className="absolute -bottom-6 -left-6 w-16 h-16 opacity-30">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-orange-400 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Main heading */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                We provide more than a{" "}
                <span className="text-yellow-500">variety of services.</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              This type of restaurant typically serves food and beverages, along
              with light refreshments such as baked goods or snacks.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 py-6">
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  color={stat.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
