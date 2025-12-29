import React from "react";
import UserItem from "./UserItem";
import * as S from "./UserList.Style.js";
import { useDispatch } from "react-redux";
import { removeChatMember } from "../../store/slices/chatMembersSlice.js";
const { Wrap, Header, Title, List, Footer, Button, DangerButton, Count } = S;

/**
 * UserList 업데이트:
 * - 우측 컬럼에서 자체 스크롤 하도록 height:100% + overflow:auto 적용
 * - 하단에 고정된 Footer(나가기 / 삭제 버튼) 추가
 * - compact한 UserItem을 사용하면 우측 컬럼에 더 많은 유저 표시 가능
 *
 * Props:
 * - users: 사용자 배열
 * - isAdmin: 현재 사용자가 채팅방 관리자면 true (삭제 버튼 표시 여부 결정)
 * - onLeave: 채팅방 나가기 콜백 (함수)
 * - onDelete: 채팅방 삭제 콜백 (함수) — 관리자만 호출 가능
 */
export default function UserList({ users = [], isAdmin = false, onLeave = () => {}, onDelete = () => {}, userId }) {
  const dispatch = useDispatch();

  function handleLeave() {
    // 간단한 확인
    if (window.confirm("정말 채팅방을 나가시겠습니까?")) {
      onLeave();
      dispatch(removeChatMember(userId));
    }
  }

  function handleDelete() {
    // 관리자 전용: 추가 확인
    if (!isAdmin) return;
    if (window.confirm("채팅방을 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?")) {
      onDelete();
    }
  }

  return (
    <Wrap aria-label="participants">
      <Header>
        <Title>참여자</Title>
        <Count>{users.length}</Count>
      </Header>

      <List role="list">
        {users.map((u) => (
          <UserItem key={u.id} user={u} compact />
        ))}
      </List>

      <Footer>
        <Button onClick={handleLeave} aria-label="채팅방 나가기">
          채팅방 나가기
        </Button>

        {isAdmin && (
          <DangerButton onClick={handleDelete} aria-label="채팅방 삭제">
            채팅방 삭제
          </DangerButton>
        )}
      </Footer>
    </Wrap>
  );
}
