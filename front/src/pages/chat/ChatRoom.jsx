import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageList from "../../components/chat/MessageList";
import ChatInput from "../../components/chat/ChatInput";
import UserList from "../../components/chat/UserList";
import { fetchChatInit, loadOlderMessages } from "../../store/thunks/chatThunks";
import { addMessage } from "../../store/slices/messagesSlice";
import { connectChatSocket } from "../../lib/chatSocket";
import { useParams } from "react-router-dom";
import * as S from "./ChatRoom.Style";

const { Wrapper, LeftMessages, InputSlot, RightCol } = S;

// 임시: 현재 사용자 ID
const CURRENT_USER_ID = "me";

export default function ChatRoom() {
  const { chatroomId } = useParams();

  console.log("ChatRoom roomId:", chatroomId);

  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.allIds.map((id) => state.messages.byId[id]));

  const users = useSelector((state) => state.users.allIds.map((id) => state.users.byId[id]));

  useEffect(() => {
    dispatch(fetchChatInit());
  }, [dispatch]);

  const handleSend = useCallback(
    (text, files) => {
      const currentUser = users.find((u) => u.id === CURRENT_USER_ID) || { username: "나", avatarUrl: undefined };
      const payload = {
        id: `m${Date.now()}`,
        type: "me",
        userId: CURRENT_USER_ID,
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl,
        text: text || (files && files.length ? `[파일 ${files.length}개]` : ""),
        ts: Date.now(),
      };
      dispatch(addMessage(payload));
    },
    [dispatch, users]
  );

  const handleLoadMore = useCallback(() => {
    dispatch(loadOlderMessages());
  }, [dispatch]);

  return (
    <Wrapper>
      <LeftMessages>
        <MessageList messages={messages} onLoadMore={handleLoadMore} />
      </LeftMessages>

      <InputSlot>
        <ChatInput onSend={handleSend} />
      </InputSlot>

      <RightCol>
        <UserList users={users} />
      </RightCol>
    </Wrapper>
  );
}
