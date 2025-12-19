import React, { useState } from "react";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatRoomList from "../../components/chat/ChatRoomList";
import CreateChatModal from "../../components/chat/CreateChatModal";
import { initialChatRooms } from "./dummyChatRooms";
import * as S from "./Chat.Style.js";
const { PageWrap, HeaderArea, ContentArea } = S;

export default function Chat() {
  const [view, setView] = useState("mine"); // 'mine' | 'all'
  const [rooms, setRooms] = useState(initialChatRooms);
  const [showCreate, setShowCreate] = useState(false);

  function handleCreateModalOpen() {
    setShowCreate(true);
  }
  function handleCreateModalClose() {
    setShowCreate(false);
  }

  function handleCreateRoom(newRoom) {
    // UI에 바로 보이도록 가장 위에 추가
    setRooms((prev) => [newRoom, ...prev]);
  }

  // filter according to view (demo)
  const filteredRooms = React.useMemo(() => {
    if (view === "mine") {
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
