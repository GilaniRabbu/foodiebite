import { MapPin, Clock, Calendar } from "lucide-react";

const infoData = [
  {
    icon: <MapPin className="w-6 h-6 text-white" />,
    title: "Locate Us",
    description: "123 Main Street, Downtown",
  },
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: "Open Hours",
    description: "Monday - Sunday: 9:00 AM - 11:00 PM",
  },
  {
    icon: <Calendar className="w-6 h-6 text-white" />,
    title: "Reservation",
    description: "Call us at +880 123-4567",
  },
];

export default function ServiceInfo() {
  return (
    <div className="bg-orange-100 py-16 mt-10">
      <div className="flex justify-between flex-col gap-10 lg:flex-row container mx-auto px-5 ">
        {infoData.map((item, index) => (
          <div key={index} className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
