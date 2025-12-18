import React, { useEffect, useRef, useState, useCallback } from "react";
import MessageItem from "./MessageItem";
import * as S from "./MessageList.Style.js";
const { ListWrap, NewMsgButton, TopLoader } = S;

/**
 * MessageList
 * props:
 * - messages: array (ordered oldest -> newest)
 * - onLoadMore: function called when scrolled near top (for pagination)
 *
 * Behaviors:
 * - 자동 스크롤: 새 메시지 도착 시, 사용자가 맨 아래에 있으면 자동으로 스크롤
 * - 사용자가 위로 스크롤해 있을 경우 자동 스크롤 금지
 * - 새로운 메시지가 왔을 때 하단에 '새 메시지' 버튼 노출
 */

export default function MessageList({ messages = [], onLoadMore }) {
  const rootRef = useRef(null);
  const prevMessagesRef = useRef(messages);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showNewBtn, setShowNewBtn] = useState(false);
  const [isLoadingTop, setIsLoadingTop] = useState(false);

  // 자동스크롤: messages 변경 시
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prevLen = prevMessagesRef.current.length;
    const newLen = messages.length;
    const added = newLen - prevLen;

    // 메시지가 추가되었고 사용자가 맨 아래에 있으면 스크롤
    if (added > 0 && isAtBottom) {
      // Scroll to bottom
      root.scrollTop = root.scrollHeight;
      setShowNewBtn(false);
    } else if (added > 0 && !isAtBottom) {
      // show new message button
      setShowNewBtn(true);
    }
    prevMessagesRef.current = messages;
  }, [messages, isAtBottom]);

  // onScroll 이벤트
  const handleScroll = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsAtBottom(distanceFromBottom < 60);

    // near top -> load more
    if (el.scrollTop < 120 && typeof onLoadMore === "function" && !isLoadingTop) {
      setIsLoadingTop(true);
      // onLoadMore can be async
      Promise.resolve(onLoadMore()).finally(() => setIsLoadingTop(false));
    }
  }, [onLoadMore, isLoadingTop]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // when mounted, scroll to bottom
    el.scrollTop = el.scrollHeight;
  }, []);

  return (
    <ListWrap ref={rootRef} onScroll={handleScroll} role="log" aria-live="polite">
      {isLoadingTop && <TopLoader>불러오는 중...</TopLoader>}
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} />
      ))}

      <NewMsgButton
        $show={showNewBtn}
        onClick={() => {
          const el = rootRef.current;
          if (!el) return;
          el.scrollTop = el.scrollHeight;
          setShowNewBtn(false);
        }}
        aria-hidden={!showNewBtn}
      >
        새 메시지
      </NewMsgButton>
    </ListWrap>
  );
}
