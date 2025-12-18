import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  allIds: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      const arr = action.payload;
      state.byId = {};
      state.allIds = [];
      arr.forEach((u) => {
        state.byId[u.id] = u;
        state.allIds.push(u.id);
      });
    },
    addUser(state, action) {
      const u = action.payload;
      if (!state.byId[u.id]) {
        state.byId[u.id] = u;
        state.allIds.push(u.id);
      }
    },
    removeUser(state, action) {
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

export const { setUsers, addUser, removeUser, setOnline } = usersSlice.actions;
export default usersSlice.reducer;
