"use client";
import { Star } from "lucide-react";
import Image from "next/image";

interface Dish {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: string;
}

const dishes: Dish[] = [
  {
    id: 1,
    name: "Chinese noodles",
    image: "/menu-img-1.jpg",
    price: "$20.00",
    rating: "5.6k",
  },
  {
    id: 2,
    name: "Vegetable Chowmein",
    image: "/menu-img-2.jpg",
    price: "$20.00",
    rating: "5.6k",
  },
  {
    id: 3,
    name: "Pasta",
    image: "/menu-img-3.jpg",
    price: "$20.00",
    rating: "5.6k",
  },
  {
    id: 4,
    name: "Rice and curry",
    image: "/menu-img-4.jpg",
    price: "$20.00",
    rating: "5.6k",
  },
];

const PopularDish = () => {
  return (
    <div className="px-4 md:px-16 py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-900">
          Our Popular Dishes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 py-10">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="relative rounded-xl shadow-md p-6 text-center select-none transition hover:shadow-lg bg-white"
            >
              {/* Rating */}
              <p className="absolute top-3 right-3 text-sm flex items-center gap-1 text-gray-800">
                {dish.rating}
                <Star
                  color="#FBBF24"
                  size={16}
                  strokeWidth={2}
                  absoluteStrokeWidth={true}
                />
              </p>
              {/* Dish Image */}
              <div className="flex justify-center items-center mb-5">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  width={140}
                  height={140}
                  className="w-[120px] h-[120px] rounded-full object-cover"
                />
              </div>
              {/* Dish Info */}
              <h3 className="text-lg font-semibold text-gray-900">
                {dish.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{dish.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDish;
