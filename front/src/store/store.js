import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import messagesReducer from "./slices/messagesSlice";
import chatMembersReducer from "./slices/chatMembersSlice";
import chatroomReducer from "./slices/chatroomSlice";
import postReducer from "./slices/postSlice";
import notificationReducer from "./slices/notificationSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    messages: messagesReducer,
    chatMembers: chatMembersReducer,
    chatroom: chatroomReducer,
    post: postReducer,
    notification: notificationReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
