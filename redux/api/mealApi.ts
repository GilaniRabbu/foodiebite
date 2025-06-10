/* eslint-disable */
import { baseApi } from "./baseApi";

const mealApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Meal
    createMeal: build.mutation({
      query: (formData: FormData) => ({
        url: "/meals/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Meal"],
    }),

    // getMeals: build.query({
    //   query: () => "/meals",
    //   providesTags: ["Meal"],
    // }),

    // Get All Meals
    getAllMeals: build.query({
      query: () => ({
        url: "/meals",
        method: "GET",
      }),
      providesTags: ["Meal"],
    }),

    // Get Single Meal
    getMealById: build.query({
      query: (id: string) => ({
        url: `/meals/${id}`,
        method: "GET",
      }),
      providesTags: ["Meal"],
    }),

    // Update Meal
    updateMeal: build.mutation({
      query: ({ id, data }: { id: string; data: Partial<any> }) => ({
        url: `/meals/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Meal"],
    }),

    // Delete Meal
    deleteMeal: build.mutation({
      query: (id: string) => ({
        url: `/meals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meal"],
    }),
  }),
});

export const {
  useCreateMealMutation,
  useGetAllMealsQuery,
  useGetMealByIdQuery,
  useUpdateMealMutation,
  useDeleteMealMutation,
  // useGetMealsQuery,
} = mealApi;
