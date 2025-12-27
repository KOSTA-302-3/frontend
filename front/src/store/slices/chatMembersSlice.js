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
      console.log("Adding chat member:", action.payload);
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
    resetChatMembers(state) {
      state.byId = {};
      state.allIds = [];
    },
  },
});

export const { setChatMembers, addChatMember, removeChatMember, setOnline, resetChatMembers } =
  chatMembersSlice.actions;
export default chatMembersSlice.reducer;
