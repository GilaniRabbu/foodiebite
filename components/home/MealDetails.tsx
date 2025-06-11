"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Clock, Users } from "lucide-react";

// interface MealDetailsProps {
//   meal?: {
//     id: number;
//     name: string;
//     description: string;
//     longDescription: string;
//     price: number;
//     originalPrice: number;
//     image: string;
//     rating: number;
//     reviewCount: number;
//     prepTime: string;
//     servings: number;
//     ingredients: string[];
//     nutritionFacts: {
//       calories: number;
//       protein: string;
//       carbs: string;
//       fat: string;
//     };
//     tags: string[];
//   };
// }
interface MealDetailsProps {
  id: string;
}
const meal = {
  id: 1,
  name: "Mexican Tacos with Seasoned Meat",
  description: "Authentic Mexican tacos with perfectly seasoned ground beef",
  longDescription:
    "Experience the authentic taste of Mexico with our handcrafted tacos featuring perfectly seasoned ground beef, fresh lettuce, diced tomatoes, shredded cheese, and our signature salsa. Each taco is served in a warm corn tortilla that's made fresh daily. This traditional recipe has been passed down through generations and brings the vibrant flavors of Mexican street food right to your table.",
  price: 18.0,
  originalPrice: 24.0,
  image: "/placeholder.svg?height=400&width=400",
  rating: 4.8,
  reviewCount: 127,
  prepTime: "15-20 min",
  servings: 3,
  ingredients: [
    "Ground beef (200g)",
    "Corn tortillas (3 pieces)",
    "Fresh lettuce",
    "Diced tomatoes",
    "Shredded cheddar cheese",
    "Sour cream",
    "Signature salsa",
    "Lime wedges",
    "Mexican spices blend",
  ],
  nutritionFacts: {
    calories: 420,
    protein: "28g",
    carbs: "32g",
    fat: "18g",
  },
  tags: ["Spicy", "Gluten-Free Option", "High Protein", "Popular"],
};

export default function MealDetails({ id }: MealDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  console.log(id);

  const images = [meal.image, meal.image, meal.image]; // In real app, would have multiple images

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={meal.name}
              fill
              className="object-cover"
            />
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3">
            {images.map((image, index) => (
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
                  src={image || "/placeholder.svg"}
                  alt={`${meal.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {meal.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {meal.name}
            </h1>
            <p className="text-gray-600 text-lg">{meal.description}</p>
          </div>

          {/* Rating */}
          {/* <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(meal.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">{meal.rating}</span>
            <span className="text-gray-500">({meal.reviewCount} reviews)</span>
          </div> */}

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              ${meal.price.toFixed(2)}
            </span>
            <span className="text-xl text-gray-400 line-through">
              ${meal.originalPrice.toFixed(2)}
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
              Save ${(meal.originalPrice - meal.price).toFixed(2)}
            </span>
          </div>

          {/* Quick Info */}
          <div className="flex gap-6 py-4 border-y border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{meal.prepTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{meal.servings} servings</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {meal.longDescription}
            </p>
          </div>

          {/* Ingredients */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ingredients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {meal.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
