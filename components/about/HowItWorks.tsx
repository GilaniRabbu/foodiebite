import { Award, Truck, Headphones } from "lucide-react";
import ContainerWrapper from "@/components/common/ContainerWrapper";

interface ServiceFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceFeature = ({ icon, title, description }: ServiceFeatureProps) => (
  <div className="text-center space-y-4">
    {/* Icon Container */}
    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center border-2 border-red-100 bg-red-50">
      <div>{icon}</div>
    </div>
    {/* Title */}
    <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900">
      {title}
    </h3>
    {/* Description */}
    <p className="max-w-xs mx-auto leading-relaxed text-gray-600">
      {description}
    </p>
  </div>
);

export default function HowItWorks() {
  const services = [
    {
      icon: <Award className="w-10 h-10 text-red-500" />,
      title: "Premium Quality",
      description:
        "We live perfect dining experience where Experience quick and efficient",
    },
    {
      icon: <Truck className="w-10 h-10 text-red-500" />,
      title: "Quickly Delivery",
      description:
        "We live perfect dining experience where Experience quick and efficient",
    },
    {
      icon: <Headphones className="w-10 h-10 text-red-500" />,
      title: "24/7 Support",
      description:
        "We live perfect dining experience where Experience quick and efficient",
    },
  ];

  return (
    <section className="bg-white py-20">
      <ContainerWrapper>
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            How We Deliver{" "}
            <span className="text-yellow-500">Exceptional Service</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-600">
            We are committed to delivering exceptional service through a
            combination of dedication, expertise, and a customer-centric
            approach.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="relative">
              <ServiceFeature
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>

        {/* Additional Content */}
        <div className="mt-16 text-center">
          <p className="inline-block px-6 py-3 rounded-full font-medium text-red-600 bg-red-50">
            Trusted by 10,000+ customers worldwide
          </p>
        </div>
      </ContainerWrapper>
    </section>
  );
}
