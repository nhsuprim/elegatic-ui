import { baseApi } from "./baseApi";

// const categoriesApi = baseApi.injectEndpoints({
//     endpoints: (build) => ({
//         getAllCategory: build.query({
//             query: () => ({
//                 url: "/category",
//                 method: "GET",
//             }),
//         }),
//         getCategoryById: build.query({
//             query: (categoryId) => ({
//                 url: `/category/${categoryId}`,
//                 method: "GET",
//             }),
//         }),
//     }),
//     overrideExisting: false,
// });

// export const { useGetAllCategoryQuery, useGetCategoryByIdQuery } =
//     categoriesApi;
const categoriesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCategory: build.query({
            query: () => ({
                url: "/category",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }: { id: string }) => ({
                              type: "Category",
                              id,
                          })),
                          { type: "Category", id: "LIST" },
                      ]
                    : [{ type: "Category", id: "LIST" }],
        }),

        getCategoryById: build.query({
            query: (categoryId) => ({
                url: `/category/${categoryId}`,
                method: "GET",
            }),
            providesTags: ["Category"],
        }),

        // ✅ ADD DELETE MUTATION
        deleteCategory: build.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"], // ✅ IMPORTANT
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetAllCategoryQuery,
    useGetCategoryByIdQuery,
    useDeleteCategoryMutation, // ✅ EXPORT THIS
} = categoriesApi;
