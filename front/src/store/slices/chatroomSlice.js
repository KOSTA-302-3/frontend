import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  allIds: [],
};

const chatroomSlice = createSlice({
  name: "chatroom",
  initialState,
  reducers: {
    setChatroom(state, action) {
      console.log("setChatroom action.payload:", action.payload);
      const arr = action.payload;
      state.byId = {};
      state.allIds = [];
      arr.forEach((room) => {
        state.byId[room.id] = room;
        state.allIds.push(room.id);
      });
    },
    addChatroom(state, action) {
      console.log("addChatroom action.payload:", action.payload);
    },
    deleteChatroom(state, action) {
      console.log("deleteChatroom action.payload:", action.payload);
    },
    updateChatroom(state, action) {
      console.log("updateChatroom action.payload:", action.payload);
    },
  },
});

export const { setChatroom, addChatroom, deleteChatroom, updateChatroom } = chatroomSlice.actions;
export default chatroomSlice.reducer;
