import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotifications,
  fetchUnreadCount,
  markRead,
  markAllRead,
  fetchNewMessages,
} from "../thunks/notificationThunks";

const initialState = {
  items: [], // 알림 목록
  unreadCount: 0, // 안 읽은 개수 (count API 기준)
  newMessage: 0, // 새로운 메시지 도착 여부
  loadingList: false, // 알림 목록 로딩 중
  markingOne: false, // 개별 읽음 처리 중
  markingAll: false, // 전체 읽음 처리 중
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    increaseUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    increaseNewMessage: (state) => {
      state.newMessage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      /* =====================
         알림 목록 조회
         ===================== */
      .addCase(fetchNotifications.pending, (state) => {
        state.loadingList = true; // 목록 로딩 시작
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.items = action.payload; // 목록 저장
        state.loadingList = false; // 로딩 종료
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loadingList = false; // 실패해도 종료
      })

      /* =====================
         unread count 조회
         ===================== */
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })

      .addCase(fetchNewMessages.fulfilled, (state, action) => {
        state.newMessage = action.payload;
      })

      /* =====================
         개별 읽음 처리
         ===================== */
      .addCase(markRead.pending, (state) => {
        state.markingOne = true; // 처리 시작
      })
      .addCase(markRead.fulfilled, (state, action) => {
        // 읽은 알림을 목록에서 제거
        state.items = state.items.filter((n) => n.id !== action.payload);

        // unreadCount 감소 (0 아래로 내려가지 않게 안전 처리)
        if (state.unreadCount > 0) {
          state.unreadCount -= 1;
        }

        state.markingOne = false; // 처리 종료
      })
      .addCase(markRead.rejected, (state) => {
        state.markingOne = false; // 실패해도 종료
      })

      /* =====================
         전체 읽음 처리
         ===================== */
      .addCase(markAllRead.pending, (state) => {
        state.markingAll = true; // 처리 시작
      })
      .addCase(markAllRead.fulfilled, (state) => {
        state.items = [];
        state.unreadCount = 0;
        state.markingAll = false; // 처리 종료
      })
      .addCase(markAllRead.rejected, (state) => {
        state.markingAll = false; // 실패해도 종료
      });
  },
});

export const { increaseUnreadCount, increaseNewMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
