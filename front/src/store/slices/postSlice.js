import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: 10,
  userId: 0,
  layer: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload;
    },

    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    setLayer: (state, action) => {
      state.layer = action.payload;
    },
  },
});

export const { setLevel, setUserId, setLayer } = postSlice.actions;
export default postSlice.reducer;
