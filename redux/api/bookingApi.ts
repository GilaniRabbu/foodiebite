import { baseApi } from "./baseApi";
import { IBooking, IGenericResponse } from "@/types/booking";

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

    getBookingsByUserId: build.query<
      IGenericResponse<IBooking[]>,
      {
        userId: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ userId, page = 1, limit = 10 }) =>
        `/booking/user/${userId}?page=${page}&limit=${limit}`,
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useGetPaginatedBookingsQuery,
  useGetAllBookingsQuery,
  useGetBookingsByUserIdQuery,
} = bookingApi;
