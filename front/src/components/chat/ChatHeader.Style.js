import styled from "styled-components";

export const HeaderWrap = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  background: transparent;
  color: #e5e7eb;
`;

export const LeftGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ToggleButton = styled.button`
  background: ${(p) => (p.$active ? "rgba(255,255,255,0.06)" : "transparent")};
  color: ${(p) => (p.$active ? "#fff" : "#d1d5db")};
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const IconButton = styled.button`
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

export const SearchInput = styled.input`
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
