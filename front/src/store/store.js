import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import messagesReducer from "./slices/messagesSlice";
import chatMembersReducer from "./slices/chatMembersSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    messages: messagesReducer,
    chatMembers: chatMembersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
