import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import theme from "./app/theme.jsx";
import store from "./app/store.js";

// Components routes
import ErrorPage from "./routes/ErrorPage.jsx";
import Root from "./routes/Root.jsx";
import { ThemeProvider } from "@mui/material";
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
                path: "customers/list",
                element: <h1>Customers List </h1>,
              },
              {
                path: "customers/create",
                element: <h1>Customers Create </h1>,
              },
              {
                path: "collections/list",
                element: <h1>Collections List</h1>,
              },
              {
                path: "collections/create",
                element: <h1>Collections Create </h1>,
              },
              {
                path: "products/list",
                element: <h1>Products List</h1>,
              },
              {
                path: "products/create",
                element: <h1>Products Create </h1>,
              },
              {
                path: "orders",
                element: <h1>Order List</h1>,
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
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
