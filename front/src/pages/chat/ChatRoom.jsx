import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageList from "../../components/chat/MessageList";
import ChatInput from "../../components/chat/ChatInput";
import UserList from "../../components/chat/UserList";
import { fetchChatInit, loadOlderMessages } from "../../store/thunks/chatThunks";
import { addMessage } from "../../store/slices/messagesSlice";
import { connectChatSocket, sendMessageViaSocket } from "../../lib/chatSocket";
import { useParams } from "react-router-dom";
import * as S from "./ChatRoom.Style";

const { Wrapper, LeftMessages, InputSlot, Drawer, Overlay, HamburgerButton } = S;

const CURRENT_USER_ID = "me";

export default function ChatRoom() {
  const { chatroomId } = useParams();

  console.log("ChatRoom mounted with chatroomId:", chatroomId);
  const dispatch = useDispatch();

  const messages = useSelector(
    (state) => state.messages.allIds.map((id) => state.messages.byId[id]),
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next) // 비교 함수
  );

  const users = useSelector(
    (state) => state.chatMembers.allIds.map((id) => state.chatMembers.byId[id]),
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next) // 비교 함수
  );

  const [isUserDrawerOpen, setUserDrawerOpen] = useState(false);

  useEffect(() => {
    //초기 데이터 로드
    dispatch(fetchChatInit(chatroomId));

    //웹소켓 연결
    connectChatSocket({ roomId: chatroomId, dispatch });
  }, [dispatch, chatroomId]);

  // ESC로 닫기
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && isUserDrawerOpen) {
        setUserDrawerOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isUserDrawerOpen]);

  const handleSend = useCallback(
    (text, files) => {
      // const currentUser = users.find((u) => u.id === CURRENT_USER_ID) || { username: "나", avatarUrl: undefined };
      // const payload = {
      //   id: `m${Date.now()}`,
      //   type: "me",
      //   userId: CURRENT_USER_ID,
      //   username: currentUser.username,
      //   avatarUrl: currentUser.avatarUrl,
      //   text: text || (files && files.length ? `[파일 ${files.length}개]` : ""),
      //   ts: Date.now(),
      // };
      // dispatch(addMessage(payload));
      sendMessageViaSocket(text, "TEXT");
      if (files && files.length) {
        files.forEach((file) => {
          sendMessageViaSocket(file, "IMAGE");
        });
      }
    },
    [dispatch, users]
  );

  const handleLoadMore = useCallback(() => {
    dispatch(loadOlderMessages());
  }, [dispatch]);

  return (
    <Wrapper>
      <LeftMessages>
        {/* 햄버거 버튼: 참여자 드로어 토글 */}
        <HamburgerButton
          aria-expanded={isUserDrawerOpen}
          aria-controls="user-drawer"
          onClick={() => setUserDrawerOpen((s) => !s)}
          title={isUserDrawerOpen ? "참여자 목록 닫기" : "참여자 목록 열기"}
        >
          ☰
        </HamburgerButton>

        <MessageList messages={messages} onLoadMore={handleLoadMore} />
      </LeftMessages>

      <InputSlot>
        <ChatInput onSend={handleSend} />
      </InputSlot>

      {/* Drawer: Wrapper 내부에 absolute로 겹쳐 표시 (grid 컬럼을 변경할 필요 없음) */}
      <Drawer id="user-drawer" open={isUserDrawerOpen} role="dialog" aria-hidden={!isUserDrawerOpen}>
        <UserList users={users} />
      </Drawer>

      {/* 오버레이: Drawer 열렸을 때만 보임, 클릭하면 닫힘 */}
      <Overlay $visible={isUserDrawerOpen} onClick={() => setUserDrawerOpen(false)} aria-hidden={!isUserDrawerOpen} />
    </Wrapper>
  );
}
