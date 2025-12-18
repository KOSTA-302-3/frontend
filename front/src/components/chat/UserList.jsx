import React from "react";
import UserItem from "./UserItem";
import * as S from "./UserListStyle.js";
const { Wrap, Header, Title, List } = S;

/**
 * UserList 업데이트:
 * - 우측 컬럼에서 자체 스크롤 하도록 height:100% + overflow:auto 적용
 * - 기존보다 약간 더 compact 하게 보이도록 스타일 조정
 */

/* compact한 UserItem을 사용하면 우측 컬럼에 더 많은 유저 표시 가능 */
export default function UserList({ users = [] }) {
  return (
    <Wrap aria-label="participants">
      <Header>
        <Title>참여자</Title>
        <div>{users.length}</div>
      </Header>

      <List role="list">
        {users.map((u) => (
          <UserItem key={u.id} user={u} compact />
        ))}
      </List>
    </Wrap>
  );
}
