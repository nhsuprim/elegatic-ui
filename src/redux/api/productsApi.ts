import { baseApi } from "./baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => ({
                url: "/product",
                method: "GET",
            }),
        }),
        getProductById: build.query({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: "GET",
            }),
        }),
        updateProduct: build.mutation({
            query: ({ productId, updatedData }) => ({
                url: `/product/${productId}`,
                method: "PATCH",
                body: updatedData,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productsApi;
