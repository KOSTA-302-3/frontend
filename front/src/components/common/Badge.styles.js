import styled from "styled-components";

export const StyledBadge = styled.span`
  display: inline-block;
  width: 2.5vh;
  height: 2.5vh;
  margin-left: 0.5vw;
  background-image: url(${props => props.$imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
  vertical-align: middle;
  transform: translateY(-0.1vh);
`;
