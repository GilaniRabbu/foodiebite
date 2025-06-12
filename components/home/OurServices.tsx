"use client";

import { Utensils, BellRing, Truck, Wine } from "lucide-react";
import ContainerWrapper from "../common/ContainerWrapper";

const services = [
    {
        icon: <Utensils className="w-8 h-8 text-orange-600" />,
        title: "Fine Dining",
        description: "Savor gourmet meals crafted by award-winning chefs in an upscale ambiance.",
    },
    {
        icon: <BellRing className="w-8 h-8 text-orange-600" />,
        title: "Table Reservation",
        description: "Easily book your table online to enjoy uninterrupted service.",
    },
    {
        icon: <Truck className="w-8 h-8 text-orange-600" />,
        title: "Express Delivery",
        description: "Hot and fresh meals delivered swiftly to your door.",
    },
    {
        icon: <Wine className="w-8 h-8 text-orange-600" />,
        title: "Curated Bar",
        description: "Exclusive wines and spirits selected to elevate your palate.",
    },
];

export default function OurServices() {
    return (
        <section className="relative py-20 bg-gradient-to-br  from-[#fff8f3] via-[#fdf3ec] to-[#ffe9d6] ">
            <ContainerWrapper>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
                        Our Signature Services
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Experience culinary excellence and top-tier hospitality crafted just for you.
                    </p>
                </div>

                <div className="grid gap-10 grid-cols-1 container mx-auto  sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="flex justify-center items-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>

            </ContainerWrapper>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-30"></div>
        </section>
    );
}
