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

    getPaginatedBookings: build.query({
      query: (params) => ({
        url: "/booking",
        method: "GET",
        params,
      }),
      providesTags: ["Booking"],
    }),
    getAllBookings: build.query({
      query: (params) => ({
        url: `/booking`,
        params,
      }),
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useGetPaginatedBookingsQuery,
  useGetAllBookingsQuery,
} = bookingApi;
