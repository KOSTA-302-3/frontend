import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchNotifications = createAsyncThunk("notification/fetchNotifications", async (page = 1) => {
  const res = await axiosInstance.get(`/api/notification/${page}`);
  return res.data.content; // 서버에서 내려주는 알림 배열
});

/*
  안 읽은 알림 개수 조회
*/
export const fetchUnreadCount = createAsyncThunk("notification/fetchUnreadCount", async () => {
  const res = await axiosInstance.get("/api/notification/count");
  return res.data;
});

/*
  개별 읽음 처리
*/
export const markRead = createAsyncThunk("notification/markRead", async (id) => {
  await axiosInstance.delete(`/api/notification/${id}`);
  return id;
});

/*
  전체 읽음 처리
*/
export const markAllRead = createAsyncThunk("notification/markAllRead", async () => {
  await axiosInstance.delete("/api/notification");
});
