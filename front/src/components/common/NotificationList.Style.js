import styled from "styled-components";

export const ListWrap = styled.div`
  overflow: auto;
  padding: 8px 0;
  height: calc(100% - 64px);
`;

export const ListInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0 24px 0;
`;

export const Empty = styled.div`
  color: #9ca3af;
  padding: 24px;
  text-align: center;
`;
