import React, { useState } from "react";
import * as S from "./ChatHeader.Style";
const { HeaderWrap, LeftGroup, ToggleButton, Spacer, IconButton, SearchInput } = S;

export default function ChatHeader({ view, setView, onCreate }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <HeaderWrap>
      <LeftGroup>
        <ToggleButton $active={view === "me"} onClick={() => setView("me")}>
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
