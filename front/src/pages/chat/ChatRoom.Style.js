import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 12vh; /* header 높이와 동일하게 */
  bottom: 10vh; /* bottom nav 높이와 동일하게 */
  left: 0;
  right: 0;
  display: grid;
  /* 메인 영역은 1열(메시지), 입력창은 하단에 auto */
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  overflow: hidden;
`;

/* 메시지 리스트 영역: grid의 1행에 위치, 내부 스크롤을 위해 min-height:0 필요 */
export const LeftMessages = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  position: relative; /* 햄버거 버튼의 absolute 기준 */
  min-width: 0; /* 텍스트 오버플로우 방지 */
  min-height: 0; /* 중요: 내부 MessageList의 overflow가 동작하게 함 */
  overflow: hidden; /* MessageList 내부 스크롤 유지 */
`;

/* 입력창 슬롯: grid의 2행에 넣어 항상 하단에 보이게 함 */
export const InputSlot = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: #ffffff;
  box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.04);
`;

/* Drawer (오프캔버스 참여자 리스트)
   - Wrapper 내부에서 absolute로 오른쪽에 위치
   - 숨길 때 translateX(100%), 보일 때 translateX(0)
*/
export const Drawer = styled.aside`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 240px;
  background: #fafafa;
  box-shadow: -8px 0 20px rgba(0, 0, 0, 0.08);
  transform: translateX(100%);
  transition: transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 40;
  overflow: hidden;

  /* prop-based visible */
  ${(p) =>
    p.open &&
    css`
      transform: translateX(0);
    `}
`;

/* 오버레이: Drawer 열렸을 때 Wrapper 내부에서 반투명 배경 */
export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 240px; /* Drawer 폭 만큼 남겨둬서 Drawer는 클릭허용 */
  bottom: 0;
  background: rgba(0, 0, 0, 0.18);
  opacity: 0;
  pointer-events: none;
  transition: opacity 180ms ease;
  z-index: 35;

  ${(p) =>
    p.$visible &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

/* 햄버거 버튼 (LeftMessages 내부의 절대 위치)
   - 작은 원형 버튼으로 메시지 영역 위에 띄움
*/
export const HamburgerButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 45;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;
