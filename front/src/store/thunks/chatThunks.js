import { createAsyncThunk } from "@reduxjs/toolkit";
import { setChatMembers } from "../slices/chatMembersSlice";
import { setMessages, prependMessages } from "../slices/messagesSlice";

/*
  채팅방 최초 진입 시 초기 데이터 로딩 thunk
*/
export const fetchChatInit = createAsyncThunk("chat/fetchInit", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;

  // TODO: 나중에 여기서 fetch("/api/chat/init")로 교체됨
  const chatMembers = [
    { id: "me", username: "나", avatarUrl: "https://i.pravatar.cc/40?u=1", online: true },
    { id: "u2", username: "민수", avatarUrl: "https://i.pravatar.cc/40?u=2", online: true },
    { id: "u3", username: "영희", avatarUrl: "https://i.pravatar.cc/40?u=3", online: false },
  ];

  const messages = [
    { id: "n1", type: "notice", text: "민수님이 입장했습니다", ts: Date.now() - 1000 * 60 * 10 },
    {
      id: "m1",
      type: "other",
      userId: "u2",
      username: "민수",
      avatarUrl: "https://i.pravatar.cc/40?u=2",
      text: "안녕하세요!",
      ts: Date.now() - 1000 * 60 * 9,
      unreadCount: 1,
    },
    {
      id: "m2",
      type: "me",
      userId: "me",
      username: "나",
      avatarUrl: "https://i.pravatar.cc/40?u=1",
      text: "반가워요, 민수님",
      ts: Date.now() - 1000 * 60 * 8,
    },
    {
      id: "m3",
      type: "other",
      userId: "u2",
      username: "민수",
      avatarUrl: "https://i.pravatar.cc/40?u=2",
      text: "오늘 회의는 몇 시에 할까요?",
      ts: Date.now() - 1000 * 60 * 7,
    },
  ];

  // Redux state 갱신은 reducer에게 맡김
  dispatch(setChatMembers(chatMembers));
  dispatch(setMessages(messages));

  return true; // fulfilled 용도 (지금은 의미 없음)
});

/*
  과거 메시지 로딩 thunk
*/
export const loadOlderMessages = createAsyncThunk("chat/loadOlderMessages", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;

  // 서버 요청 흉내
  await new Promise((r) => setTimeout(r, 700));

  const olderMessages = [
    {
      id: `m-old-${Date.now()}`,
      type: "other",
      userId: "u2",
      username: "민수",
      avatarUrl: "https://i.pravatar.cc/40?u=2",
      text: "이전 대화 예시입니다.",
      ts: Date.now() - 1000 * 60 * 60,
    },
  ];

  dispatch(prependMessages(olderMessages));
  return true;
});
