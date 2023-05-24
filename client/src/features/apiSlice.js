import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Collection", "Product", "Cart", "User"],
  endpoints: (builder) => ({
    // Collections endpoints
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
    createCollection: builder.mutation({
      query: (data) => ({
        url: "/collection/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Collection"],
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

    // Products endpoints
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
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
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

    // Users endpoints
    loginUser: builder.mutation({
      query: (input) => ({
        url: "/user/login",
        method: "POST",
        body: input,
      }),
    }),
    signUpUser: builder.mutation({
      query: (data) => ({
        url: `/user/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result = [], error, arg) => [
        "User",
        ...result.map(({ id }) => ({ type: "User", id })),
      ],
    }),
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/user/${id}/update`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.id },
      ],
    }),

    // Cart endpoints
    getCartByUser: builder.query({
      query: (id) => `/cart-item/user/${id}`,
      providesTags: (result = [], error, arg) => [
        "Cart",
        ...result.map(({ id }) => ({ type: "Cart", id })),
      ],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/cart-item/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cart-item/${id}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Cart", id: arg.id },
      ],
    }),
    removeToCart: builder.mutation({
      query: (id) => ({
        url: `/cart-item/${id}/delete`,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Order Endpoints
    getOrders: builder.query({
      query: () => `/orders`,
      providesTags: (result = [], error, arg) => [
        "Order",
        ...result.map(({ id }) => ({ type: "Order", id })),
      ],
    }),
    getOrder: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),
    getOrdersByUser: builder.query({
      query: (id) => `/order/user/${id}`,
      providesTags: (result = [], error, arg) => [
        "Order",
        ...result.map(({ id }) => ({ type: "Order", id })),
      ],
    }),
    checkoutOrder: builder.mutation({
      query: (data) => ({
        url: `/order/checkout`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart", "Order"],
    }),
    changeStatusOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}/status-change`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Order", id: arg.id },
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
  useCreateCollectionMutation,
  useCreateProductMutation,
  useUpdateCollectionMutation,
  useUpdateProductMutation,
  useLoginUserMutation,
  useSignUpUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetCartByUserQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveToCartMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetOrdersByUserQuery,
  useCheckoutOrderMutation,
  useChangeStatusOrderMutation,
} = apiSlice;
