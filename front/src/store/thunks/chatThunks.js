import { createAsyncThunk } from "@reduxjs/toolkit";
import { addChatMember, setChatMembers, setOnline } from "../slices/chatMembersSlice";
import { setMessages, prependMessages } from "../slices/messagesSlice";
import axiosInstance from "../../api/axiosInstance";
import { setChatroom } from "../slices/chatroomSlice";
import { connectChatSocket } from "../../lib/chatSocket";
import { fetchMyInfo, getChatMemberRole } from "./authThunks";
import { fetchNewMessages } from "./notificationThunks";

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
export const loadOlderMessages = createAsyncThunk("chat/loadOlderMessages", async ({ chatroomId, page }, thunkAPI) => {
  const { dispatch } = thunkAPI;

  // 서버 요청 흉내
  await new Promise((r) => setTimeout(r, 700));

  try {
    const response = await axiosInstance.get(`/api/message/${chatroomId}?page=${page}`);
    const messages = response.data.content; // 역순 정렬
    const olderMessages = [...messages].reverse();
    dispatch(prependMessages(olderMessages));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }

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
    const member = response.data;

    if (member && member.id != null) {
      dispatch(addChatMember(member));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const enterChatRoomAndConnect = createAsyncThunk(
  "chat/enterChatRoomAndConnect",
  async ({ chatroomId }, thunkAPI) => {
    const { dispatch } = thunkAPI;

    // 입장
    await dispatch(enterChatRoom({ chatroomId })).unwrap();

    // WS 연결
    await new Promise((resolve, reject) => {
      connectChatSocket({
        roomId: chatroomId,
        dispatch,
        onOpen: async () => {
          try {
            await dispatch(fetchMyInfo()).unwrap();

            await dispatch(getChatMemberRole(chatroomId)).unwrap();

            await dispatch(fetchChatInit(chatroomId)).unwrap();

            await dispatch(fetchNewMessages()).unwrap();

            resolve(true); // 🔥 여기서야 진짜 "모든 준비 끝"
          } catch (err) {
            reject(err);
          }
        },
        onError: reject,
      });
    });
  }
);

export const deleteChatRoom = createAsyncThunk("chat/deleteChatRoom", async (chatroomId, thunkAPI) => {
  try {
    await axiosInstance.delete(`/api/chatroom/${chatroomId}`);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteChatMember = createAsyncThunk("chat/deleteChatMember", async (chatMemberId, thunkAPI) => {
  try {
    await axiosInstance.delete(`/api/chatmember/${chatMemberId}`);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchChatMembers = createAsyncThunk("chat/fetchChatMembers", async (chatroomId, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    const [memberRes] = await Promise.all([
      axiosInstance.get(`/api/chatmember/${chatroomId}`, {
        withCredentials: true,
      }),
    ]);
    // 채팅방 멤버 세팅
    await dispatch(setChatMembers(memberRes.data));
    // fulfilled payload (의미 있는 값 반환 가능)
    return {
      memberCount: memberRes.data.length,
    };
  } catch (err) {
    console.error("Error fetching chat init data:", err);

    // rejected 상태로 넘김
    return thunkAPI.rejectWithValue(err.response?.data);
  } // fulfilled 용도 (지금은 의미 없음)
});
