import styled, { css } from "styled-components";

export const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 6px 4px;
  border-radius: 6px;
  cursor: default;
  ${(p) =>
    p.compact &&
    css`
      padding: 4px 2px;
    `}
  &:hover {
    background: #fafafa;
  }
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  font-size: 14px;
  color: #111827;
`;

export const Status = styled.div`
  font-size: 12px;
  color: ${(p) => (p.online ? "#22c55e" : "#9aa0a6")};
`;

// 작은 온라인 도트
export const Dot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${(p) => (p.online ? "#22c55e" : "#c7c7c7")};
  display: inline-block;
  margin-right: 6px;
`;
