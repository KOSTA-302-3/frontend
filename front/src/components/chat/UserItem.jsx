import React from "react";
import * as S from "./UserItem.Style.js";
const { Row, Avatar, Info, Name, Status, Dot } = S;

/**
 * UserItem: 한 참여유저 행
 * props:
 * - user: { id, username, avatarUrl?, online? }
 * - compact?: boolean (작게 보임)
 */

export default function UserItem({ user, compact = false }) {
  return (
    <Row compact={compact} role="listitem" aria-label={`user ${user.username}`}>
      <Avatar src={user.avatarUrl || `https://i.pravatar.cc/40?u=${user.id}`} alt={`${user.username} avatar`} />
      <Info>
        <Name>{user.username}</Name>
        <Status online={user.online}>
          <Dot online={user.online} />
          {user.online ? "온라인" : "오프라인"}
        </Status>
      </Info>
    </Row>
  );
}
