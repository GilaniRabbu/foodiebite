/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../common/Pagination";
import {
  useGetAllCategoriesQuery,
  useGetMealsByCategoryQuery,
} from "@/redux/api/mealApi";

export default function TopCategories() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 4;

  // Fetch all categories dynamically
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetAllCategoriesQuery(undefined);

  // Fetch meals based on selected category and pagination
  // If "All" selected, fetch all meals or handle accordingly
  const {
    data: mealsData,
    error: mealsError,
    isLoading: mealsLoading,
  } = useGetMealsByCategoryQuery(
    selectedCategory === "All"
      ? { category: "", page, limit }
      : { category: selectedCategory, page, limit }
  );

  // console.log("Meals Data", mealsData?.data?.data);

  // totalPages for pagination (assumes backend sends total count or total pages)
  // Here I assume your API returns { data: [...], total: number }
  // You can adapt if backend returns something else
  const totalItems = mealsData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  // When category changes, reset page to 1
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  if (categoriesLoading) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error loading categories</div>;

  return (
    <div className="bg-white pt-10">
      {/* Top Categories Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          Top Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            key="all"
            onClick={() => setSelectedCategory("All")}
            className={`px-6 py-2 rounded-full cursor-pointer border transition-all duration-200 text-sm font-medium ${
              selectedCategory === "All"
                ? "bg-orange-500 text-white border-transparent"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            All
          </button>

          {categoriesData?.data?.map((category: string) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full cursor-pointer border transition-all duration-200 text-sm font-medium ${
                selectedCategory === category
                  ? "bg-orange-500 text-white border-transparent"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Meals Section */}
      <div>
        {mealsLoading && <p>Loading meals...</p>}
        {mealsError && <p>Error loading meals.</p>}
        {!mealsLoading && !mealsError && mealsData?.data?.length === 0 && (
          <p>No meals found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {mealsData?.data?.data?.map((item: any) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.images?.[0]?.url || "/default-meal.jpg"}
                  alt={item.images?.[0]?.altText || item.name}
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
                      PRICE: ${item.price.toFixed(2)}
                    </span>
                    {/* You can add originalPrice if your API provides it */}
                  </div>
                  <Link
                    href={`/meals/${item._id}`}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-green-800 text-white"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}
