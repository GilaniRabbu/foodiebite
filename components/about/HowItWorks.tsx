import type React from "react";
import { Award, Truck, Headphones } from "lucide-react";

interface ServiceFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceFeature = ({ icon, title, description }: ServiceFeatureProps) => (
  <div className="text-center space-y-4">
    {/* Icon Container */}
    <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-100">
      <div className="text-red-500">{icon}</div>
    </div>

    {/* Title */}
    <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
      {title}
    </h3>

    {/* Description */}
    <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
      {description}
    </p>
  </div>
);

export default function HowItWorks() {
  const services = [
    {
      icon: <Award className="w-10 h-10" />,
      title: "Premium Quality",
      description:
        "We live perfect dining experience where Experience quick and efficient",
    },
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Quickly Delivery",
      description:
        "We live perfect dining experience where Experience quick and efficient",
    },
    {
      icon: <Headphones className="w-10 h-10" />,
      title: "24/7 Support",
      description:
        "We live perfect dining experience where Experience quick and efficient",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
            How We Deliver{" "}
            <span className="text-yellow-500">Exceptional Service</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We are committed to delivering exceptional service through a
            combination of dedication, expertise, and a customer-centric
            approach.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {services.map((service, index) => (
            <div key={index} className="relative">
              <ServiceFeature
                icon={service.icon}
                title={service.title}
                description={service.description}
              />

              {/* Connecting Line (hidden on mobile) */}
              {index < services.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent transform translate-x-8 -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Content */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 font-medium">
              Trusted by 10,000+ customers worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
