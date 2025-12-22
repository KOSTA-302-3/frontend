import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  allIds: [],
};

const chatMembersSlice = createSlice({
  name: "chatMembers",
  initialState,
  reducers: {
    setChatMembers(state, action) {
      const arr = action.payload;
      state.byId = {};
      state.allIds = [];
      arr.forEach((u) => {
        state.byId[u.id] = u;
        state.allIds.push(u.id);
      });
    },
    addChatMember(state, action) {
      const u = action.payload;
      if (!state.byId[u.id]) {
        state.byId[u.id] = u;
        state.allIds.push(u.id);
      }
    },
    removeChatMember(state, action) {
      const id = action.payload;
      if (state.byId[id]) {
        delete state.byId[id];
        state.allIds = state.allIds.filter((i) => i !== id);
      }
    },
    setOnline(state, action) {
      const { id, online } = action.payload;
      if (state.byId[id]) state.byId[id].online = online;
    },
  },
});

export const { setChatMembers, addChatMember, removeChatMember, setOnline } = chatMembersSlice.actions;
export default chatMembersSlice.reducer;
