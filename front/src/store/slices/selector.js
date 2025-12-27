import { createSelector } from "@reduxjs/toolkit";

// messages
const selectMessageIds = (state) => state.messages.allIds;
const selectMessageById = (state) => state.messages.byId;

export const selectAllMessages = createSelector(
  [selectMessageIds, selectMessageById],
  (ids, byId) => ids.map((id) => byId[id]) // ← 여기서 한번만 생성됨
);

// users
const selectUserIds = (state) => state.chatMembers.allIds;
const selectUserById = (state) => state.chatMembers.byId;
    
export const selectAllUsers = createSelector(
  [selectUserIds, selectUserById],
  (ids, byId) => ids.map((id) => byId[id])
);