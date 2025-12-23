import styled from "styled-components";

export const ItemWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #e5e7eb;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

export const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: ${(p) => p.color || "#374151"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 14px;
  color: ${(p) => (p.$unread ? "#fff" : "#e5e7eb")};
  font-weight: ${(p) => (p.$unread ? 600 : 500)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Time = styled.div`
  font-size: 12px;
  color: #9ca3af;
  flex-shrink: 0;
  margin-left: 8px;
`;

export const Message = styled.div`
  font-size: 13px;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UnreadDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #ef4444;
  margin-left: 8px;
  flex-shrink: 0;
`;

/* 오른쪽 컨트롤 (시간 옆에 버튼) */
export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MarkReadButton = styled.button`
  background: transparent;
  color: #9ca3af;
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
  }
`;
