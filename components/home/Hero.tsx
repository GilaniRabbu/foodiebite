import Image from "next/image";
import { Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="px-4 md:px-16 py-10">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* SMALL SCREEN IMAGE */}
          <div className="w-3/4 sm:w-1/2 mx-auto block lg:hidden border-4 border-dashed border-orange-300 rounded-full p-5">
            <Image
              src="/hero-img.png"
              alt="Hero Image"
              width={320}
              height={320}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-lg font-medium text-orange-400">Welcome to</p>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-gray-900">
                Foodie Restaurant
                <br />
                and Enjoy{" "}
                <span className="relative">
                  <span className="text-orange-400">The Food</span>
                  <div className="absolute -bottom-2 left-0 -z-10 w-full h-3 rounded-full bg-orange-200"></div>
                </span>
              </h1>
            </div>
            <p className="text-lg text-balance text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum convallis ante ante, ut tempor neque bibendum non. Ut
              enim lacus, auctor nec convallis sed, vehicula ut eros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="cursor-pointer px-6 py-3 rounded text-lg text-white bg-orange-400 hover:bg-orange-500">
                Reserve a Table
              </button>
              <button className="cursor-pointer px-6 py-3 rounded text-lg border text-gray-800 border-gray-400 hover:bg-gray-100">
                About us
              </button>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock size={20} strokeWidth={2} absoluteStrokeWidth={true} />
              <span>Open: 11:00am-11:00pm</span>
            </div>
          </div>
          {/* RIGHT CONTENT */}
          <div className="relative w-[440px] h-[440px] mx-auto hidden lg:block">
            <div className="absolute inset-0 border-4 border-dashed rounded-full border-orange-300"></div>
            <div className="absolute inset-8 rounded-full shadow-lg overflow-hidden bg-white">
              <Image
                src="/hero-img.png"
                alt="Hero Image"
                width={320}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
