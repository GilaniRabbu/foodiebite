/* eslint-disable */
"use client";

import React, { useState, ChangeEvent, FormEvent, useMemo } from "react";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeMeal,
  clearSelectedMeals,
} from "@/redux/slice/selectedMealsSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  reservationDate: string;
  reservationTime: string;
  numberOfGuests: string;
}

const Booking: React.FC = () => {
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  // Get full meal objects from Redux store
  const selectedMeals = useSelector(
    (state: RootState) => state.selectedMeals.selectedMeals
  );

  // Group meals by type
  const groupedSelectedMeals: Record<string, any[]> = useMemo(() => {
    return selectedMeals.reduce((acc: Record<string, any[]>, meal: any) => {
      if (!acc[meal.type]) acc[meal.type] = [];
      acc[meal.type].push(meal);
      return acc;
    }, {});
  }, [selectedMeals]);

  // Calculate grand total
  const grandTotal = useMemo(() => {
    return selectedMeals.reduce((sum, meal) => sum + Number(meal.price), 0);
  }, [selectedMeals]);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    reservationDate: "",
    reservationTime: "",
    numberOfGuests: "",
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

  const handleBookingSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const mealIds = selectedMeals.map((meal) => meal._id);

    const payload = {
      ...formData,
      numberOfGuests: Number(formData.numberOfGuests),
      mealIds,
    };

    try {
      const res = await createBooking(payload).unwrap();
      if (res.success) {
        dispatch(clearSelectedMeals());
        toast.success(res.message);
        const ids = res.data.map((b: any) => b).join(",");
        router.push(`/booking/success?bookingIds=${ids}`);
      }
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-green-800">
        Your Booking Details
      </h2>

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
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  {type}
                </h3>
                <ul className="space-y-4">
                  {meals.map((meal) => (
                    <li
                      key={meal._id}
                      className="p-4 border rounded-md shadow-sm bg-white relative flex items-center justify-between"
                    >
                      <div className="flex-1 pr-4">
                        <h4 className="text-lg font-semibold">{meal.name}</h4>
                        <p className="text-sm text-gray-600">
                          {meal.description}
                        </p>
                      </div>

                      <div className="md:w-24 text-green-800 font-bold text-right">
                        ${meal.price}
                      </div>

                      <button
                        className="ml-2 md:ml-4 px-3 py-1 text-sm cursor-pointer text-white bg-red-600 rounded hover:bg-red-700 transition"
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
            {/* Form Heading */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-xl text-gray-800">
                Reservation Details
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Please fill in your information to book a table
              </p>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "First Name",
                  name: "firstName",
                  type: "text",
                  placeholder: "John",
                },
                {
                  label: "Last Name",
                  name: "lastName",
                  type: "text",
                  placeholder: "Doe",
                },
                {
                  label: "Email Address",
                  name: "email",
                  type: "email",
                  placeholder: "your@email.com",
                },
                {
                  label: "Phone Number",
                  name: "phone",
                  type: "tel",
                  placeholder: "(123) 456-7890",
                },
                {
                  label: "Number of Guests",
                  name: "numberOfGuests",
                  type: "select",
                },
                {
                  label: "Reservation Date",
                  name: "reservationDate",
                  type: "date",
                },
                {
                  label: "Reservation Time",
                  name: "reservationTime",
                  type: "time",
                },
              ].map((input) =>
                input.type === "select" ? (
                  <div key={input.name} className="space-y-2">
                    <label
                      htmlFor={input.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {input.label}
                    </label>
                    <select
                      id={input.name}
                      name={input.name}
                      value={formData[input.name as keyof FormData]}
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
                ) : (
                  <div key={input.name} className="space-y-2">
                    <label
                      htmlFor={input.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {input.label}
                    </label>
                    <input
                      id={input.name}
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      value={formData[input.name as keyof FormData]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none text-gray-900"
                      required
                    />
                  </div>
                )
              )}
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className={`w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-lg transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Reserving..." : "Confirm Reservation"}
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
