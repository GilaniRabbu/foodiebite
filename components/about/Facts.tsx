import Image from "next/image";
import ContainerWrapper from "@/components/common/ContainerWrapper";

interface StatItemProps {
  label: string;
  value: string;
  color: string;
}

const StatItem = ({ label, value, color }: StatItemProps) => (
  <div className="text-center">
    <div className={`text-4xl font-bold mb-1 ${color}`}>{value}</div>
    <div className="text-sm font-medium text-gray-600">{label}</div>
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
      label: "Food Categories",
      value: "145+",
      color: "text-orange-500",
    },
    {
      label: "Award Win",
      value: "25+",
      color: "text-yellow-500",
    },
  ];

  return (
    <section className="bg-orange-50 py-20">
      <ContainerWrapper>
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
              <div className="relative p-1 rounded-full overflow-hidden bg-gradient-to-br from-red-500 to-orange-600">
                <div className="relative aspect-square rounded-full overflow-hidden bg-white">
                  <Image
                    src="/menu-img-1.jpg"
                    alt="Chef holding a delicious burger"
                    className="object-cover"
                    fill
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
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                We provide more than a{" "}
                <span className="text-yellow-500">variety of services.</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-600">
              This type of restaurant typically serves food and beverages, along
              with light refreshments such as baked goods or snacks.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-6">
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
      </ContainerWrapper>
    </section>
  );
}
