import styled from "styled-components";

export const Card = styled.div`
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: opacity 0.2s;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.$bgColor || '#2d1a33'};
  background-image: ${(props) => props.$image ? `url(${props.$image})` : 'none'};

  &:hover {
    opacity: 0.8;
  }
`;
