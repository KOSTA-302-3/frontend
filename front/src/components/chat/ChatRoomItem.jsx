import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./ChatRoomItem.Style";
const { ItemWrap, Avatar, Info, Title, Sub, UnreadDot } = S;

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
