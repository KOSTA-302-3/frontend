import { createAsyncThunk } from "@reduxjs/toolkit";
import { setChatMembers } from "../slices/chatMembersSlice";
import { setMessages, prependMessages } from "../slices/messagesSlice";
import axiosInstance from "../../api/axiosInstance";
import { setChatroom } from "../slices/chatroomSlice";
import { connectChatSocket } from "../../lib/chatSocket";
import { fetchMyInfo } from "./authThunks";

/*
  채팅방 최초 진입 시 초기 데이터 로딩 thunk
*/
export const fetchChatInit = createAsyncThunk("chat/fetchInit", async (chatroomId, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    // 두 요청을 병렬로 실행
    const [messageRes, memberRes] = await Promise.all([
      axiosInstance.get(`/api/message/${chatroomId}`, {
        withCredentials: true,
      }),
      axiosInstance.get(`/api/chatmember/${chatroomId}`, {
        withCredentials: true,
      }),
    ]);

    // 서버 메시지 역순 정렬 (최신 → 오래된 순서 보정)
    const newMessages = [...messageRes.data.content].reverse();
    dispatch(setMessages(newMessages));

    // 채팅방 멤버 세팅
    dispatch(setChatMembers(memberRes.data));
    // fulfilled payload (의미 있는 값 반환 가능)
    return {
      messageCount: newMessages.length,
      memberCount: memberRes.data.length,
    };
  } catch (err) {
    console.error("Error fetching chat init data:", err);

    // rejected 상태로 넘김
    return thunkAPI.rejectWithValue(err.response?.data);
  } // fulfilled 용도 (지금은 의미 없음)
});

/*
  과거 메시지 로딩 thunk
*/
export const loadOlderMessages = createAsyncThunk("chat/loadOlderMessages", async (chatroomId, thunkAPI) => {
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

export const loadChatRooms = createAsyncThunk("chat/loadChatRooms", async ({ page, type, word }, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    // 채팅방 목록 조회 API 호출
    const response = await axiosInstance.get(`/api/chatroom?page=${page}&type=${type}&word=${word}`, {
      withCredentials: true,
    });

    // 실제 데이터 추출
    const chatroomList = response.data.content;

    // slice로 데이터 저장
    dispatch(setChatroom(chatroomList));

    // fulfilled payload (선택)
    return chatroomList;
  } catch (error) {
    // rejected 상태로 에러 전달
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 채팅방 입장 요청 thunk(ChatroomMmeber 생성)
 */
export const enterChatRoom = createAsyncThunk("chat/enterChatRoom", async ({ chatroomId }, thunkAPI) => {
  const { dispatch } = thunkAPI;
  try {
    const response = await axiosInstance.post(`/api/chatmember`, {
      chatroomId: chatroomId,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const enterChatRoomAndConnect = createAsyncThunk(
  "chat/enterChatRoomAndConnect",
  async ({ chatroomId }, thunkAPI) => {
    const { dispatch } = thunkAPI;

    // 1️⃣ 입장
    await dispatch(enterChatRoom({ chatroomId })).unwrap();

    // 2️⃣ WS 연결
    connectChatSocket({
      roomId: chatroomId,
      dispatch,
      onOpen: () => {
        dispatch(fetchMyInfo());
        dispatch(fetchChatInit(chatroomId));
      },
    });
  }
);
