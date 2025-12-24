import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchMyInfo = createAsyncThunk("auth/fetchMyInfo", async () => {
  const res = await axiosInstance.get("/api/user/userId");
  return res.data;
});
