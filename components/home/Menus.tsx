"use client";
import React, { useState } from "react";
import { useGetAllMealsQuery } from "@/redux/api/mealApi";
import { Meal } from "@/types/Meal";
import Loader from "@/components/shared/Loader";

const Menus = () => {
  const { data, isLoading, isError } = useGetAllMealsQuery(undefined);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  if (isLoading) return <Loader />;

  if (isError)
    return <p className="text-center text-red-500">Failed to load meals.</p>;

  // Group meals by type
  const groupedMeals: Record<string, Meal[]> = data?.data?.reduce(
    (acc: Record<string, Meal[]>, meal: Meal) => {
      if (!acc[meal.type]) acc[meal.type] = [];
      acc[meal.type].push(meal);
      return acc;
    },
    {}
  );

  const handleCheckboxChange = (mealId: string) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  return (
    <div className="px-5 py-10">
      <div className="container mx-auto">
        <div className="bg-cream min-h-screen py-10 px-4 md:px-16">
          <div className="mb-16 text-center">
            {groupedMeals &&
              Object.entries(groupedMeals).map(([type, meals]) => (
                <div key={type} className="mb-20">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-center mb-10 text-green-800">
                    {type}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {meals.map((meal: Meal) => (
                      <div
                        key={meal._id}
                        className="flex justify-between items-center gap-5 border-b pb-4"
                      >
                        <div className="flex items-center space-x-4">
                          {meal.images?.[0]?.url && (
                            <img
                              src={meal.images[0].url}
                              alt={meal.images[0].altText}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                          <div className="text-left overflow-hidden">
                            <h4 className="font-bold text-md text-gray-800 truncate lg:whitespace-normal lg:truncate-none">
                              {meal.name}
                            </h4>
                            <p className="text-sm text-gray-500 block lg:hidden">
                              {(meal.description ?? "")
                                .split(" ")
                                .slice(0, 7)
                                .join(" ")}
                              {(meal.description ?? "").split(" ").length > 7 &&
                                "..."}
                            </p>

                            {/* For large screens: show full text */}
                            <p className="text-sm text-gray-500 hidden lg:block">
                              {meal.description ?? ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-semibold text-green-900">
                            ${meal.price}
                          </span>
                          <input
                            type="checkbox"
                            checked={selectedMeals.includes(meal._id)}
                            onChange={() => handleCheckboxChange(meal._id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Book button for each type */}
                  <div className="text-center mt-6">
                    <button
                      className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
                      onClick={() => {
                        const selectedForThisType = meals
                          .filter((meal) => selectedMeals.includes(meal._id))
                          .map((m) => m.name);
                        console.log(`Book ${type}:`, selectedForThisType);
                      }}
                    >
                      Book a Table
                      {/* Book {type} */}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menus;
