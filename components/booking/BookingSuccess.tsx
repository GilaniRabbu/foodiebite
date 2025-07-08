/* eslint-disable */
"use client";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useGetBookingByIdQuery } from "@/redux/api/bookingApi";
import React from "react";
import Link from "next/link";
import Loader from "@/components/shared/Loader";
import { motion } from "framer-motion";

const BookingSuccess = () => {
  const searchParams = useSearchParams();
  const bookingIdsParam = searchParams.get("bookingIds");
  const bookingId = bookingIdsParam?.split(",")[0] || "";

  const { data, isLoading, isError } = useGetBookingByIdQuery(bookingId, {
    skip: !bookingId,
  });

  if (isLoading) return <Loader />;

  if (isError || !data?.data) {
    return (
      <div className="text-center py-12 text-red-600">
        Failed to load booking information.
      </div>
    );
  }

  const booking = data.data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Animated Success Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        >
          <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        </motion.div>
        <h1 className="text-4xl font-extrabold text-green-800 mb-2">
          Booking Successful!
        </h1>
        <p className="text-gray-600 text-lg">
          Thank you for choosing{" "}
          <span className="font-semibold text-orange-500">FoodieBite</span>.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Booking Ref:{" "}
          <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
            {booking._id}
          </span>
        </p>
      </motion.div>

      {/* Meals Section */}
      {booking.mealIds?.length > 0 && (
        <motion.div
          className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Selected Meals
          </h3>
          <ul className="divide-y divide-gray-100">
            {booking.mealIds.map((meal: any, i: number) => (
              <motion.li
                key={meal._id}
                className="py-4 flex justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div>
                  <h4 className="text-md font-semibold text-gray-800">
                    {meal.name}
                  </h4>
                  {meal.description && (
                    <p className="text-sm text-gray-500">{meal.description}</p>
                  )}
                </div>
                <div className="text-green-700 font-bold text-md">
                  ${meal.price}
                </div>
              </motion.li>
            ))}
          </ul>
          <div className="text-right text-lg font-bold text-green-800 mt-4">
            Total: ${booking.total}
          </div>
        </motion.div>
      )}

      {/* Reservation Info */}
      <motion.div
        className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Reservation Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <span className="font-medium text-gray-600">Full Name:</span>
            <br />
            {booking.firstName} {booking.lastName}
          </div>
          <div>
            <span className="font-medium text-gray-600">Phone:</span>
            <br />
            {booking.phone}
          </div>
          <div>
            <span className="font-medium text-gray-600">Email:</span>
            <br />
            {booking.email}
          </div>
          <div>
            <span className="font-medium text-gray-600">Guests:</span>
            <br />
            {booking.numberOfGuests}
          </div>
          <div>
            <span className="font-medium text-gray-600">Date:</span>
            <br />
            {new Date(booking.reservationDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium text-gray-600">Time:</span>
            <br />
            {booking.reservationTime}
          </div>
          <div>
            <span className="font-medium text-gray-600">Type:</span>
            <br />
            {booking.type}
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded text-sm text-center font-medium transition"
        >
          Return to Home
        </Link>
        <Link
          href="/meals"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded text-sm text-center font-medium transition"
        >
          Check our Meals
        </Link>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
