import React from "react";
import * as S from "./MessageItem.Style.js";
import { useSelector } from "react-redux";
const { Row, Container, Avatar, MetaRow, Time, Bubble, UnreadBadge } = S;

/**
 * MessageItem
 * props:
 * - message: { id, type: 'me'|'other'|'notice', username?, avatarUrl?, text?, ts?, unreadCount? }
 *
 * Visual rules:
 * - me: 오른쪽 정렬, 흰 배경
 * - other: 왼쪽 정렬, 회색 배경
 * - notice: 중앙 정렬, 텍스트 색 연한 회색, 말풍선 없음
 */

function formatTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  d.setHours(d.getHours() + 9);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageItem({ message }) {
  const userId = useSelector((state) => state.auth.userId);
  if (!message) return null;

  const messageWithType = {
    ...message, // 기존 message 복사
    type: message.type === "notice" ? "notice" : message.userId === userId ? "me" : "other",
  };

  if (message.type === "notice") {
    return (
      <Row $center>
        <Container>
          <Bubble $notice aria-live="polite">
            {message.text}
          </Bubble>
        </Container>
      </Row>
    );
  }

  const isMe = messageWithType.type === "me";
  const isImage = messageWithType.messageType === "IMAGE";
  return (
    <Row $right={isMe} aria-live="polite">
      {/* 왼쪽 아바타 (다른사람) */}
      {!isMe && messageWithType.avatarUrl && (
        <Avatar src={messageWithType.avatarUrl} alt={`${messageWithType.username} avatar`} />
      )}
      <Container $right={isMe}>
        <MetaRow style={{ justifyContent: isMe ? "flex-end" : "flex-start" }}>
          {!isMe && <strong>{messageWithType.username}</strong>}
          {messageWithType.unreadCount > 0 && (
            <UnreadBadge aria-label={`${messageWithType.unreadCount} unread messages`}>
              {messageWithType.unreadCount}
            </UnreadBadge>
          )}
          <Time>{formatTime(messageWithType.ts)}</Time>
        </MetaRow>

        <Bubble $me={isMe} $other={!isMe}>
          {/* ⭐ TEXT / IMAGE 분기 */}
          {isImage ? (
            <img
              src={messageWithType.text} // IMAGE일 때 text = imageUrl
              alt="chat image"
              style={{
                maxWidth: "220px",
                borderRadius: "8px",
                display: "block",
              }}
            />
          ) : (
            messageWithType.text
          )}
        </Bubble>
      </Container>

      {/* 오른쪽 아바타 (나) */}
      {isMe && messageWithType.avatarUrl && (
        <Avatar src={messageWithType.avatarUrl} alt={`${messageWithType.username} avatar`} />
      )}
    </Row>
  );
}
