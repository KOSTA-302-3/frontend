import { createSlice } from "@reduxjs/toolkit";
import { fetchMyInfo, getChatMemberRole } from "../thunks/authThunks";

const initialState = {
  userId: null,
  role: null,
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
      })
      .addCase(getChatMemberRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChatMemberRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(getChatMemberRole.rejected, (state) => {
        state.loading = false;
        state.role = null;
      });
  },
});

export default authSlice.reducer;
