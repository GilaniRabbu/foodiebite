"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  "All",
  "Noodle Dishes",
  "Rice Dishes",
  "Rolls and Wraps",
  "Seafood Dishes",
  "Beverages",
];

const menuItems = [
  {
    id: 1,
    name: "VEGETABLE SPRING ROLLS",
    description: "Fresh vegetables wrapped in crispy spring roll wrapper",
    price: "$25.00",
    originalPrice: "$30.00",
    image: "/menu-img-1.jpg",
    category: "Rolls and Wraps",
  },
  {
    id: 2,
    name: "MEXICAN TACOS WITH MEAT",
    description: "Authentic Mexican tacos with seasoned meat",
    price: "$18.00",
    originalPrice: "$24.00",
    image: "/menu-img-1.jpg",
    category: "Rolls and Wraps",
  },
  {
    id: 3,
    name: "SANDWICH WITH TOMATOES",
    description: "Fresh sandwich with ripe tomatoes and greens",
    price: "$12.00",
    originalPrice: "$15.00",
    image: "/menu-img-1.jpg",
    category: "Rolls and Wraps",
  },
  {
    id: 4,
    name: "POPIAH DEEP FRIED SPRING ROLLS",
    description:
      "Crispy deep fried spring rolls with fresh vegetables with fresh vegetables",
    price: "$22.00",
    originalPrice: "$28.00",
    image: "/menu-img-1.jpg",
    category: "Rolls and Wraps",
  },
];

export default function MealsCategory() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="container mx-auto py-10 bg-white">
      {/* Top Categories Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Top Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border transition-all duration-200 text-sm font-medium ${
                selectedCategory === category
                  ? "bg-green-600 text-white border-transparent hover:bg-green-700"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Section */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm text-gray-800 mb-2 leading-tight truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      PRICE: {item.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {item.originalPrice}
                    </span>
                  </div>
                  <Link
                    href={`/meals/${item.id}`} // Adjust this route based on your details page
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <FileText className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
