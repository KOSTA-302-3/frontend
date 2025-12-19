import styled from "styled-components";

export const ListWrap = styled.div`
  overflow: auto;
  padding: 8px 0;
  height: calc(100% - 64px); /* header height accounted by parent */
`;

export const ListInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 16px;
`;

export const Loading = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`;
