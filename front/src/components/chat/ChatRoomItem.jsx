import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ItemWrap = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #e5e7eb; /* light gray */
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: ${(p) => p.color || "#374151"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  font-weight: 700;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 15px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Sub = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

const UnreadDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #ef4444; /* red for unread */
  flex-shrink: 0;
`;

export default function ChatRoomItem({ room }) {
  const navigate = useNavigate();

  function onClick() {
    navigate(`/chat/${room.id}`);
  }

  // show first letter as avatar content
  const avatarText = room.name ? room.name.charAt(0) : "?";

  return (
    <ItemWrap onClick={onClick} aria-label={`Open chat ${room.name}`}>
      <Avatar color={room.imageColor}>{avatarText}</Avatar>
      <Info>
        <Title>{room.name}</Title>
        <Sub>{room.membersCount}명 참여중</Sub>
      </Info>
      {room.hasUnread ? <UnreadDot aria-hidden /> : null}
    </ItemWrap>
  );
}
