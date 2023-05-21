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
