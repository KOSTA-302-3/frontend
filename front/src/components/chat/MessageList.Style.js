import styled from "styled-components";

export const ListWrap = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

// 새 메시지 버튼 (하단 중앙)
export const NewMsgButton = styled.button`
  position: sticky;
  bottom: 12px;
  align-self: center;
  background: #1890ff;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(24, 144, 255, 0.16);
  display: ${(p) => (p.$show ? "inline-flex" : "none")};
`;

// 로딩 인디케이터(더보기)
export const TopLoader = styled.div`
  text-align: center;
  padding: 8px 0;
  color: #9aa0a6;
  font-size: 13px;
`;
