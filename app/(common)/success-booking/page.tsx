"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const total = searchParams.get("total");

  console.log(bookingId, total);

  return (
    <div>
      Booking ID: {bookingId}, Total: {total}
    </div>
  );
};

export default Page;
