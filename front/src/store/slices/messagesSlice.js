// RTK 예시 슬라이스 (간단 버전)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  allIds: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      const msg = action.payload;
      if (!state.byId[msg.id]) {
        state.byId[msg.id] = msg;
        state.allIds.push(msg.id);
      }
    },
    prependMessages(state, action) {
      // older messages come as array oldest->newest
      const arr = action.payload;
      arr.forEach((m) => {
        if (!state.byId[m.id]) {
          state.byId[m.id] = m;
          state.allIds.unshift(m.id);
        }
      });
    },
    markRead(state, action) {
      const { messageId } = action.payload;
      if (state.byId[messageId]) {
        state.byId[messageId].unreadCount = 0;
      }
    },
    setMessages(state, action) {
      const arr = action.payload;
      state.byId = {};
      state.allIds = [];
      arr.forEach((m) => {
        state.byId[m.id] = m;
        state.allIds.push(m.id);
      });
    },
  },
});

export const { addMessage, prependMessages, markRead, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
