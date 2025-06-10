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
    description: "Monday - Sunday: 11:00 AM - 11:00 PM",
  },
  {
    icon: <Calendar className="w-6 h-6 text-white" />,
    title: "Reservation",
    description: "Call us at (880) 123-4567",
  },
];

export default function ServiceInfo() {
  return (
    <div className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex justify-center items-start md:items-center flex-col md:flex-row gap-16">
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
    </div>
  );
}
