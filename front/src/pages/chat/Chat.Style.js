import styled from "styled-components";

export const PageWrap = styled.div`
  height: calc(100vh - 22vh); /* top 12vh + bottom 10vh removed (they exist outside) */
  background: #000; /* solid black */
  color: #e5e7eb;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/* header area has fixed height 64px inside this container */
export const HeaderArea = styled.div`
  flex: 0 0 64px;
`;

/* list area fills the rest */
export const ContentArea = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
`;
