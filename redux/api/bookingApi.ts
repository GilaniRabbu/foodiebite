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
  }),
});

export const { useCreateBookingMutation } = bookingApi;
