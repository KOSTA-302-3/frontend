import styled from "styled-components";

export const PageWrap = styled.div`
  height: calc(100vh - 22vh); /* top 12vh + bottom 10vh removed like other pages */
  background: #000;
  color: #e5e7eb;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TopBar = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
`;

export const BackButton = styled.button`
  background: transparent;
  color: #e5e7eb;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  color: #fff;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const LinkButton = styled.button`
  background: transparent;
  color: #cbd5e1;
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* 강조된 버튼(예: 모두 읽음) */
export const PrimaryButton = styled(LinkButton)`
  background: rgba(255, 255, 255, 0.02);
  color: #fff;
`;
