import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (data) => ({
        url: "/booking/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    getBookingById: build.query({
      query: (id: string) => `/booking/${id}`,
      providesTags: ["Booking"],
    }),
  }),
});

export const { useCreateBookingMutation, useGetBookingByIdQuery } = bookingApi;
