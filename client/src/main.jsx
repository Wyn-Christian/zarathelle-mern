import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import theme from "./app/theme.jsx";
import store from "./app/store.js";

import { SnackbarProvider } from "notistack";

// Components routes
import ErrorPage from "./routes/ErrorPage.jsx";
import Root from "./routes/Root.jsx";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./routes/client/Home.jsx";
import Collections from "./routes/client/Collections.jsx";
import Login from "./routes/client/Login.jsx";
import SignUp from "./routes/client/SignUp.jsx";
import ProductList from "./routes/client/ProductList.jsx";
import Product from "./routes/client/Product.jsx";
import CartItems from "./routes/client/CartItems.jsx";
import Orders from "./routes/client/Orders.jsx";
import UserProfile from "./routes/client/UserProfile.jsx";
import Dashboard from "./routes/admin/Dashboard.jsx";
import AdminRoot from "./routes/admin/AdminRoot.jsx";
import CustomersCreate from "./routes/admin/customers/CustomersCreate.jsx";
import ProductsCreate from "./routes/admin/products/ProductsCreate.jsx";
import CollectionsCreate from "./routes/admin/collections/CollectionsCreate.jsx";
import CustomersList from "./routes/admin/customers/CustomersList.jsx";
import CustomersDetail from "./routes/admin/customers/CustomersDetail.jsx";
import CustomersUpdate from "./routes/admin/customers/CustomersUpdate.jsx";
import CollectionsList from "./routes/admin/collections/CollectionsList.jsx";
import CollectionsDetail from "./routes/admin/collections/CollectionsDetail.jsx";
import CollectionsUpdate from "./routes/admin/collections/CollectionsUpdate.jsx";
import ProductsList from "./routes/admin/products/ProductsList.jsx";
import ProductsDetail from "./routes/admin/products/ProductsDetail.jsx";
import ProductsUpdate from "./routes/admin/products/ProductsUpdate.jsx";
import OrdersList from "./routes/admin/orders/OrdersList.jsx";
import OrdersDetail from "./routes/admin/orders/OrdersDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/collections",
            element: <Collections />,
          },
          {
            path: "/collections/:id",
            element: <ProductList />,
          },
          {
            path: "/product/:id",
            element: <Product />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
          },
          {
            path: "/user",
            children: [
              {
                index: true,
                element: <UserProfile />,
              },
              {
                path: "cart-items",
                element: <CartItems />,
              },
              {
                path: "orders",
                element: <Orders />,
              },
            ],
          },
          {
            path: "/admin",
            element: <AdminRoot />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "customers",
                children: [
                  {
                    path: "list",
                    element: <CustomersList />,
                  },
                  {
                    path: ":id",
                    element: <CustomersDetail />,
                  },
                  {
                    path: ":id/update",
                    element: <CustomersUpdate />,
                  },
                  {
                    path: "create",
                    element: <CustomersCreate />,
                  },
                ],
              },
              {
                path: "collections",
                children: [
                  {
                    path: "list",
                    element: <CollectionsList />,
                  },
                  {
                    path: ":id",
                    element: <CollectionsDetail />,
                  },
                  {
                    path: ":id/update",
                    element: <CollectionsUpdate />,
                  },
                  {
                    path: "create",
                    element: <CollectionsCreate />,
                  },
                ],
              },
              {
                path: "products",
                children: [
                  {
                    path: "list",
                    element: <ProductsList />,
                  },
                  {
                    path: ":id",
                    element: <ProductsDetail />,
                  },
                  {
                    path: ":id/update",
                    element: <ProductsUpdate />,
                  },
                  {
                    path: "create",
                    element: <ProductsCreate />,
                  },
                ],
              },
              {
                path: "orders",
                children: [
                  {
                    index: true,
                    element: <OrdersList />,
                  },
                  {
                    path: ":id",
                    element: <OrdersDetail />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
