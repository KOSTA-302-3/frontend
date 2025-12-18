import React from "react";
import * as S from "./MessageItemStyle.js";
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
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageItem({ message }) {
  if (!message) return null;

  if (message.type === "notice") {
    return (
      <Row center>
        <Container>
          <Bubble notice aria-live="polite">
            {message.text}
          </Bubble>
        </Container>
      </Row>
    );
  }

  const isMe = message.type === "me";
  return (
    <Row right={isMe} aria-live="polite">
      {/* 왼쪽 아바타 (다른사람) */}
      {!isMe && message.avatarUrl && <Avatar src={message.avatarUrl} alt={`${message.username} avatar`} />}
      <Container right={isMe}>
        <MetaRow style={{ justifyContent: isMe ? "flex-end" : "flex-start" }}>
          {!isMe && <strong>{message.username}</strong>}
          {message.unreadCount > 0 && (
            <UnreadBadge aria-label={`${message.unreadCount} unread messages`}>{message.unreadCount}</UnreadBadge>
          )}
          <Time>{formatTime(message.ts)}</Time>
        </MetaRow>

        <Bubble me={isMe} other={!isMe}>
          {message.text}
        </Bubble>
      </Container>

      {/* 오른쪽 아바타 (나) */}
      {isMe && message.avatarUrl && <Avatar src={message.avatarUrl} alt={`${message.username} avatar`} />}
    </Row>
  );
}
