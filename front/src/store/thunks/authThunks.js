import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchMyInfo = createAsyncThunk("auth/fetchMyInfo", async () => {
  const res = await axiosInstance.get("/api/user/userId");
  return res.data;
});

export const getChatMemberRole = createAsyncThunk("auth/getChatMemberRole", async (chatroomId) => {
  const res = await axiosInstance.get(`/api/chatmember/role/${chatroomId}`);
  return res.data;
});

export const fetchMyProfile = createAsyncThunk("auth/fetchMyProfile", async () => {
  const res = await axiosInstance.get("/api/user/me");
  return res.data;
});
