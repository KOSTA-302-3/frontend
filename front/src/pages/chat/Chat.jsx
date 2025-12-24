import React, { useEffect, useState } from "react";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatRoomList from "../../components/chat/ChatRoomList";
import CreateChatModal from "../../components/chat/CreateChatModal";
import * as S from "./Chat.Style.js";
import { useDispatch, useSelector } from "react-redux";
import { enterChatRoomAndConnect, loadChatRooms } from "../../store/thunks/chatThunks.js";
import axiosInstance from "../../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";
const { PageWrap, HeaderArea, ContentArea } = S;

export default function Chat() {
  const nav = useNavigate();
  const [view, setView] = useState("me"); // 'me' | 'all'
  const initialChatRooms = useSelector(
    (state) => state.chatroom.allIds.map((id) => state.chatroom.byId[id]),
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  );
  const rooms = initialChatRooms;
  const [showCreate, setShowCreate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChatRooms({ page: 0, type: view === "me" ? "me" : "all", word: "" }));
  }, [dispatch, view]);

  function handleCreateModalOpen() {
    setShowCreate(true);
  }
  function handleCreateModalClose() {
    setShowCreate(false);
  }

  async function handleCreateRoom(newRoom) {
    // api요청 보내기
    try {
      const response = await axiosInstance.post("/api/chatroom", newRoom);
      const chatroomId = response.data;
      nav(`/chat/${chatroomId}`);
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
    }
  }

  return (
    <PageWrap>
      <HeaderArea>
        <ChatHeader view={view} setView={setView} onCreate={handleCreateModalOpen} />
      </HeaderArea>

      <ContentArea>
        <ChatRoomList rooms={rooms} />
      </ContentArea>

      {showCreate && <CreateChatModal onClose={handleCreateModalClose} onCreate={handleCreateRoom} />}
    </PageWrap>
  );
}
