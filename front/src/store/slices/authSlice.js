import { createSlice } from "@reduxjs/toolkit";
import { fetchMyInfo } from "../thunks/authThunks";

const initialState = {
  userId: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload;
      })
      .addCase(fetchMyInfo.rejected, (state) => {
        state.loading = false;
        state.userId = null;
      });
  },
});

export default authSlice.reducer;
