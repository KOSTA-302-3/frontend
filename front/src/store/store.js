import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import messagesReducer from "./slices/messagesSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    messages: messagesReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
