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
      const arr = action.payload;
      state.byId = {};
      state.allIds = [];
      arr.forEach((room) => {
        state.byId[room.id] = room;
        state.allIds.push(room.id);
      });
    },
    addChatroom(state, action) {},
    deleteChatroom(state, action) {},
    updateChatroom(state, action) {
      const { id, hasUnread } = action.payload;
      if (state.byId[id]) {
        state.byId[id].hasUnread = hasUnread;
      }
    },
  },
});

export const { setChatroom, addChatroom, deleteChatroom, updateChatroom } = chatroomSlice.actions;
export default chatroomSlice.reducer;
