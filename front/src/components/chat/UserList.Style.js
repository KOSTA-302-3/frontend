import styled from "styled-components";

export const Wrap = styled.aside`
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border-left: 1px solid #eee;

  /* Wrap 은 Column 레이아웃: Header / List(스크롤) / Footer(고정) */
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.h4`
  margin: 0;
  font-size: 15px;
`;

export const Count = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

/* 리스트는 남은 영역을 차지하면서 내부에서 스크롤 됩니다. */
export const List = styled.div`
  overflow: auto;
  flex: 1 1 auto;
  padding-right: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

/* Footer는 List와는 별개의 영역으로 항상 하단에 고정되어 보입니다. */
export const Footer = styled.div`
  flex: 0 0 auto;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
  margin-top: 8px;
  border-top: 1px solid #eee;
`;

/* 기본 버튼 스타일 */
export const Button = styled.button`
  background: #ffffff;
  color: #111827;
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }

  &:active {
    transform: translateY(1px);
  }
`;

/* 위험(삭제) 버튼 스타일 */
export const DangerButton = styled(Button)`
  background: #ef4444;
  color: #fff;
  border: none;

  &:hover {
    background: #dc2626;
  }
  &:active {
    transform: translateY(1px);
  }
`;
