import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NotificationItem.Style";
const { ItemWrap, Avatar, Content, TopRow, Title, Time, Message, UnreadDot, RightControls, MarkReadButton } = S;

function formatTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  d.setHours(d.getHours() + 9);
  return d.toLocaleTimeString([], { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function NotificationItem({ item, onMarkRead }) {
  const navigate = useNavigate();

  function onClick() {
    // 알림 상세 페이지로 (UI용 라우트 필요)
    console.log("Notification clicked:", item);
    if (item.link !== undefined && item.link !== null) {
      onMarkRead(item.id);
      navigate(item.link);
    }
  }

  function handleMarkRead(e) {
    e.stopPropagation(); // 클릭 이벤트가 부모의 onClick으로 올라가지 않게 막음
    if (onMarkRead) onMarkRead(item.id);
  }

  return (
    <ItemWrap onClick={onClick} aria-label={`알림 ${item.title}`}>
      <Avatar color={item.color}>{item.title ? item.title.charAt(0) : "N"}</Avatar>

      <Content>
        <TopRow>
          <Title $unread={item.isUnread}>{item.title}</Title>
          <RightControls>
            <Time>{formatTime(item.time)}</Time>
            {item.isUnread && <UnreadDot aria-hidden />}
            <MarkReadButton onClick={handleMarkRead} aria-label="읽음 처리">
              {item.isUnread ? "new" : "읽음"}
            </MarkReadButton>
          </RightControls>
        </TopRow>

        <Message>{item.message}</Message>
      </Content>
    </ItemWrap>
  );
}
