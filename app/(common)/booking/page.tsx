"use client";
import React, { useEffect, useState } from "react";
import { useGetAllMealsQuery } from "@/redux/api/mealApi";
import { Meal } from "@/types/Meal";

const Page = () => {
  const { data } = useGetAllMealsQuery(undefined);
  const [groupedSelectedMeals, setGroupedSelectedMeals] = useState<
    Record<string, Meal[]>
  >({});
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
    time: "",
    guest: "",
  });

  const updateLocalStorage = (meals: Meal[]) => {
    const ids = meals.map((meal) => meal._id);
    localStorage.setItem("selectedMeals", JSON.stringify(ids));
  };

  useEffect(() => {
    const storedIds: string[] = JSON.parse(
      localStorage.getItem("selectedMeals") || "[]"
    );

    if (data?.data?.length) {
      const selectedMeals = data.data.filter((meal: Meal) =>
        storedIds.includes(meal._id)
      );

      const grouped: Record<string, Meal[]> = selectedMeals.reduce(
        (acc: Record<string, Meal[]>, meal: Meal) => {
          if (!acc[meal.type]) acc[meal.type] = [];
          acc[meal.type].push(meal);
          return acc;
        },
        {}
      );

      setGroupedSelectedMeals(grouped);

      const total = selectedMeals.reduce(
        (sum: number, meal: Meal) => sum + Number(meal.price),
        0
      );
      setGrandTotal(total);
    }
  }, [data]);

  const handleRemoveMeal = (mealId: string) => {
    const updatedGroupedMeals: Record<string, Meal[]> = {};
    let updatedMeals: Meal[] = [];

    Object.entries(groupedSelectedMeals).forEach(([type, meals]) => {
      const filteredMeals = meals.filter((meal) => meal._id !== mealId);
      if (filteredMeals.length > 0) {
        updatedGroupedMeals[type] = filteredMeals;
      }
      updatedMeals = [...updatedMeals, ...filteredMeals];
    });

    setGroupedSelectedMeals(updatedGroupedMeals);
    updateLocalStorage(updatedMeals);

    const total = updatedMeals.reduce(
      (sum, meal) => sum + Number(meal.price),
      0
    );
    setGrandTotal(total);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic: check user login, redirect if not, or process booking
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-green-800">
        Your Booking Details
      </h2>

      {Object.keys(groupedSelectedMeals).length === 0 ? (
        <p className="text-gray-600">No meals selected.</p>
      ) : (
        <>
          {Object.entries(groupedSelectedMeals).map(([type, meals]) => {
            const subtotal = meals.reduce(
              (sum, meal) => sum + Number(meal.price),
              0
            );

            return (
              <div key={type} className="mb-8">
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  {type}
                </h3>
                <ul className="space-y-4">
                  {meals.map((meal) => (
                    <li
                      key={meal._id}
                      className="p-4 border rounded-md shadow-sm bg-white relative"
                    >
                      <h4 className="text-lg font-semibold">{meal.name}</h4>
                      <p className="text-sm text-gray-600">
                        {meal.description}
                      </p>
                      <p className="text-green-800 font-bold mt-1">
                        ${meal.price}
                      </p>
                      <button
                        className="absolute top-3 right-3 cursor-pointer"
                        onClick={() => handleRemoveMeal(meal._id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 text-right text-green-900 font-semibold">
                  Subtotal for {type}: ${subtotal.toFixed(2)}
                </div>
              </div>
            );
          })}

          {/* Grand Total */}
          <div className="text-right text-xl font-bold text-green-900 mt-6 mb-10">
            Grand Total: ${grandTotal.toFixed(2)}
          </div>

          {/* Booking Form */}
          <form
            onSubmit={handleBookingSubmit}
            className="bg-white p-8 rounded-lg space-y-6 mt-10 border border-gray-100"
          >
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-xl text-gray-800">
                Reservation Details
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Please fill in your information to book a table
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  placeholder="(123) 456-7890"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="guest"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Guests
                </label>
                <select
                  id="guest"
                  name="guest"
                  value={formData.guest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none text-gray-900 bg-white"
                  required
                >
                  <option value="">Select guests</option>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reservation Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reservation Time
                </label>
                <input
                  id="time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none text-gray-900"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-medium py-3 px-6 rounded-md hover:bg-orange-600 transition-colors duration-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
              >
                Confirm Reservation
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By booking a table, you agree to our reservation policy and
              cancellation terms.
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Page;
