import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 12vh; /* header 높이와 동일하게 */
  bottom: 10vh; /* bottom nav 높이와 동일하게 */
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr 240px;
  grid-template-rows: 1fr auto; /* 메시지 리스트 영역(스크롤) + 입력창(항상 하단) */
  overflow: hidden;
`;

/* 메시지 리스트 영역: grid의 1행에 위치, 내부 스크롤을 위해 min-height:0 필요 */
export const LeftMessages = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  min-width: 0; /* 텍스트 오버플로우 방지 */
  min-height: 0; /* 중요: 내부 MessageList의 overflow가 동작하게 함 */
  overflow: hidden; /* MessageList가 자체적으로 스크롤을 가짐 */
`;

/* 입력창 슬롯: grid의 2행에 넣어 항상 하단에 보이게 함 */
export const InputSlot = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: #ffffff;
  box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.04);
`;

/* 우측 컬럼: 전체 높이 차지(1행~2행), 내부(UserList)가 스크롤 */
export const RightCol = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 3; /* 전체 높이 차지 */
  min-height: 0; /* 중요: 내부 리스트의 overflow가 동작하게 함 */
  overflow: hidden; /* UserList 내부에서 scroll 처리 */
`;
