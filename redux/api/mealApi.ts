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

    // Get All Meals
    getAllMeals: build.query({
      query: () => ({
        url: "/meals",
        method: "GET",
      }),
      providesTags: ["Meal"],
    }),

    // ✅ Get all categories
    getAllCategories: build.query<any, void>({
      query: () => ({
        url: "/meals/categories",
        method: "GET",
      }),
      providesTags: ["Meal"],
    }),

    // ✅ Get meals by category with optional pagination/sorting
    getMealsByCategory: build.query({
      query: ({
        category,
        page,
        limit,
        sortBy,
        sortOrder,
      }: {
        category: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
      }) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);
        return {
          url: `/meals/meals-by-category?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Meal"],
    }),

    // Get Meal by ID
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
  useGetAllCategoriesQuery,
  useGetMealsByCategoryQuery,
} = mealApi;
