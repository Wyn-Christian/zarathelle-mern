import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Collection", "Product", "Cart", "Customer"],
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: () => "/collections",
      providesTags: (result = [], error, arg) => [
        "Collection",
        ...result.map(({ id }) => ({ type: "Collection", id })),
      ],
    }),
    getCollection: builder.query({
      query: (id) => `/collection/${id}`,
      providesTags: (result, error, arg) => [
        { type: "Collection", id: arg },
      ],
    }),
    getProductsOfCollection: builder.query({
      query: (id) => `/collection/${id}/products`,
    }),
    getProducts: builder.query({
      query: () => `/products`,
      providesTags: (result = [], error, arg) => [
        "Product",
        ...result.map(({ id }) => ({ type: "Product", id })),
      ],
    }),
    getProduct: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    loginUser: builder.mutation({
      query: (input) => ({
        url: "/user/login",
        method: "POST",
        body: input,
      }),
    }),
    createCollection: builder.mutation({
      query: (data) => ({
        url: "/collection/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Collection"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateCollection: builder.mutation({
      query: ({ id, collection }) => ({
        url: `/collection/${id}/update`,
        method: "POST",
        body: collection,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Collection", id: arg.id },
      ],
    }),
    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `/product/${id}/update`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionQuery,
  useGetProductsOfCollectionQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useLoginUserMutation,
  useCreateCollectionMutation,
  useCreateProductMutation,
  useUpdateCollectionMutation,
  useUpdateProductMutation,
} = apiSlice;
