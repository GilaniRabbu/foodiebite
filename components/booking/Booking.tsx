/*eslint-disable*/
"use client";
import React, { useState, ChangeEvent, FormEvent, useMemo } from "react";
import { useGetAllMealsQuery } from "@/redux/api/mealApi";
import { Meal } from "@/types/Meal";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeMeal } from "@/redux/slice/selectedMealsSlice";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  date: string;
  time: string;
  guest: string;
}

interface SelectedMealWithType {
  id: string;
  type: string;
}

const Booking: React.FC = () => {
  const { data } = useGetAllMealsQuery(undefined);
  const [createBooking] = useCreateBookingMutation();

  const dispatch = useDispatch();

  // Select array of selected meal IDs from Redux store
  const selectedMealIds = useSelector(
    (state: RootState) => state.selectedMeals.selectedMeals
  );

  // Filter full meal objects by selected IDs
  const selectedMeals: Meal[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((meal: Meal) => selectedMealIds.includes(meal._id));
  }, [data, selectedMealIds]);

  // Group meals by type
  const groupedSelectedMeals: Record<string, Meal[]> = useMemo(() => {
    return selectedMeals.reduce((acc: Record<string, Meal[]>, meal: Meal) => {
      if (!acc[meal.type]) acc[meal.type] = [];
      acc[meal.type].push(meal);
      return acc;
    }, {});
  }, [selectedMeals]);

  // Calculate grand total price
  const grandTotal = useMemo(() => {
    return selectedMeals.reduce((sum, meal) => sum + Number(meal.price), 0);
  }, [selectedMeals]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    date: "",
    time: "",
    guest: "",
  });

  const handleRemoveMeal = (mealId: string): void => {
    dispatch(removeMeal(mealId));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const selectedMealsWithType: SelectedMealWithType[] = [];

    Object.entries(groupedSelectedMeals).forEach(([type, meals]) => {
      meals.forEach((meal) => {
        selectedMealsWithType.push({ id: meal._id, type });
      });
    });

    const payload = {
      ...formData,
      meals: selectedMealsWithType,
    };

    try {
      const res = await createBooking(payload).unwrap();
      console.log("Booking success:", res);
      // Optionally clear form or selections here
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Your Booking Details</h2>

      {selectedMeals.length === 0 ? (
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
                <h3 className="text-xl font-semibold text-green-700 mb-4">{type}</h3>
                <ul className="space-y-4">
                  {meals.map((meal) => (
                    <li
                      key={meal._id}
                      className="p-4 border rounded-md shadow-sm bg-white relative flex items-center justify-between"
                    >
                      <div className="flex-1 pr-4">
                        <h4 className="text-lg font-semibold">{meal.name}</h4>
                        <p className="text-sm text-gray-600">{meal.description}</p>
                      </div>

                      <div className="w-24 text-green-800 font-bold text-right">
                        ${meal.price}
                      </div>

                      <button
                        className="ml-4 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition"
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
            {/* Reservation Details Section */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-xl text-gray-800">Reservation Details</h3>
              <p className="text-gray-500 text-sm mt-1">
                Please fill in your information to book a table
              </p>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
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

              {/* Email Address */}
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

              {/* Phone Number */}
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

              {/* Number of Guests */}
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

              {/* Reservation Date */}
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

              {/* Reservation Time */}
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

            {/* Submit Button */}
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

export default Booking;
