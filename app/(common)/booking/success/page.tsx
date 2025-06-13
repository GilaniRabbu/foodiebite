"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
    const searchParams = useSearchParams();
    const bookingIdsParam = searchParams.get("bookingIds");

    // Convert comma-separated string to array
    const bookingIds = bookingIdsParam ? bookingIdsParam.split(",") : [];

    return (
        <div>
            <h1>Booking IDs:</h1>
            <ul>
                {bookingIds.map((id, index) => (
                    <li key={index}>{id}</li>
                ))}
            </ul>
        </div>
    );
};

export default Page;
