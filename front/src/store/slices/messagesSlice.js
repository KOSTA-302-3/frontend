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
      const arr = action.payload;

      // 뒤에서부터 넣어야 순서 유지됨
      for (let i = arr.length - 1; i >= 0; i--) {
        const m = arr[i];
        if (!state.byId[m.id]) {
          state.byId[m.id] = m;
          state.allIds.unshift(m.id);
        }
      }
    },
    markRead(state, action) {
      const { messageId } = action.payload;
      if (state.byId[messageId]) {
        state.byId[messageId].unreadCount = 0;
      }
    },
    updateUnreadCount(state, action) {
      const { lastRead } = action.payload;
      // lastRead 이후 메시지들의 unreadCount를 1 감소
      console.log("Updating unread counts for messages after:", lastRead);
      console.log("byId values:", Object.values(state.byId));
      Object.values(state.byId).forEach((msg) => {
        if (msg.id > lastRead && msg.unreadCount > 0) {
          console.log("Decreasing unread count for message:", msg.id);
          console.log("Before:", msg.unreadCount);
          msg.unreadCount -= 1;
        }
      });
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
    resetMessages(state) {
      state.byId = {};
      state.allIds = [];
    },
  },
});

export const { addMessage, prependMessages, markRead, setMessages, resetMessages, updateUnreadCount } = messagesSlice.actions;
export default messagesSlice.reducer;
