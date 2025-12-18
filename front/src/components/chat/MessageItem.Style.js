import styled, { css } from "styled-components";

export const Row = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;
  align-items: flex-end;
  ${(p) =>
    p.$center &&
    css`
      justify-content: center;
    `}
  ${(p) =>
    p.$right &&
    css`
      justify-content: flex-end;
    `}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(p) => (p.$right ? "flex-end" : "flex-start")};
  max-width: 72%;
`;

// 말풍선 스타일
export const Bubble = styled.div`
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
  ${(p) =>
    p.$me &&
    css`
      background: #ffffff;
      color: #111827;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-top-right-radius: 6px;
    `}
  ${(p) =>
    p.$other &&
    css`
      background: #f2f2f5;
      color: #111827;
      border-top-left-radius: 6px;
    `}
  ${(p) =>
    p.$notice &&
    css`
      background: transparent;
      color: #9aa0a6;
      padding: 6px 0;
      max-width: none;
      text-align: center;
      border-radius: 0;
      box-shadow: none;
    `}
`;

// 상단 메타(유저명 + unread badge)
export const MetaRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 6px;
`;

// 아바타
export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

// 읽지않은 배지
export const UnreadBadge = styled.span`
  background: white;
  color: green;
  border-radius: 999px;
  padding: 2px 6px;
  font-size: 11px;
  min-width: 18px;
  text-align: center;
`;

// 타임스탬프
export const Time = styled.span`
  font-size: 11px;
  color: #9aa0a6;
  margin-left: 6px;
`;
