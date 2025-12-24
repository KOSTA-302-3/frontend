import React from "react";
import ChatRoomItem from "./ChatRoomItem";
import * as S from "./ChatRoomList.Style.js";
const { ListWrap, ListInner, Loading } = S;

export default function ChatRoomList({ rooms = [] }) {
  console.log("ChatRoomList 렌더링:", rooms, rooms.length);
  const PAGE_SIZE = 5;
  const [displayCount, setDisplayCount] = React.useState(() => Math.min(PAGE_SIZE, rooms.length));
  const [isLoading, setIsLoading] = React.useState(false);
  const containerRef = React.useRef(null);
  const sentinelRef = React.useRef(null);

  React.useEffect(() => {
    // rooms가 바뀌면 displayCount를 리셋 (새로고침/필터 변경 등)
    setDisplayCount(Math.min(PAGE_SIZE, rooms.length));
  }, [rooms.length]);

  const visibleRooms = React.useMemo(() => rooms.slice(0, displayCount), [rooms, displayCount]);

  function loadMore() {
    if (isLoading) return;
    if (displayCount >= rooms.length) return; // 더 이상 불러올 항목이 없으면 중단
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, rooms.length));
      setIsLoading(false);
    }, 300);
  }

  React.useEffect(() => {
    const container = containerRef.current;
    const sentinel = sentinelRef.current;
    if (!container || !sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMore();
          }
        });
      },
      {
        root: container,
        threshold: 0.1,
      }
    );

    io.observe(sentinel);

    return () => {
      io.disconnect();
    };
  }, [isLoading, displayCount, rooms.length]); // rooms.length 포함해서 observer가 상황에 따라 재설정되도록 함

  return (
    <ListWrap ref={containerRef}>
      <ListInner>
        {visibleRooms.map((room) => (
          <ChatRoomItem key={room.id} room={room} />
        ))}

        <div ref={sentinelRef} />

        {isLoading ? <Loading>불러오는 중...</Loading> : null}
      </ListInner>
    </ListWrap>
  );
}
