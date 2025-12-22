import React, { useEffect, useState } from "react";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatRoomList from "../../components/chat/ChatRoomList";
import CreateChatModal from "../../components/chat/CreateChatModal";
import * as S from "./Chat.Style.js";
import { useDispatch, useSelector } from "react-redux";
import { loadChatRooms } from "../../store/thunks/chatThunks.js";
const { PageWrap, HeaderArea, ContentArea } = S;

export default function Chat() {
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

  function handleCreateRoom(newRoom) {
    // UI에 바로 보이도록 가장 위에 추가
    console.log("새 채팅방 생성:", newRoom);
  }

  // filter according to view (demo)
  const filteredRooms = React.useMemo(() => {
    if (view === "me") {
      // demo: show every other room as 내 채팅방
      return rooms.filter((r, idx) => idx % 2 === 0);
    }
    return rooms;
  }, [rooms, view]);

  return (
    <PageWrap>
      <HeaderArea>
        <ChatHeader view={view} setView={setView} onCreate={handleCreateModalOpen} />
      </HeaderArea>

      <ContentArea>
        <ChatRoomList rooms={filteredRooms} />
      </ContentArea>

      {showCreate && <CreateChatModal onClose={handleCreateModalClose} onCreate={handleCreateRoom} />}
    </PageWrap>
  );
}
