import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";

import userReducer from "../features/usersSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
