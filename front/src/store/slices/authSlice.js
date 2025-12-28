import { createSlice } from "@reduxjs/toolkit";
import { fetchMyInfo, fetchMyProfile, getChatMemberRole } from "../thunks/authThunks";

const initialState = {
  userId: null,
  user: null,
  role: null,
  online: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updatePrivacy(state, action) {
      state.user.isPrivate = action.payload;
    },
  },
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
      })
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMyProfile.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { setIsLogin, updatePrivacy } = authSlice.actions;
export default authSlice.reducer;
