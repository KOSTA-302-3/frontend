import React from "react";
import styled from "styled-components";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatRoomList from "../../components/chat/ChatRoomList";
import CreateChatModal from "../../components/chat/CreateChatModal";
import { initialChatRooms } from "./dummyChatRooms";

const PageWrap = styled.div`
  height: calc(100vh - 22vh); /* top 12vh + bottom 10vh removed (they exist outside) */
  background: #000; /* solid black */
  color: #e5e7eb;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/* header area has fixed height 64px inside this container */
const HeaderArea = styled.div`
  flex: 0 0 64px;
`;

/* list area fills the rest */
const ContentArea = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
`;

export default function Chat() {
  const [view, setView] = React.useState("mine"); // 'mine' | 'all'
  const [rooms, setRooms] = React.useState(initialChatRooms);
  const [showCreate, setShowCreate] = React.useState(false);

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
