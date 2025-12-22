import styled from "styled-components";

export const Wrap = styled.aside`
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border-left: 1px solid #eee;

  /* 내부 리스트가 스크롤 됩니다. */
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

export const List = styled.div`
  overflow: auto;
  flex: 1 1 auto;
  padding-right: 6px;
`;
