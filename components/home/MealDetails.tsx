"use client";
import { useState } from "react";
import Image from "next/image";
import { Clock, Users, Check, X } from "lucide-react";
import { useGetMealByIdQuery } from "@/redux/api/mealApi";

interface MealDetailsProps {
  id: string;
}

interface MealImage {
  url: string;
  altText: string;
  _id?: string;
  id: string;
}

export default function MealDetails({ id }: MealDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { data, isLoading, isError } = useGetMealByIdQuery(id);

  const meal = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse space-y-6">
        <div className="h-[400px] bg-gray-200 rounded-xl" />
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>
    );
  }

  if (isError || !meal)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load meal details.
      </p>
    );

  const images = meal?.images?.map((img: MealImage) => img.url) ?? [
    "/placeholder.svg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={images[selectedImage]}
              alt={meal.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3">
            {images.map((imgUrl: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? "border-green-500"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Categories (Tags) */}
          <div className="flex flex-wrap gap-2 mb-3">
            {meal.categories.map((category: string) => (
              <span
                key={category}
                className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Meal Name and Description */}
          {/* Title + Availability */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{meal.name}</h1>
            {meal.isAvailable ? (
              <span className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                <Check className="w-4 h-4 mr-1" /> Available
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                <X className="w-4 h-4 mr-1" /> Not available
              </span>
            )}
          </div>
          <p className="text-gray-600 text-lg">{meal.description}</p>

          {/* Price Info */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              ${meal.price.toFixed(2)}
            </span>
          </div>

          {/* Basic Info - hardcoded for now */}
          <div className="flex gap-6 py-4 border-y border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">15-20 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">2-4 servings</span>
            </div>
          </div>

          {/* Description Expanded */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Keywords / Details
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {meal.keywords?.[0] ?? "No extra keywords available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
