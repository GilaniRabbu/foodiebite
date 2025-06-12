"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllMealsQuery } from "@/redux/api/mealApi";
import { Meal } from "@/types/Meal";
import { toast } from "sonner";

const Menus = () => {
  const { data } = useGetAllMealsQuery(undefined);
  // console.log("data", data);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const router = useRouter();

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

  const handleBookTable = () => {
    if (selectedMeals.length === 0)
      return toast.error("Please select at least one meal.");

    // ✅ Save to localStorage for now (or use a global store like Redux)
    localStorage.setItem("selectedMeals", JSON.stringify(selectedMeals));
    router.push("/booking");
  };

  return (
    <div className="bg-cream  pb-10 pt-16">
      <div className="text-center">
        {groupedMeals &&
          Object.entries(groupedMeals).map(([type, meals]) => (
            <div key={type} className="mb-10">
              <h3 className="text-2xl lg:text-3xl font-semibold text-center mb-10 text-green-800">
                {type}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:space-x-20">
                {meals.map((meal: Meal) => (
                  <div
                    key={meal._id}
                    className="flex justify-between items-center gap-5 pb-4 border-gray-200 border-b"
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
                          {(meal.description ?? "").split(" ").length > 7 && "..."}
                        </p>
                        <p className="text-sm text-gray-500 hidden lg:block">
                          {meal.description ?? ""}
                        </p>
                        {/* View Details Button */}
                        <button
                          onClick={() => router.push(`/meals/${meal._id}`)}
                          className="text-green-700 hover:underline text-sm mt-1"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-green-800">
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
                <button className="cursor-pointer px-6 py-3 rounded text-lg text-white bg-orange-400 hover:bg-orange-500">
                  Book a Table
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menus;
