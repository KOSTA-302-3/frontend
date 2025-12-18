import React from "react";
import styled from "styled-components";

const HeaderWrap = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  background: transparent;
  color: #e5e7eb;
`;

const LeftGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ToggleButton = styled.button`
  background: ${(p) => (p.$active ? "rgba(255,255,255,0.06)" : "transparent")};
  color: ${(p) => (p.$active ? "#fff" : "#d1d5db")};
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const Spacer = styled.div`
  flex: 1;
`;

const IconButton = styled.button`
  background: transparent;
  color: #d1d5db;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
  }
`;

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  color: #e5e7eb;
  padding: 8px 10px;
  border-radius: 8px;
  width: 200px;

  &::placeholder {
    color: #9ca3af;
  }
`;

export default function ChatHeader({ view, setView, onCreate }) {
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <HeaderWrap>
      <LeftGroup>
        <ToggleButton $active={view === "mine"} onClick={() => setView("mine")}>
          내 채팅방
        </ToggleButton>
        <ToggleButton $active={view === "all"} onClick={() => setView("all")}>
          전체 채팅방
        </ToggleButton>
      </LeftGroup>

      <Spacer />

      {showSearch ? (
        <SearchInput placeholder="채팅방 이름으로 검색" autoFocus onBlur={() => setShowSearch(false)} />
      ) : (
        <IconButton onClick={() => setShowSearch(true)} aria-label="검색">
          🔍
        </IconButton>
      )}

      <IconButton onClick={onCreate} aria-label="새 채팅방 만들기">
        ＋ 새 채팅방
      </IconButton>
    </HeaderWrap>
  );
}
